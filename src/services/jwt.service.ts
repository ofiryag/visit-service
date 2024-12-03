import * as jwt from 'jsonwebtoken';

export function decodeJwt(token: string): any {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}