
import { BusinessUserModel } from "../../service-layer/models/BusinessUserModel";

export interface IBusinessUsersDBManager {
    register(promotion: BusinessUserModel): Promise<BusinessUserModel>;
    getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel>;

    updateBasicUserProfile(data: BusinessUserModel): Promise<BusinessUserModel>;
    getUserDetailsById(id: string): Promise<BusinessUserModel>;


}