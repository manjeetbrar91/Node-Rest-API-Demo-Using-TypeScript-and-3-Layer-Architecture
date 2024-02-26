import { IsArray, IsDefined, IsEnum, IsMongoId, IsPositive, IsString } from "class-validator";



export class JWTTokenClaims {
    @IsMongoId()
    private userId: string;

    @IsString()
    private sessionId: string;

    @IsArray()
    private permissions: Array<number>;

    @IsPositive()
    private expiresAt: number;








    public constructor(userId: string, sessionId: string) {
        const expiryTimeInSecs = 604800


        this.sessionId = sessionId;
        this.userId = userId;
        this.expiresAt = Math.floor(Date.now() / 1000) + expiryTimeInSecs;

    }

    public getPermissions(): Array<number> {
        return this.permissions;
    }

    public setPermissions(permissions: Array<number>): void {
        this.permissions = permissions;
    }

    public getUserId(): string {
        return this.userId;
    }

    public setUserId(userId: string): void {
        this.userId = userId;
    }

    public getSessionId(): string {
        return this.sessionId;
    }

    public setSessionId(sessionId: string): void {
        this.sessionId = sessionId;
    }



    public getExpiresAt(): number {
        return this.expiresAt;
    }

    public setExpiresAt(expiresAt: number): void {
        this.expiresAt = expiresAt;
    }


}