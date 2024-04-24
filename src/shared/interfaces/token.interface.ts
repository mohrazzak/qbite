import { Role } from 'src/generated/zod/enums';

export interface ITokenPayload {
  id: number;
  role: Role;
}

export interface IDecodedToken {
  id: number;
  role: Role;

  iat: number;
  exp: number;
}
