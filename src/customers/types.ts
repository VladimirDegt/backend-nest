export interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}

export interface IDataEmail {
    number: string,
    customer: string,
    debt: string,
    penalty: string,
    email: string,
}