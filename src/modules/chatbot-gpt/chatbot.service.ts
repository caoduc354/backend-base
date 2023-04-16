import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as request from 'request';
import { GptService } from './gpt.service';

@Injectable()
export class ChatbotService {
  constructor(
    private config: ConfigService,
    private readonly gptService: GptService,
  ) {}

  testRoute() {
    console.log('hello word');
    return { success: true };
  }

  HookFacebook(req: Request, res: Response) {
    const verifyToken = this.config.get<string>('VERIFY_TOKEN');

    // Lấy các tham số access_token và mode từ yêu cầu
    const token = req.query['hub.verify_token'];
    const mode = req.query['hub.mode'];

    // Kiểm tra tham số mode và token
    if (mode === 'subscribe' && token === verifyToken) {
      // Trả về challenge để xác nhận endpoint
      const challenge = req.query['hub.challenge'];

      console.log('hook here');

      res.send(challenge);
    } else {
      // Trả về lỗi nếu tham số không hợp lệ
      // res.sendStatus(404);

      res.status(200).send('OK!');
    }
  }

  async SentMessageToFacebook(req: Request, res: Response) {
    // Lấy thông tin người dùng và tin nhắn từ yêu cầu
    const userId = req.body.entry[0].messaging[0].sender?.id;
    const message = req.body.entry[0].messaging[0].message?.text;

    //get access token
    const accessToken = this.config.get<string>('ACCESS_TOKEN');

    // Gửi tin nhắn đến người dùng
    // Tạo một yêu cầu POST đến Messenger Platform API
    request(
      {
        url: 'https://graph.facebook.com/v12.0/me/messages',
        method: 'POST',
        qs: { access_token: accessToken },
        json: {
          recipient: { id: userId },
          message: { text: await this.gptService.generateCompletion(message) },
        },
      },
      (error, response, body) => {
        if (error) {
          console.error('Unable to send message:', error);
        } else if (response.body.error) {
          console.error('Error sending message:', response.body.error);
          return;
        }
      },
    );

    // Trả về mã HTTP 200 OK để xác nhận đã nhận được yêu cầu
    res.sendStatus(200);
  }
}
