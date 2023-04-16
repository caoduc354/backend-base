import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { Request, Response } from 'express';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('test')
  TestRoute() {
    return this.chatbotService.testRoute();
  }

  @Get('webhook')
  GetWebHookFacebook(@Req() req: Request, @Res() res: Response) {
    return this.chatbotService.HookFacebook(req, res);
  }

  @Post('webhook')
  SentMessage(@Req() req: Request, @Res() res: Response) {
    const message = req.body.entry[0].messaging[0].message?.text;
    if (message) return this.chatbotService.SentMessageToFacebook(req, res);
  }
}
