import { BusinessUserModel } from "../models/BusinessUserModel"

export interface IBusinessUsersService {
    register(promotion: BusinessUserModel): Promise<BusinessUserModel>
    getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel>

    getUserDetailsById(id: string): Promise<BusinessUserModel>

    updateBasicUserProfile(data: BusinessUserModel): Promise<BusinessUserModel>

}