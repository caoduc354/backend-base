import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VnpayController } from './vnpay.controller';
import { VnpayService } from './vnpay.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [VnpayService],
  controllers: [VnpayController],
  exports: [],
})
export class VnpayModule {}
