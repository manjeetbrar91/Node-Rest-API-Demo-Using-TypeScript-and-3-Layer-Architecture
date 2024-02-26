
import { IBusinessUsersDBManager } from "./interfaces/IBusinessCustomersDBManager";

export class DBManagerFactory {

    private static businessUsersDBManager: IBusinessUsersDBManager;
    public static getBusinessUsersDBManager(): IBusinessUsersDBManager {
        return this.businessUsersDBManager;
    }

    public static setBusinessUsersDBManager(businessCustomersDBManager: IBusinessUsersDBManager): void {
        this.businessUsersDBManager = businessCustomersDBManager;
    }
}
