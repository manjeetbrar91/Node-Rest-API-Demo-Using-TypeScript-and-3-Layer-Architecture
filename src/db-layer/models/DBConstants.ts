
export class DBConstants {

    public static readonly defaultSequenceNumberPreFix: string = "A";
    public static readonly paymentStatusPending: string = "pending";
    public static readonly paymentStatusPaid: string = "paid";

    public static readonly defaultSortingField: string = "updatedAt";
    public static readonly defaultSortingOrder: number = -1;
    public static readonly defaultOffset: number = 0;
    public static readonly defaultLimit: number = 20;
    public static readonly BusinessUsersCollection: string = "customersorusers";
}
