import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'connect';
import { Request } from 'express';
import { SignatureService } from '../helper/modules/signature.service';
@Injectable()
export class SignatureMiddleware implements NestMiddleware {
  constructor(readonly signatureService: SignatureService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const signature =
      (req.headers.signature as string) || (req.query.signature as string);
    const timestamp =
      (req.headers.timestamp as string) || (req.query.timestamp as string);
    const accessToken =
      (req.headers.Authorization as string) ||
      (req.query.authorization as string);

    const isValidSignature = this.signatureService.validateSignature(
      signature,
      timestamp,
      accessToken,
      60,
    );
    if (!isValidSignature) {
      throw new UnauthorizedException('Invalid Signature.');
    }

    next();
  }
}
