import { University } from "./Enums";


export class Styler {
    private static _style: University;

    static setStyle(style: University) {
        Styler._style = style;
    }

    static getStyle(className: string): string {
        return className + '--' + Styler._style;
    }
}