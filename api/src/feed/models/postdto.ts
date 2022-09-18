import {IsString} from 'class-validator'
export class PostDto{
    
    @IsString()
    public body:string;

    public createdAt:Date;
}