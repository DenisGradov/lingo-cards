import { IncomingMessage } from 'http';

export declare function parseBody(req: IncomingMessage): Promise<string>;
