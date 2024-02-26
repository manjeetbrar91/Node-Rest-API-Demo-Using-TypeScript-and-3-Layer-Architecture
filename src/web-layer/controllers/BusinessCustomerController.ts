import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { FuelUtility } from "../../common/utils/FuelUtility";
import { ServiceFactory } from "../../service-layer/ServiceFactory";


import { IBusinessUsersService } from "../../service-layer/interfaces/IBusinessUsersService";
import { IEncryptionService } from "../../service-layer/interfaces/IEncryptionService";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { UserLoginRequestModel } from "../models/fuel/UserLoginRequestModel";

@JsonController(Constants.ROUTER_PREFIX + "/business/customer")
export class BusinessCustomerController {
    private readonly userService: IBusinessUsersService;
    private readonly encryptionService: IEncryptionService;

    constructor() {
        this.userService = ServiceFactory.getBusinessUsersService();
        this.encryptionService = ServiceFactory.getEncryptionService();
    }

    @Post("/update")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async verifyOTP(@Body() req: any): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);

        let userDataModel = await this.userService.getUserDetailsById(reqModel.getId());

        if (userDataModel == null || userDataModel == undefined) {
            throw new MyError("User not found")
        } else {
            userDataModel = await this.userService.updateBasicUserProfile(reqModel)
        }
        let resultModel = new ResultModel();
        resultModel.setData(userDataModel);
        return resultModel;

    }

    @Post("/set-pin")

    public async updatePIN(@Body() req: any): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);
        if (req.pin == undefined || req.pin == "") {
            throw new MyError("Pin is missing")
        }
        if (req.id == undefined && req.id == "") {
            throw new MyError("User id is missing")
        }
        let userDataModel = await this.userService.getUserDetailsById(req.id);

        if (userDataModel == null || userDataModel == undefined) {
            throw new MyError("User not found")
        } else {
            const pin = await this.encryptionService.encrypt(req.pin)
            //Update NEW PIN DB
        }
        let resultModel = new ResultModel();
        resultModel.setData(userDataModel);
        return resultModel;

    }
    @Get("/details/:id")

    public async getUserDetails(@Param("id") id: string): Promise<ResultModel> {


        let userDataModel = await this.userService.getUserDetailsById(id);
        if (userDataModel == null || userDataModel == undefined) {
            throw new MyError("User not found")
        }
        let resultModel = new ResultModel();
        resultModel.setData(userDataModel);
        return resultModel;

    }

    @Post("/validate-pin")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async verifyLoginPin(@Body() req: any): Promise<ResultModel> {

        if (req.pin == undefined || req.pin == "" || req.id == undefined || req.id == "") {
            throw new MyError("Invalid request")
        }
        let userDataModel = await this.userService.getUserDetailsById(req.id);

        if (userDataModel == null || userDataModel == undefined) {
            throw new MyError("User not found")
        } else {

            let decryptedPin = await this.encryptionService.decrypt(userDataModel.getPin())
            if (decryptedPin == req.pin) {

            } else {
                throw new MyError("Invalid pin.")
            }
        }
        let resultModel = new ResultModel();
        resultModel.setData(userDataModel);
        return resultModel;

    }


    @Post("/find-user")
    public async login(@Body() req: UserLoginRequestModel): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);
        if (reqModel.getMobileNumber() == undefined || reqModel.getCountryCode() == undefined) {
            throw new MyError("Bad Request")
        }
        if (reqModel.getMobileNumber().trim() == "" || reqModel.getCountryCode().trim() == "") {
            throw new MyError("Bad Request")
        }
        if (reqModel.getMobileNumber().trim().length < 9) {
            throw new MyError("Enter valid mobile number")
        }
        if (reqModel.getCountryCode().trim().includes("+")) {
            throw new MyError("Plus (+) is not allowed in country code")
        }
        let data = await this.userService.getUserByMobileNumber(reqModel);
        if (data == null || data == undefined) {

            throw new MyError("User not found")
        }
        let resultModel = new ResultModel();
        resultModel.setData(data);
        return resultModel;

    }

    @Post("/create-user")

    public async createNewUser(@Body() req: any): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);

        if (reqModel.getMobileNumber() == undefined || reqModel.getCountryCode() == undefined || reqModel.getCountryShortName() == undefined) {
            throw new MyError("Bad Request")
        }
        if (reqModel.getMobileNumber().trim() == "" || reqModel.getCountryCode().trim() == "" || reqModel.getCountryShortName().trim() == "") {
            throw new MyError("Bad Request")
        }
        if (reqModel.getMobileNumber().trim().length < 9) {
            throw new MyError("Enter valid mobile number")
        }
        if (reqModel.getCountryCode().trim().includes("+")) {
            throw new MyError("Plus (+) is not allowed in country code")
        }

        let data = await this.userService.getUserByMobileNumber(reqModel);
        if (data == null || data == undefined) {
            let userDataModel = await this.userService.register(reqModel);
            let resultModel = new ResultModel();
            resultModel.setData(userDataModel);
            return resultModel;
        } else {
            throw new MyError("User already exists.")
        }
    }
}