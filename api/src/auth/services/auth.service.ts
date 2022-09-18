import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { UserDto } from '../models/userModelDto';
import { urlToHttpOptions } from 'url';



@Injectable()
export class AuthService {
constructor(@InjectModel('Users') private readonly userModel:Model<UserDto>,private jwtService:JwtService){
    
}
  

   async registerAccount(user:UserDto){
        
    let  {password} = user
  
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    user.password = hash

       const newUser = await new this.userModel(user)
      
       newUser.save()
       return newUser;
    
    }

async loginUser(body:any){
    const {email,password} = body 
    
    const userExists = await this.userModel.findOne({email:email})
     if(!userExists)
      throw new UnauthorizedException('Credentials not correct')
        
    const passwordMatchs = await bcrypt.compare(password,userExists.password)
  
    if(!passwordMatchs)
        throw new UnauthorizedException('Credentials not correct')

    return this.signUser(userExists._id,userExists.email,userExists.role)
    

}


signUser(userId:any,email:any,type:any){
    return this.jwtService.sign({
        sub:userId,
        email,
        type
    })
}

async validateUser(payload:any){
    const {email} = payload
    const user = await this.userModel.findOne({email:email},{password:0,_id:0})
    if(!user)
      throw new UnauthorizedException('No User Found')

      return user
}

}
