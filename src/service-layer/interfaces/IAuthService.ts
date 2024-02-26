import { BusinessUserModel } from '../../service-layer/models/BusinessUserModel';

export interface IAuthService {

    getUser(jwtToken: string, skipExpiry?: boolean): Promise<BusinessUserModel>;
}