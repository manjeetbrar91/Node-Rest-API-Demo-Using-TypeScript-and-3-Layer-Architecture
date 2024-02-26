import { CollectionUtils } from './CollectionUtils';
import * as uuid from 'uuid/v4';
const crypto = require('crypto');

export class Utils {

    public static roundedOff(value: number) {
        return parseFloat(value.toFixed(2));
    }

    public static roundedOffWithDecimal(value: number) {
        return parseFloat(value.toFixed());
    }

    public static generateUniqueAWSKey(): string {

        return `${this.getAlphaNumericCAPSString(4)}-${this.getAlphaNumericCAPSString(4)}-${this.getAlphaNumericCAPSString(4)}-${new Date().getTime()}`
    }
    public static getAlphaNumericString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static getAlphabaticString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static getAlphaNumericCAPSString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    public static getNumericString(length: number): string {
        var result = '';
        // 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        var characters = '0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public static getUniqueBuisnesId(prefix: string): string {
        let result = "";
        let length = 12;
        if (prefix != undefined && prefix != "") {
            length = 8;
            result = prefix.toUpperCase().replace(/ /g, "");
        }
        if (length == 12) {
            result = `${Utils.getAlphaNumericCAPSString(4)}-${Utils.getAlphaNumericCAPSString(4)}-${Utils.getAlphaNumericCAPSString(4)}`;
        } else {
            result += `-${Utils.getAlphaNumericCAPSString(4)}-${Utils.getAlphaNumericCAPSString(4)}`;
        }
        return result;
    }

    public static getUniqueId(): string {
        return uuid();
    }

    public static toBase64(stringToEncode: string): string {
        return Buffer.from(stringToEncode).toString('base64');
    }

    public static uniqueBase64EncodedString(): string {
        const uniqueId: string = Utils.getUniqueId();
        return Utils.toBase64(uniqueId);
    }

    public static parseDefaultEnumMulti<T>(values: Array<string>, enumType: T, defaultEnumValue: T[keyof T]): Array<T[keyof T]> {
        const result: Array<T[keyof T]> = [];
        if (CollectionUtils.isEmpty(values)) {
            return result;
        }
        for (let value of values) {
            const found: T[keyof T] = Utils.parseDefaultEnum(value, enumType, defaultEnumValue);
            if (!result.find(elem => elem == found)) {
                result.push(found);
            }
        }
        return result;
    }

    public static generateHmacsignature(secret: string, algorithm: string, value: string): string {
        let res = crypto.createHmac(algorithm, secret).update(value).digest('hex');
        return res;
    }

    /**
     * Parse string enum with default value
     * @param value 
     * @param enumType 
     * @param defaultEnumValue 
     */
    public static parseDefaultEnum<T>(value: string, enumType: T, defaultEnumValue: T[keyof T]): T[keyof T] {
        const found: T[keyof T] = Utils.parseEnum(value, enumType);
        if (found == undefined) {
            return defaultEnumValue;
        }
        return found;
    }

    /**
     * Not found enum will return undefined
     * @param value 
     * @param enumType 
     */
    public static parseEnum<T>(value: string, enumType: T): T[keyof T] | undefined {
        if (!value) {
            return undefined;
        }

        for (const property in enumType) {
            const enumMember = enumType[property];
            if (typeof enumMember === 'string') {
                if (enumMember.toLowerCase().trim() === value.toLowerCase().trim()) {
                    const key = property as string as keyof typeof enumType;
                    return enumType[key];
                }
            }
        }
        return undefined;
    }

    public static validateOTPExpiration(otpcreatedTimeInMIlliSecs: number, durationInMilliSecs: number) {
        let expiration = durationInMilliSecs ? durationInMilliSecs : 300000;
        let currentTime = new Date().getTime();
        let expiryTime = (otpcreatedTimeInMIlliSecs ? otpcreatedTimeInMIlliSecs : 0) + (expiration ? expiration : 0);
        if (new Date(currentTime) < new Date(expiryTime)) {
            return true;
        } else {
            return false;
        }
    }
}