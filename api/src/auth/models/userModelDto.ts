import { IsString,IsEmail, MinLength,  } from "class-validator";

export class UserDto{
    
 
    @IsEmail()
    email:String;

    @IsString()
    @MinLength(8)
    password:String;

    @IsString()
    @MinLength(4)
    role?:String;
} 