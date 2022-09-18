import { Controller,Post,Body,Res, UseGuards } from '@nestjs/common';
import { UserDto } from '../models/userModelDto';
import { AuthService } from '../services/auth.service';




@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}
    @Post('register-user')
   async registerAccount(
        @Body() user:UserDto,
        @Res() res:any
    ):Promise<any>{

       
            const createdUser = await this.authService.registerAccount(user)
            res.status(201).json(createdUser)
    }


@Post('login')
async loginUser(
    @Body() body:any,
    @Res() res:any

){

    const userExists = await this.authService.loginUser(body)
    res.status(200).json({acccessToken:userExists})

}

}
