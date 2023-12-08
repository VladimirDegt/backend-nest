import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post, PostDocument } from './posts.schema';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Post.name) private postRepository: Model<PostDocument>,
        private fileService: FilesService
    ) { }
    async create(dto: CreatePostDto, image: any): Promise<Post> {
        const fileName = await this.fileService.createFile(image);
        const post = new this.postRepository({ ...dto, image: fileName });
        return post.save()
  }
}
