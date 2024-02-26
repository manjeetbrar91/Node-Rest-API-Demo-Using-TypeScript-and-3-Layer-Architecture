import * as jwt from "jwt-simple";
import { Body, JsonController, Post } from "routing-controllers";
import { MyError } from "../../common/MyError";
import { Constants } from "../../common/utils/Constants";
import { FuelUtility } from "../../common/utils/FuelUtility";
import { Config } from "../../config/Config";
import { IBusinessUsersService } from "../../service-layer/interfaces/IBusinessUsersService";
import { IEncryptionService } from "../../service-layer/interfaces/IEncryptionService";

import { BusinessUserModel } from "../../service-layer/models/BusinessUserModel";

import { UserLoginResponseModel } from "web-layer/models/fuel/UserLoginResponseModel";
import { JWTTokenClaims } from "../../service-layer/models/JWTtokenClaims";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceFactory } from "../../service-layer/ServiceFactory";
import { UserLoginRequestModel } from "../models/fuel/UserLoginRequestModel";


@JsonController(Constants.ROUTER_PREFIX + "/business/auth/customer")
export class BusinessCustomerAuthController {
    private readonly userService: IBusinessUsersService;
    private readonly encryptionService: IEncryptionService;

    constructor() {
        this.userService = ServiceFactory.getBusinessUsersService();
        this.encryptionService = ServiceFactory.getEncryptionService();
    }

    @Post("/login")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async login(@Body() req: UserLoginRequestModel): Promise<ResultModel> {
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
        let result = await this.userService.getUserByMobileNumber(reqModel);
        let response = new UserLoginResponseModel()
        if (result == null || result == undefined) {

            let user = await this.userService.register(reqModel)
            response.setIsNewUser(true);
            response.setUser(user);
        } else {
            response.setUser(result)
        }
        let resultModel = new ResultModel();
        resultModel.setData(response);
        return resultModel;

    }

    @Post("/validate-pin")
    // @Authorized(AuthorizationUtils.grantAccess([RolePermissions.Inventory]))
    public async verifyLoginPin(@Body() req: UserLoginRequestModel): Promise<ResultModel> {
        let reqModel = FuelUtility.getBusinessUserModel(req);

        let userDataModel = await this.userService.getUserByMobileNumber(reqModel);
        let response = new UserLoginResponseModel()
        if (userDataModel == null || userDataModel == undefined) {
            throw new MyError("User not found")
        } else {

            let decryptedPin = await this.encryptionService.decrypt(userDataModel.getPin())
            if (decryptedPin == req.pin) {
                response.setAccessToken(this.getAccessToken(userDataModel))
                response.setUser(userDataModel)
            } else {
                throw new MyError("Invalid pin.")
            }
        }
        let resultModel = new ResultModel();
        resultModel.setData(response);
        return resultModel;

    }



    private getAccessToken(user: BusinessUserModel): string {

        let claims: JWTTokenClaims = new JWTTokenClaims(
            user.getId(),
            "sessionId",

        );
        return this.getJWTToken(claims);
    }



    private getJWTToken(claims: JWTTokenClaims): string {
        let jwtToken = jwt.encode(
            this.toJWTPayload(claims),
            Config.getInstance().getSecretKey(),
            this.Algorithm
        );
        return jwtToken;
    }
    private Algorithm: jwt.TAlgorithm = "HS256";

    private toJWTPayload(claims: JWTTokenClaims): any {
        return {
            aud: claims.getUserId(),
            exp: claims.getExpiresAt(),

            pers: claims.getPermissions(),
            sid: claims.getSessionId(),

        }
    }

}