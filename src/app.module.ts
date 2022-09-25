import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      'mongodb+srv://cad:cad@cluster0.rnppq0v.mongodb.net/backend-base',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
