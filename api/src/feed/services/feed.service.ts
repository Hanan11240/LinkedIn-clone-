import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { PostDto } from '../models/postdto';



@Injectable()
export class FeedService {

    constructor(@InjectModel('Posts') private readonly postModel:Model<PostDto>){

    }
 async create(body:PostDto): Promise<PostDto>{
    const createPost = await new this.postModel(body)
    const createdPost = await  createPost.save()
    return createdPost

}

async findAllPosts():Promise<any>{
    const allPosts = await this.postModel.find()
    return allPosts
}

async updatePost(_id:any,body:PostDto){
    console.log('id',_id)
    console.log('body-->',body)
    const updatedPost = await this.postModel.findByIdAndUpdate({_id},body,{new:true})
    return updatedPost
}

async deletePost(_id:any){
    const deletedPost = await this.postModel.findByIdAndDelete(_id)
    return deletedPost
}

async findSelectedPosts(take:number=10,skip:number=10){
   
    const selectedPosts = await this.postModel.find().skip(skip).limit(take)
    return selectedPosts
}

}
