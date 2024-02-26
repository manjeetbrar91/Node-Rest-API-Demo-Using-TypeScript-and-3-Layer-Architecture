import { IAuthService } from "./interfaces/IAuthService";
import { IBusinessUsersService } from "./interfaces/IBusinessUsersService";
import { IEncryptionService } from "./interfaces/IEncryptionService";
export class ServiceFactory {

    private static businessUsersService: IBusinessUsersService;
    private static authService: IAuthService;
    private static encryptionService: IEncryptionService;

    public static getEncryptionService(): IEncryptionService {
        return this.encryptionService;
    }

    public static setEncryptionService(encryptionService: IEncryptionService): void {
        this.encryptionService = encryptionService;
    }


    public static getAuthService(): IAuthService {
        return this.authService;
    }

    public static setAuthService(authService: IAuthService): void {
        this.authService = authService;
    }




    public static getBusinessUsersService(): IBusinessUsersService {
        return this.businessUsersService;
    }

    public static setBusinessUsersService(businessCustomersService: IBusinessUsersService): void {
        this.businessUsersService = businessCustomersService;
    }

}
