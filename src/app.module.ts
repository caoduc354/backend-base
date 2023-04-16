import { Module } from '@nestjs/common';
import { ChatbotModule } from './modules/chatbot-gpt/chatbot.module';
import { VnpayModule } from './modules/payments/vnpay/vnpay.module';

@Module({
  imports: [
    // UserModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://cad:cad@cluster0.rnppq0v.mongodb.net/backend-base',
    // ),

    ChatbotModule,
    VnpayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
