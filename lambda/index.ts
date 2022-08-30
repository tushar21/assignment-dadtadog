import { DataSource } from 'typeorm';
import {connection} from './db';
import { User } from "./user.entity";
import {format, transports, createLogger} from 'winston';

const {DD_HOST, DD_API_KEY, DD_SSL} = process.env;
  const httpTransportOptions = {
    host: DD_HOST,
    path: `/api/v2/logs?dd-api-key=${DD_API_KEY}&ddsource=nodejs&service=assignment`,
    ssl: DD_SSL
  };
  console.log(process.env.DD_API_KEY, 'DD_API_KEY')

  const loggerOption = {
    level: 'info',
    exitOnError: false,
    format: format.json(),
    transports: [
        new transports.Http(httpTransportOptions)
    ],
    }
    const logger = createLogger(loggerOption);

    async function getAll(usersRepo:any){
        // fetch all the users
        return await usersRepo.find(); 
    }

    function post(usersRepo:any, payload:any){
        const {age,email, name} = payload;
        const newUser = new User();
        newUser.age = age;
        newUser.email = email;
        newUser.name = name;
        return usersRepo.save(newUser);
    }

    function update(usersRepo:any, id:string, options:any){
        const {age, email, name} = options;
        return usersRepo.save({
        id,
        email,
        age,
        name
    });
    }

    function deleteUser(usersRepo:any, id:string){
        return usersRepo.delete(id)
    }


export const lambdaHandler =  async function(event:any, context:any) {
    const {operation, email, age,name, id} = event;    
    logger.info(event)
    const dataSource:DataSource = await connection();
    const usersRepo = dataSource.getRepository(User)
    let result;
    switch (operation) {        
        case 'getAll':
            result = await getAll(usersRepo)
            logger.info('Users fetched successfully');            
            break;
        case 'post':
            result = await post(usersRepo, {email,age,name})
            logger.info('Users created successfully');
            break;
        case 'update':
            result = await update(usersRepo, id, {email,age,name})
            logger.info('Users updated successfully');
            break;
        case 'deleteUser':
            result = await deleteUser(usersRepo, id)
            logger.info('Users deleted successfully');
            break;
    
        default:
            throw new Error("Invalid operation")
            break;
    }(operation);
    logger.info(result);
    return {status: 200, result};
    
    
    
}

