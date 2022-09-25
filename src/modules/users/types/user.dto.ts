import { User } from '../model/user.model';

export class CreateUserDto extends User {}
export class UpdateUserDto extends User {
  updatedAt: Date;
}
