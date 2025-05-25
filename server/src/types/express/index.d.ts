// types/express/index.d.ts
import 'express';

declare module 'express' {
  export interface Request {
    auth?: {
      sub?: string;
      [key: string]: any;
    };
  }
}
