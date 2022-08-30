import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserModule} from './Users/user.module';
import {User} from './Users/user.entity';

require('dotenv').config()
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({isGlobal: true, }), 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'test123',
    database: 'assignment',
    synchronize: true, // local only
    entities: [User],
  })],
  controllers: [AppController],
  providers: [AppService, Logger],
  exports: [Logger]
})
export class AppModule {}
