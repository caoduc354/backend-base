import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../model/user.model';

export type UserDocument = User & Document;

@Schema()
export class UserInput {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  phoneNumber: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
