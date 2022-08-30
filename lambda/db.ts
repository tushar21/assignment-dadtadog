import "reflect-metadata";
import { DataSource } from "typeorm";
import {config} from'dotenv';
config();


export function connection():Promise<DataSource>{    
    return new Promise((resolve, reject)=>{
        const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;
        const AppDataSource = new DataSource({
            type: "postgres",
            host: DB_HOST,
            port: 5432,
            username: DB_USER,
            password:DB_PASSWORD,
            database: DB_NAME,
            entities: ['./*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
        })
        AppDataSource.initialize()
        .then(() => {
            console.log("Datasource connected successfully")
            resolve(AppDataSource)
        })
        .catch((error) => {
            console.log(error)
            reject(error)
        })
    
    })
}

