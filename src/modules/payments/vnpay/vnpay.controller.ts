import { Controller, Post, Req, Res } from '@nestjs/common';
import { VnpayService } from './vnpay.service';
import { Request, Response } from 'express';

@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post('create-payment')
  CreatePaymentVnpay(@Req() req: Request, @Res() res: Response) {
    return this.vnpayService.GetUrlVnpay(req, res);
  }
}
