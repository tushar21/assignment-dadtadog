import { Injectable } from '@nestjs/common';
require('dotenv').config()

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.PORT,'sdfsf')
    return 'Hello World';
  }  
}
