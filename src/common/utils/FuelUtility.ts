import { BusinessUserAccountStatus, BusinessUserModel, BusinessUserTypes } from "../../service-layer/models/BusinessUserModel";
import { Utility } from "./Utility";

export class FuelUtility {



  public static getBusinessUserModel(data): BusinessUserModel {
    let model: BusinessUserModel = new BusinessUserModel();
    // model.setMobileNumber(data. ? : "")
    model.setProfileCompleted(data.profileCompleted ? data.profileCompleted : false)
    model.setPinUpdated(data.pinUpdated ? data.pinUpdated : false)
    model.setMobileVerified(data.mobileVerified ? data.mobileVerified : false)
    // model.set(data. ? data. : false)
    model.setCountryCode(data.countryCode ? data.countryCode.trim() : "")
    model.setMobileNumber(data.mobileNumber ? data.mobileNumber.trim() : "")
    model.setPin(data.pin ? data.pin.trim() : "")
    model.setCountryShortName(data.countryShortName ? data.countryShortName.trim() : "")
    model.setLastName(data.lastName ? data.lastName.trim() : "")
    model.setFirstName(data.firstName ? data.firstName.trim() : "")
    model.setEmail(data.email ? data.email.trim() : "")
    model.setUserType(data.userType ? data.userType.trim() : BusinessUserTypes.Owner)
    model.setCountry(data.country ? data.country.trim() : "")
    model.setLanguage(data.language ? data.language.trim() : "")
    model.setPincode(data.pincode ? data.pincode.trim() : "")
    model.setImage(data.image ? data.image.trim() : "")
    model.setAltMobileNumber(data.altMobileNumber ? data.altMobileNumber.trim() : "")
    model.setGender(data.gender ? data.gender.trim() : "Male")
    model.setDob(data.dob ? data.dob.trim() : "")
    // model.setStatus(data.status ? data.status : BusinessUserAccountStatus.pending)
    model.setAccountStatus(data.accountStatus ? data.accountStatus.trim() : BusinessUserAccountStatus.pending)
    model.setLatitude(data.latitude ? data.latitude : 0)
    model.setLongitude(data.longitude ? data.longitude : 0)
    Utility.setServiceObjectProperties(model, data)
    model.setAddressLine1(data.addressLine1 ? data.addressLine1.trim() : "")
    model.setAddressLine2(data.addressLine2 ? data.addressLine2.trim() : "")
    model.setCity(data.city ? data.city.trim() : "");
    model.setState(data.state ? data.state.trim() : "");
    return model;
  }

}
