import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SendEmailDto } from './dto/send-email.dto';

@ApiTags('Работа с замовниками')
@Controller('customers')
export class CustomersController {
    constructor(private customersService: CustomersService) {
    }

    @ApiOperation({ summary: 'Отримання файлу з даними' })
    @ApiResponse({ status: 201 })
    @Post('/sendFile')
    @UseInterceptors(FileInterceptor('emailTable'))
    async createFile(@Body() body:SendEmailDto, @UploadedFile() file) {
        await this.customersService.create(file);
        return await this.customersService.sendEmail(file, body.content)
    }
}
