import { rejects } from "assert";
import { resolve } from "path";
import * as XLSX from 'xlsx';
import { read, WorkBook, writeFileXLSX } from "xlsx";
import { Term } from "./Term";
import { Course } from "./Course";
import {v4 as uuid} from "uuid"; 

export class ExcelSheet {
    private _workbook: WorkBook | null;

    constructor() {
        this._workbook = null;
    }

    async initialize(file: Blob): Promise<void> {
        this._workbook = await this.readAndValidateFile(file);
        
        console.log(this._workbook);

        const terms: Term[] = this.convertSheetsToTerms();
        const courses: Course[] = this.convertSheetsToCourses();
    }

    private convertSheetsToCourses(): Course[] {
        const courses: Course[] = [];

        if (this._workbook === null)
            return courses;

        this._workbook.SheetNames.forEach((sheet_name: string) => {
            if (this._workbook === null)
                return courses;

            const sheet = this._workbook.Sheets[sheet_name];
            const column_headers = XLSX.utils.sheet_to_json(sheet, {header: 1, range: 'A1:D1'});

            if (column_headers.length < 4 || column_headers.length > 4) 
                return;

            column_headers.forEach(column_header => {
                console.log(column_header);
            });
            
        });

        return courses;
    }

    private convertSheetsToTerms(): Term[] {
        const terms: Term[] = [];

        if (this._workbook === null)
            return terms;

        this._workbook.SheetNames.forEach((sheet_name: string) => {
            const term: Term = {
                id: uuid(),
                name: sheet_name
            };

            terms.push(term);
        });

        return terms;
    }


    private async readAndValidateFile(file: Blob): Promise<WorkBook> {
        return new Promise((resolve, reject) => {
            const file_reader = new FileReader();

            file_reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e?.target?.result) {
                    const arrayBuffer = e.target.result as ArrayBuffer;
    
                    const xlsSignature = [0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1];
                    const xlsxSignature = [0x50, 0x4B, 0x03, 0x04];
    
                    const uint8Array = new Uint8Array(arrayBuffer);
    
                    const isXls = xlsSignature.every((byte, i) => byte === uint8Array[i]);
                    const isXlsx = xlsxSignature.every((byte, i) => byte === uint8Array[i]);
    
                    if (!isXls && !isXlsx) {
                        throw new Error('File is not a valid Excel sheet! Might be malicious. Use genuine .xls or .xlsx files');
                    }
    
                    resolve(read(arrayBuffer, { type: "array" }));
                }

                reject('No valid file was provided');
            };

            file_reader.readAsArrayBuffer(file);
        })
    }

    public reset() {
        this._workbook = null;
    }

    public get(): WorkBook {
        if (this._workbook === null) {
            throw new Error('Workbook does not exist');
        }

        return this._workbook;
    }

    public display() {
        console.log(this._workbook);
    }
}