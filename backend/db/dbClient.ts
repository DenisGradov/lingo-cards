export interface DBClient {
    connect(): Promise<void>;
    query(query: string, params?: any[]): Promise<any>;
    disconnect(): Promise<void>;
}
  