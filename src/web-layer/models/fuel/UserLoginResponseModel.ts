import { BusinessUserModel } from "service-layer/models/BusinessUserModel";


export class UserLoginResponseModel {
    private isNewUser: boolean;
    private user: BusinessUserModel;
    private accessToken: string;

    constructor() {
        this.isNewUser = false
    }

    public getAccessToken(): string {
        return this.accessToken;
    }

    public setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }

    public isIsNewUser(): boolean {
        return this.isNewUser;
    }

    public setIsNewUser(isNewUser: boolean): void {
        this.isNewUser = isNewUser;
    }

    public getUser(): BusinessUserModel {
        return this.user;
    }

    public setUser(user: BusinessUserModel): void {
        this.user = user;
    }


}