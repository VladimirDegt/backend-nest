import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { IValue, UploadedFile } from './types';
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
        
      const resultObjSend = {}
      parsedCsv.data.forEach(item => {
        if(!resultObjSend.hasOwnProperty(item['Email замовника']) ){
          resultObjSend[item['Email замовника']] = [
            {
              number: item['Номер'],
              customer: item['Замовник'],
              debt: item['Стан оплати'],
              penalty: item['Пеня за прострочення платежу'],
            }
          ]
        } else {
          resultObjSend[item['Email замовника']].push({
            number: item['Номер'],
            customer: item['Замовник'],
            debt: item['Стан оплати'],
            penalty: item['Пеня за прострочення платежу'],
          })
        }
      })

      for (const [key, value] of Object.entries<{ [key: string]: IValue[] }>(resultObjSend)) {
            const randomDelay = Math.random() * (20000 - 5000 + 1) + 5000;
            await new Promise((resolve) => setTimeout(resolve, randomDelay));

            try {
              await sendEmailForMeta([key, value], content);
              results.push({ status: 'fulfilled', value: { email: key, customer: value} });
            } catch (error) {
              results.push({
                status: 'rejected',
                reason: error.message,
                value: key,
              });
            }
          }

          return results;
        }
    }
