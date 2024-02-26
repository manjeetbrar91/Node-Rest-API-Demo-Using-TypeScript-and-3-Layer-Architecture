import { Action, ForbiddenError, UnauthorizedError } from 'routing-controllers';
import { ServiceFactory } from '../../service-layer/ServiceFactory';

import { BusinessUserAccountStatus, BusinessUserModel } from '../../service-layer/models/BusinessUserModel';

export class AuthorizationChecker {
    private static extractJWTToken(action: Action): string {
        let token: string = action.request.headers["authorization"] || action.request.headers["Authorization"];
        if (!token) {
            return token;
        }
        token = token.replace('Bearer', "").trim();
        return token;
    }

    public async check(action: Action): Promise<boolean> {
        // // TODO: move below to aap ts configuration

        let jwtToken: string = AuthorizationChecker.extractJWTToken(action);
        if (jwtToken == undefined) {

            // return false;
            // to maintain backward compatibility of code not parsing and checking access token
            throw new UnauthorizedError("Access token is not provided");
        }
        let user: BusinessUserModel = await ServiceFactory.getAuthService().getUser(jwtToken);

        if (!user || user == null) {
            throw new UnauthorizedError("Invalid access token");
        }
        if (user.isProfileCompleted() && user.getAccountStatus() != BusinessUserAccountStatus.active.toString()) {
            throw new ForbiddenError("User account not active");
        }


        action.request.user = user;
        return true;

    }

    private containsAny(source, target) {
        var result = source.filter(function (item) { return target.indexOf(item) > -1 });
        return (result);
    }

    public async getCurrentUserClaims(action: Action): Promise<BusinessUserModel> {
        return action.request.user;
    }
} 