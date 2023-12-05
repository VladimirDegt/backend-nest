import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
    HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAll(): Promise<Cat[]> {
    return this.catsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCat: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCat);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.catsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateCutDto: UpdateCatDto,
    @Param('id') id: string,
  ): Promise<Cat> {
    return this.catsService.update(id, updateCutDto);
  }
}
