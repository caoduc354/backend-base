import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { customAlphabet } from 'nanoid';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { sortObject } from 'src/modules/utils/sort-object';
import * as querystring from 'qs';

@Injectable()
export class VnpayService {
  constructor(private readonly configService: ConfigService) {}

  GetUrlVnpay(req: Request, res: Response) {
    const { orderInfo, amount } = req.body;

    const nanoid = customAlphabet('1234567890', 10);
    const orderId = `MH${nanoid()}`;
    const createDate = moment().format('YYYYMMDDHHmmss');
    const secretKey = this.configService.get('SECRETKEY');

    let vnpUrl = this.configService.get('VNP_URL');
    let vnpParams = {};

    const currCode = 'VND';
    const orderType = this.configService.get('ORDER_TYPE');
    vnpParams['vnp_Version'] = '2.1.0';
    vnpParams['vnp_Command'] = 'pay';
    vnpParams['vnp_TmnCode'] = this.configService.get('TMNCODE');
    vnpParams['vnp_Locale'] = 'vn';
    vnpParams['vnp_CurrCode'] = currCode;
    vnpParams['vnp_TxnRef'] = orderId;
    vnpParams['vnp_OrderInfo'] = orderInfo;
    vnpParams['vnp_OrderType'] = orderType;
    vnpParams['vnp_ReturnUrl'] = this.configService.get('RETURN_URL');
    vnpParams['vnp_CreateDate'] = createDate;

    vnpParams['vnp_Amount'] = amount * 100;
    vnpParams = sortObject(vnpParams);
    const signData = querystring.stringify(vnpParams, { encode: false });
    const hmac = crypto.createHmac('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnpParams['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnpParams, { encode: false });

    return res
      .status(200)
      .json({ RspCode: '00', Message: 'Confirm Success', url: vnpUrl });
  }
}
