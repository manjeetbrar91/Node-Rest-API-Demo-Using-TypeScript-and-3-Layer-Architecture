import { IBusinessUsersService } from "../interfaces/IBusinessUsersService";
import { DBManagerFactory } from "../../db-layer/DataAccessLayerFactory";
import { IBusinessUsersDBManager } from "../../db-layer/interfaces/IBusinessCustomersDBManager";
import { BusinessUserModel } from "../models/BusinessUserModel";

export class BusinessUsersService implements IBusinessUsersService {
    private readonly userDBManager: IBusinessUsersDBManager;

    constructor() {
        this.userDBManager = DBManagerFactory.getBusinessUsersDBManager();
    }

    public async register(promotion: BusinessUserModel): Promise<BusinessUserModel> {
        return await this.userDBManager.register(promotion);
    }
    public async getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel> {
        return await this.userDBManager.getUserByMobileNumber(data);
    }

    public async getUserDetailsById(id: string): Promise<BusinessUserModel> {
        return await this.userDBManager.getUserDetailsById(id)
    }

    public async updateBasicUserProfile(data: BusinessUserModel): Promise<BusinessUserModel> {
        data.setProfileCompleted(true)
        return await this.userDBManager.updateBasicUserProfile(data)
    }


}
