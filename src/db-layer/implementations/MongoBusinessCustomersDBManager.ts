import * as mongoose from "mongoose";

import { FuelUtility } from "../../common/utils/FuelUtility";
import { BusinessUserAccountStatus, BusinessUserModel } from "../../service-layer/models/BusinessUserModel";

import { IBusinessUsersDBManager } from "../interfaces/IBusinessCustomersDBManager";
import { DBBusinessUsers } from "../models/DBBusinessUsers";
import { DBConstants } from "../models/DBConstants";

export class MongoBusinessUserDBManager implements IBusinessUsersDBManager {
    private userDB: any;


    constructor() {
        this.userDB = mongoose.model(DBConstants.BusinessUsersCollection, DBBusinessUsers);
    }


    public async register(data: BusinessUserModel): Promise<BusinessUserModel> {

        let db = new this.userDB(data);
        let ret = await db.save();
        return FuelUtility.getBusinessUserModel(ret);
    }

    public async getUserByMobileNumber(data: BusinessUserModel): Promise<BusinessUserModel> {

        let ret = await this.userDB.findOne({
            mobileNumber: data.getMobileNumber(),
            countryCode: data.getCountryCode()
        });
        if (ret) {
            return FuelUtility.getBusinessUserModel(ret)
        }
        return null;

    }

    public async getUserDetailsById(id: string): Promise<BusinessUserModel> {

        let ret = await this.userDB.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (ret) {
            return FuelUtility.getBusinessUserModel(ret)
        }
        return null;

    }


    public async updateBasicUserProfile(data: BusinessUserModel): Promise<BusinessUserModel> {

        let ret = await this.userDB.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(data.getId()) }, {
            $set: {
                firstName: data.getFirstName(),
                lastName: data.getLastName(),
                email: data.getEmail(),
                gender: data.getGender(),
                country: data.getCountry(),
                pincode: data.getPincode(),
                addressLine1: data.getAddressLine1(),
                addressLine2: data.getAddressLine2(),
                state: data.getState(),
                city: data.getCity(),
                altMobileNumber: data.getAltMobileNumber(),
                dob: data.getDob(),
                profileCompleted: data.isProfileCompleted() != undefined ? data.isProfileCompleted() : true,
                accountStatus: BusinessUserAccountStatus.active
            }
        }, { new: true });

        if (ret) {
            return FuelUtility.getBusinessUserModel(ret)
        }
        return null;

    }
}