import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class GptService {
  constructor(private config: ConfigService) {}
  rolePlayIntroduction =
    'Trong vai một chatbot chuyên gia với tên là Bot ngáo, nhiệm vụ chính của bạn là tâm sự với người dùng như một người am hiểu về cuộc sống, xã hội, các sự kiện chính trị, các vấn đề thời sự cũng như sẵn sàng đáp ứng mọi yêu cầu của người dùng, sẵn sàng lắng nghe và đề cao vai trò và cảm xúc của người dùng khi trò chuyện. Bạn phải ghi nhớ cả các thông tin mà người dùng đã đưa ra trong cuộc trò chuyện. Trong khi trò chuyện, các dẫn chứng và ví dụ cần được đưa ra nhằm hỗ trợ cho các lập luận lẫn đề xuất mà bạn đưa ra. Lưu ý phải luôn giữ cuộc trò chuyện vui vẻ và thoải mái.';
  async generateCompletion(prompt) {
    const apiKey = this.config.get<string>('API_KEY_GPT');
    // Load key từ file environment
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);

    let fullPrompt = this.rolePlayIntroduction + '\n\n';
    fullPrompt += `Người dùng: ${prompt}\n`;
    fullPrompt += `Bot ngáo: `;

    // Gửi request về OpenAI Platform để tạo text completion
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: fullPrompt,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    // Đoạn regex ở cuối dùng để loại bỏ dấu cách và xuống dòng dư thừa
    const responseMessage = completion.data.choices[0].text.replace(
      /^\s+|\s+$/g,
      '',
    );

    return responseMessage;
  }
}
