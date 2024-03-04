import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';
import { IValue, UploadedFile } from './types';
import { sendEmailGoogle } from '../utils/send-email-google';
const Papa = require("papaparse");
const iconv = require('iconv-lite');

@Injectable()
export class CustomersService {
  constructor(private fileService: FilesService) {
  }

  async create(file: UploadedFile) {
    await this.fileService.createFile(file);
  }

  async sendEmail(file: UploadedFile) {
    const buffer = iconv.decode(file.buffer, 'win1251');
    const parsedCsv = await Papa.parse(buffer.toString(), {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
    })

    const resultObjSend = {}
    parsedCsv.data.forEach(item => {
      if (!resultObjSend.hasOwnProperty(item['Email замовника'])) {
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

    const resultSend = []

    for (const [key, value] of Object.entries<{ [key: string]: IValue[] }>(resultObjSend)) {
      try {
        const res = await sendEmailGoogle([key, value])
        resultSend.push(res)
      } catch (e) {
        console.log('sendEmail Error: ', e);
      }
    }
    return resultSend
  }
}
