import { IEncryptionService } from "../../service-layer/interfaces/IEncryptionService";

var CryptoJS = require("crypto-js");
export class EncryptionService implements IEncryptionService {

    private key: any
    private iv: any
    constructor() {
        this.key = CryptoJS.enc.Hex.parse("000102030405060708090a0b0c0d0e0f");
        this.iv = CryptoJS.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");
    }

    public async encrypt(text: string): Promise<string> {
        var encrypted = CryptoJS.AES.encrypt(text, this.key, { iv: this.iv });
        return (encrypted.ciphertext.toString(CryptoJS.enc.Base64));
    }



    public async decrypt(encryptedText: string): Promise<string> {
        var decrypted = CryptoJS.AES.decrypt(encryptedText, this.key, { iv: this.iv });
        return (decrypted.toString(CryptoJS.enc.Utf8));
    }
}