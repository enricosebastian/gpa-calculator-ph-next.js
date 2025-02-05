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

        if (this._workbook === null) {
            throw new Error('Workbook is still null or undefined even after initialization. Try uploading a different file');
        }
    }

    private workBookIsValidated(workbook: XLSX.WorkBook): boolean {
        let hasOneValidSheet: boolean = false;

        workbook.SheetNames.forEach((sheet_name: string) => {
            const sheet = workbook.Sheets[sheet_name];
            const column_headers = XLSX.utils.sheet_to_json(sheet, {header: 1})[0] as string[];

            if (column_headers === null || column_headers === undefined) {
                return;
            }

            if (column_headers.length < 4 || column_headers.length > 4) {
                return;
            }

            const column_headers_lowercase = column_headers.map(column_header => column_header.toLowerCase());

            if (!column_headers_lowercase.includes('course code') || !column_headers_lowercase.includes('grade') || !column_headers_lowercase.includes('unit') || !column_headers_lowercase.includes('course name'))  {
                return;
            }   
            
            hasOneValidSheet = true;
        });

        return hasOneValidSheet;
    }

    private convertSheetsToTerms(workbook: XLSX.WorkBook): Term[] {
        const terms: Term[] = [];

        workbook.SheetNames.forEach((sheet_name: string) => {
            const term: Term = {
                id: uuid(),
                name: sheet_name
            };

            terms.push(term);
        });

        return terms;
    }

    private convertSheetsToCourses(workbook: XLSX.WorkBook, terms: Term[]): Course[] {
        const courses: Course[] = [];

        workbook.SheetNames.forEach((sheet_name: string) => {
            const selected_term = terms.find(term => term.name === sheet_name);

            if (selected_term === undefined) {
                throw new Error(`The sheet name ${sheet_name} does not exist in the terms[] array. That logic does not usually happen, so please try to fix your Excel sheet`);
            }

            const sheet = workbook.Sheets[sheet_name];
            const column_headers = XLSX.utils.sheet_to_json(sheet, {header: 1})[0] as string[];

            if (column_headers === null || column_headers === undefined) {
                return;
            }
            
            const new_header_names = column_headers.map(header => {
                switch (header.toLowerCase()) {
                    case 'course code':
                        return 'code';
                    case 'course name':
                        return 'name';
                    default:
                        return header.toLowerCase();
                }
            }); 

            const row_data: Course[] = XLSX.utils.sheet_to_json(sheet, {
                header: new_header_names,
                range: 1, // Skip the original header row
            }) as Course[];

            row_data.forEach(row => {
                const course: Course = {
                    id: uuid(),
                    name: row.name,
                    code: row.code,
                    unit: row.unit,
                    grade: row.grade,
                    term_id: selected_term.id
                };

                courses.push(course);
            });
            
        });

        return courses;
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

    public getTermsAndCourses(): [Term[], Course[]] {
        if (this._workbook === null) {
            throw new Error('Trying to get terms and courses, but workbook is null. Please initialize first');
        }

        const workbook = this._workbook;

        if(!this.workBookIsValidated(workbook)) {
            throw new Error('Uploaded excel sheet does not have proper formatting. Check the file and reupload again.');
        }
        
        const terms: Term[] = this.convertSheetsToTerms(workbook);
        const courses: Course[] = this.convertSheetsToCourses(workbook, terms);

        return [terms, courses];
    }

    public static export(terms: Term[], courses: Course[]) {

        const workbook = XLSX.utils.book_new();

        terms.forEach(term => {

            const courses_in_the_term = courses.filter(course => course.term_id === term.id);

            const rows = courses_in_the_term.map(course => ({
                    'course code': course.code,
                    'course name': course.name,
                    'unit': course.unit,
                    'grade': course.grade,
            }));

            const worksheet = XLSX.utils.json_to_sheet(rows);
            
            XLSX.utils.book_append_sheet(workbook, worksheet, term.name);
        });
        
        XLSX.writeFile(workbook, "gpa-results.xlsx", { compression: true });
    }
}