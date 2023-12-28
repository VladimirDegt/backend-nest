import { Body, Controller, HttpException, HttpStatus, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from '../posts/dto/create-post.dto';

@ApiTags('Работа с замовниками')
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {
    }

    @ApiOperation({ summary: 'Отримання файлу з даними' })
    @ApiResponse({ status: 201 })
    @Post('/sendFile')
    @UseInterceptors(FileInterceptor('emailTable'))
    async createFile(@UploadedFile() file: Blob) {
        await this.customersService.create(file);
        return ({
            message: 'Файл отримано',
        });

    }
}
