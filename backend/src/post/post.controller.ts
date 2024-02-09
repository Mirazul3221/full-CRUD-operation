import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { AuthGuard } from '@nestjs/passport';
import { post } from './schema/post.schema';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/create')
    // @UseGuards(AuthGuard())
    @FormDataRequest({storage:FileSystemStoredFile})
  create(@Body() createPostDto: CreatePostDto,@Req() req) :  Promise <{post:post, message:string}> {
    console.log(createPostDto)
    return this.postService.create(createPostDto, req.user);
  }

  @Get('/all')
  findAll(@Req() req) {
    return this.postService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
