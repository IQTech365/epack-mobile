export class Validator {

    static isEmpty = (text: string|null|undefined): boolean => {
        return text === undefined || text == null || text.length === 0;
    }

    static email = (text:string): boolean => {
        const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
        return emailRegex.test(text);
    }
}