import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { sendEmailFromGoogle } from '../utils/sendEmail';
import { UploadedFile } from './types';
const Papa = require("papaparse");

@Injectable()
export class CustomersService {
    constructor(private fileService: FilesService) {
    }

    async create(file: UploadedFile) {
        await this.fileService.createFile(file);
    }

    async sendEmail(file: UploadedFile) {
        const parsedCsv = await Papa.parse(file.buffer.toString(), {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: false,
            encoding: "utf8",
        })
        return await Promise.allSettled(
            parsedCsv.data.map(async item => {
                return await sendEmailFromGoogle(item)
            })
        )
    }
}
