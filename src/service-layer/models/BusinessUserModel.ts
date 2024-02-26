import { ServiceObject } from "./ServiceObject";

export class BusinessUserModel extends ServiceObject {
    //   setting
    // companyName 
    private profileCompleted: boolean;
    private pinUpdated: boolean;
    private mobileVerified: boolean;

    private countryCode: string;
    private mobileNumber: string;
    private pin: string;
    private countryShortName: string;

    private firstName: string;
    private lastName: string;
    private email: string;
    private userType: BusinessUserTypes;
    private country: string;
    private pincode: string;
    private language: string;
    private image: string;
    private altMobileNumber: string;
    private dob: string;
    private latitude: number;
    private longitude: number;
    private accountStatus: BusinessUserAccountStatus;
    private gender: string;
    private addressLine1: string;
    private addressLine2: string;
    private state: string;
    private city: string;

    public getAddressLine1(): string {
        return this.addressLine1;
    }

    public setAddressLine1(addressLine1: string): void {
        this.addressLine1 = addressLine1;
    }

    public getAddressLine2(): string {
        return this.addressLine2;
    }

    public setAddressLine2(addressLine2: string): void {
        this.addressLine2 = addressLine2;
    }

    public getState(): string {
        return this.state;
    }

    public setState(state: string): void {
        this.state = state;
    }

    public getCity(): string {
        return this.city;
    }

    public setCity(city: string): void {
        this.city = city;
    }


    public getGender(): string {
        return this.gender;
    }

    public setGender(gender: string): void {
        this.gender = gender;
    }


    public getAccountStatus(): BusinessUserAccountStatus {
        return this.accountStatus;
    }

    public setAccountStatus(accountStatus: BusinessUserAccountStatus): void {
        this.accountStatus = accountStatus;
    }


    public isProfileCompleted(): boolean {
        return this.profileCompleted;
    }

    public setProfileCompleted(profileCompleted: boolean): void {
        this.profileCompleted = profileCompleted;
    }

    public isPinUpdated(): boolean {
        return this.pinUpdated;
    }

    public setPinUpdated(pinUpdated: boolean): void {
        this.pinUpdated = pinUpdated;
    }

    public isMobileVerified(): boolean {
        return this.mobileVerified;
    }

    public setMobileVerified(mobileVerified: boolean): void {
        this.mobileVerified = mobileVerified;
    }

    public getCountryCode(): string {
        return this.countryCode;
    }

    public setCountryCode(countryCode: string): void {
        this.countryCode = countryCode;
    }

    public getMobileNumber(): string {
        return this.mobileNumber;
    }

    public setMobileNumber(mobileNumber: string): void {
        this.mobileNumber = mobileNumber;
    }

    public getPin(): string {
        return this.pin;
    }

    public setPin(pin: string): void {
        this.pin = pin;
    }

    public getCountryShortName(): string {
        return this.countryShortName;
    }

    public setCountryShortName(countryShortName: string): void {
        this.countryShortName = countryShortName;
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getUserType(): BusinessUserTypes {
        return this.userType;
    }

    public setUserType(userType: BusinessUserTypes): void {
        this.userType = userType;
    }

    public getCountry(): string {
        return this.country;
    }

    public setCountry(country: string): void {
        this.country = country;
    }

    public getPincode(): string {
        return this.pincode;
    }

    public setPincode(pincode: string): void {
        this.pincode = pincode;
    }

    public getLanguage(): string {
        return this.language;
    }

    public setLanguage(language: string): void {
        this.language = language;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getAltMobileNumber(): string {
        return this.altMobileNumber;
    }

    public setAltMobileNumber(altMobileNumber: string): void {
        this.altMobileNumber = altMobileNumber;
    }

    public getDob(): string {
        return this.dob;
    }

    public setDob(dob: string): void {
        this.dob = dob;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }



}

export enum BusinessUserTypes {
    Owner = "owner",
    Operator = "operator",
    Manager = "manager"
}
export enum BusinessUserAccountStatus {
    active = "active",
    pending = "pending",
    deleted = "deleted",
    deactivated = "deactivated"
}