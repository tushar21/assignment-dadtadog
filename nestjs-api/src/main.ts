import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
const { format, transports } = require('winston');


require('dd-trace').init({
  hostname: 'locahost',
  port: 8126,
  env: 'development',
  logInjection: true,
  analytics: true,
});

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/api/v2/logs?dd-api-key=6b75480f07e730ff9d7fadbe03661c3a&ddsource=nodejs&service=assignment',
  ssl: false
};

const loggerOption = {
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Http(httpTransportOptions)
  ],
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger( 
    WinstonModule.createLogger(loggerOption)
  )
  await app.listen(3003);
}
bootstrap();
