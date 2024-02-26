import { development } from './development';
import { localDevelopment } from './localDevelopment';

export class Config {
    private static _instance: Config;

    private env: string;
    private logLevel: string;
    private port: number;
    private frontEndUrl: string;
    private secretKey: string;
    private mongoUrl: string;


    private constructor() {
        this.env = process.env.NODE_ENV || 'localDevelopment';
        this.load(this.getData());
    }

    public static getInstance(): Config {
        return this._instance || (this._instance = new this());
    }

    private getData(): any {
        switch (this.env) {

            case "development":
                return development;
            default:
                return localDevelopment;
        }
    }

    private load(data: any): void {
        this.port = parseInt(process.env.PORT ? process.env.PORT : (data.app.port || 3000));
        this.frontEndUrl = data.app.frontEndUrl;
        this.logLevel = data.app.logLevel || 'debug';
        this.secretKey = data.authentication.secretKey;
        this.mongoUrl = process.env.MONGO_CONNECTION_STRING || data.mongodb.url;

    }


    public getFrontEndUrl(): string {
        return this.frontEndUrl;
    }


    public getEnvironment(): string {
        return this.env
    }

    public isDevelopment(): boolean {
        return this.getEnvironment() == "development";
    }

    public isProduction(): boolean {
        return this.getEnvironment() == "production";
    }

    public getLogLevel(): string {
        return this.logLevel
    }

    public getPort(): number {
        return this.port
    }



    public getSecretKey(): string {
        return this.secretKey;
    }



    public getJwtSession(): any {
        return { session: false }
    }

    public getMongoUrl(): string {
        return this.mongoUrl;
    }



}
