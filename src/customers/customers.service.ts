import { Injectable } from '@nestjs/common';
import { FilesService } from '../files/files.service';

@Injectable()
export class CustomersService {
  constructor(private fileService: FilesService) { }
  async create(file: Blob) {
    const fileName = await this.fileService.createFile(file);
  }
}
