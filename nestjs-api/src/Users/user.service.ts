import { User } from './user.entity';
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService{

    constructor(@InjectRepository(User) private userRepo: Repository<User>){}

    //Promise que retorna um array com todos do tipo User
    findAll(): Promise<User[]>{
        //find() faz a query com o parametro passado, caso não tenha parametro retorna todos os dados da table
        return this.userRepo.find(); // SELECT * from user;
    }

    async findById(id: number): Promise<User>{
        try{
            const user = await this.userRepo.findOne({where: {id}}); // SELECT * from user WHERE id = id;
            return user;
        }catch (err){
            throw err;
        }
    }

    create(newUser){
        this.userRepo.insert(newUser);
    }

    update(userUpdate){
        this.userRepo.update(userUpdate.id, userUpdate);
    }

    delete(id){
        this.userRepo.delete(id);
    }
}