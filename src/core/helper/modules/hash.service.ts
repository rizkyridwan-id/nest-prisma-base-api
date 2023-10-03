import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {
  async generate(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
