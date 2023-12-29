import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { UploadedFile } from '../customers/types';

@Injectable()
export class FilesService {
    async createFile(file: UploadedFile):Promise<void> {
        try {
            const fileName = uuid.v4() + '_' + file.originalname;
            const filePath = path.resolve(__dirname, '../', 'static');
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
        } catch (e) {
            throw new HttpException(`${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 
}
