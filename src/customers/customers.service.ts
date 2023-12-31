import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { UploadedFile } from './types';
import { sendEmailForMeta } from '../utils/send-email-MetaUA';
const Papa = require("papaparse");
const iconv = require('iconv-lite');

@Injectable()
export class CustomersService {
    constructor(private fileService: FilesService) {
    }

    async create(file: UploadedFile) {
        await this.fileService.createFile(file);
    }

    async sendEmail(file: UploadedFile, content: string) {
        const buffer = iconv.decode(file.buffer, 'win1251');
        const parsedCsv = await Papa.parse(buffer.toString(), {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false,
        })
        return await Promise.allSettled(
            parsedCsv.data.map(async item => {
                return await sendEmailForMeta(item, content);
            })
        )
    }
}
