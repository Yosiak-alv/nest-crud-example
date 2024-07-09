import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IsUniqueConstraint } from './shared/validations/is-unique.constraints';

@Module({
  imports: [
    // Import the ConfigModule
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT) ?? 3306,
        username: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASS ?? 'root',
        database: process.env.DB_NAME ?? 'nest-crud-example',
        entities: [User],
        synchronize: true,
        logging: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, IsUniqueConstraint], //add the IsUniqueConstraint to the providers array

})
export class AppModule {}
