import {
  Body,
  Controller,
  UploadedFile,
  Post, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as Post_entity } from './posts.schema';
import { PostsService } from './posts.service';

@ApiTags('Статті')
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @ApiOperation({ summary: 'Створення статті' })
  @ApiResponse({ status: 201, type: Post_entity })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(dto, image);
  }
}
