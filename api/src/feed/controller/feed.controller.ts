import { Controller,Post,Body,UseFilters, Get, Res, Put,Param, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from '../models/postdto';
import { FeedService } from '../services/feed.service';

@UseFilters()
@UseGuards(AuthGuard('jwt'))
@Controller('feed')
export class FeedController {
    constructor(private postService:FeedService){}
    @Post('publish-post')
    async create(
        @Body() body:PostDto,
        @Res() res:any
    ){
        const createdPost = await this.postService.create(body)
        res.status(201).json(createdPost)
    }

@Get('get-all-posts')
async findAllPosts(
    @Res() res:any

){
    const allPosts = await this.postService.findAllPosts()
    res.status(200).json(allPosts)
}

@Put('update-post/:id')

async updatePost(
    @Param('id') id:any,
    @Body() body:PostDto,
    @Res() res:any

){
        const updatedPost=await  this.postService.updatePost(id,body)
        res.status(200).json(updatedPost)

}
  
@Delete('delete-post/:id')

async deletePost(
    @Res() res:any,
    @Param('id') id:any
){
    const deletedPost= await this.postService.deletePost(id)
    res.status(200).json(deletedPost)
}



@Get()
async findSelectedPosts(
    @Query('take') take:number =1,
    @Query('skip') skip:number=1,
    @Res() res:any

){
    take = take > 2 ? 2 : take
    const selectedPosts = await this.postService.findSelectedPosts(take,skip)
    res.status(200).json(selectedPosts)
}

}
