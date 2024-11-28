import { read, WorkBook, writeFileXLSX } from "xlsx";

export class ExcelSheet {
    private _workbook: WorkBook | null;

    constructor(file: globalThis.Blob) {
        this._workbook = null;

        const file_reader = new FileReader();

        file_reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e?.target?.result) {
                const arrayBuffer = e.target.result as ArrayBuffer;
                this._workbook = read(arrayBuffer, { type: "array" });
            }
        };

        file_reader.readAsArrayBuffer(file);
    }

    reset() {
        this._workbook = null;
    }

    give(): WorkBook {
        if (this._workbook === null) {
            throw new Error('Workbook does not exist');
        }

        return this._workbook;
    }
}