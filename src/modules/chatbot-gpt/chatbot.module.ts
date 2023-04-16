import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { GptService } from './gpt.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ChatbotController],
  providers: [ChatbotService, GptService],
})
export class ChatbotModule {}
