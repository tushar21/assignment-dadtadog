import { User } from './user.entity';
import { Controller, Get, HttpCode, Post, Body, Delete, Param, Inject, Logger, LoggerService } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController{
    private readonly logger =  new Logger();
    constructor(private readonly userService: UserService){}

    @Get('all')
    async getAll(): Promise<User[]>{
        this.logger.log("This is fetching all")
        return await this.userService.findAll();
    }

    @Get('getOne/:id')
    async getOne(@Param() id: number): Promise<User>{
        return await this.userService.findById(id);
    }

    @Post('add')
    @HttpCode(201)
    createUser(@Body() newUser:any){
        this.userService.create(newUser);
    }

    @Post('update')
    @HttpCode(200)
    updateUser(@Body() userToUpdate:any){
        this.userService.update(userToUpdate);
    }

    @Delete('delete/:id')
    @HttpCode(200)
    deleteUser(@Param('id') id){
        this.userService.delete(id);
    }
}
