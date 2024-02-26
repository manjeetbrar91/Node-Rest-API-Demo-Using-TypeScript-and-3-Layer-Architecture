// external imports
import { ValidationError, validate } from 'class-validator';
import * as jwt from "jwt-simple";
import { TAlgorithm } from "jwt-simple";

// our imports
import { IBusinessUsersService } from '../interfaces/IBusinessUsersService';
import { Config } from '../../config/Config';
import { ServiceFactory } from '../../service-layer/ServiceFactory';
import { BusinessUserModel } from '../../service-layer/models/BusinessUserModel';
import { JWTTokenClaims } from '../../service-layer/models/JWTtokenClaims';
import { IAuthService } from '../../service-layer/interfaces/IAuthService';


export class AuthService implements IAuthService {
    // demo admin user 

    private static Algorithm: TAlgorithm = "HS256";


    private readonly businessCustomersService: IBusinessUsersService;


    constructor() {
        this.businessCustomersService = ServiceFactory.getBusinessUsersService();
    }


    public async getUser(jwtToken: string, skipExpiry?: boolean): Promise<BusinessUserModel> {
        let claims: JWTTokenClaims = await this.getClaims(jwtToken, skipExpiry);
        if (!claims) {
            return null;
        }
        let user: BusinessUserModel = null;

        user = await this.businessCustomersService.getUserDetailsById(claims.getUserId());

        if (user == undefined || user == null) {
            return null;
        }
        return user;
    }

    private async getClaims(jwtToken: string, skipExpiry: boolean): Promise<JWTTokenClaims> {
        let decodedPayload = jwt.decode(
            jwtToken,
            Config.getInstance().getSecretKey(),
            true,
            AuthService.Algorithm
        );
        return AuthService.fromJWTPayload(decodedPayload, skipExpiry);
    }




    private static toJWTPayload(claims: JWTTokenClaims): any {
        return {
            aud: claims.getUserId(),
            exp: claims.getExpiresAt(),

            pers: claims.getPermissions(),
            sid: claims.getSessionId(),

        }
    }

    private static async fromJWTPayload(payload: any, skipExpiry?: boolean): Promise<JWTTokenClaims> | undefined {
        const expiresAt: number = payload.exp;
        const expiresIn: number = Math.floor(new Date(expiresAt).getTime() - new Date().getTime() / 1000);
        const checkExpiry = skipExpiry != undefined && skipExpiry == true ? false : true
        if (expiresIn <= 0 && checkExpiry) { // expiry of token
            return undefined;
        }

        let userId: string = payload.aud;
        let sessionId: string = payload.sid;
        let claims: JWTTokenClaims = new JWTTokenClaims(userId, sessionId);
        claims.setExpiresAt(expiresAt);
        let errors: ValidationError[] = await validate(claims);
        if (errors.length > 0 && checkExpiry) {
            return undefined;
        }
        return claims;
    }

}