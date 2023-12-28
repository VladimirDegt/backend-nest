import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { sendEmailFromGoogle } from '../utils/sendEmail';
const Papa = require("papaparse");

@Injectable()
export class FilesService {
    async createFile(file):Promise<void> {
        try {
            const fileName = uuid.v4() + '_' + file.originalname;
            const filePath = path.resolve(__dirname, '../', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);

            const parsedCsv = await Papa.parse(file.buffer.toString(), {
                header: true,
                skipEmptyLines: true,
                dynamicTyping: false,
                encoding: "utf8",
            })
            parsedCsv.data.map(async item => {
                    const result = await sendEmailFromGoogle(item)
                    console.log('result-->', result)
                } )
        } catch (e) {
            throw new HttpException(`${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 
}
