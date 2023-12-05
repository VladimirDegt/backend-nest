import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/createCat.dto';
import { UpdateCatDto } from './dto/updateCat.dto';
import { Cat, CatDocument } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async getAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async getById(id: string): Promise<Cat> {
    return this.catModel.findById(id);
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createCat = new this.catModel(createCatDto);
    return createCat.save();
  }

  async remove(id: string): Promise<void> {
      await this.catModel.findByIdAndDelete(id);
      return
  }

  async update(id: string, updateCutDto: UpdateCatDto): Promise<Cat> {
    return this.catModel.findByIdAndUpdate(id, updateCutDto, { new: true });
  }
}
