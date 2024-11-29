import { rejects } from "assert";
import { resolve } from "path";
import { read, WorkBook, writeFileXLSX } from "xlsx";

export class ExcelSheet {
    private _workbook: WorkBook | null;

    constructor() {
        this._workbook = null;
    }

    async initialize(file: Blob): Promise<void> {
        this._workbook = await this.readAndValidateFile(file);
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