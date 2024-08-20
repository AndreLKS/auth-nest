import { NextFunction, Request, Response } from 'express';

const APPKEY = 'x-tenant-id'

export function tenancyMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers[APPKEY] as string;
//   req.appKey = header?.toString() || null;

  next();
}
