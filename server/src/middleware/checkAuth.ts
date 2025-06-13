import { expressjwt as jwt } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const checkJwt: RequestHandler = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as any, // Fix TypeScript error
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export default checkJwt;
