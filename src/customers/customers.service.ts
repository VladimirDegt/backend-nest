import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { UploadedFile } from './types';
import { sendEmailForMeta } from '../utils/send-email-MetaUA';
const Papa = require("papaparse");
const iconv = require('iconv-lite');

@Injectable()
export class CustomersService {
    constructor(private fileService: FilesService) { }

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

          const results = [];
          for (const item of parsedCsv.data) {
            const randomDelay = Math.random() * (20000 - 5000 + 1) + 5000;
            await new Promise((resolve) => setTimeout(resolve, randomDelay));

            try {
              await sendEmailForMeta(item, content);
              results.push({ status: 'fulfilled', value: item });
            } catch (error) {
              results.push({
                status: 'rejected',
                reason: error.message,
                value: item,
              });
            }
        }
          return results;
        }
    }
