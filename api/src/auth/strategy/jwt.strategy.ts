import {Injectable, PayloadTooLargeException} from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../services/auth.service'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){

    constructor(private authService:AuthService){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:'super-secret'
        })
    }

    async validate(payload:any){
        const userExists = await this.authService.validateUser(payload)
        
        return userExists
        
    }
}