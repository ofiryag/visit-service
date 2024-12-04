import * as jwt from 'jsonwebtoken';

/**
* Decodes a JWT token.
* @param token  The DTO containing the visit data.
* @returns A decoded jwt token
*/
export function decodeJwt(token: string): any {
  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}