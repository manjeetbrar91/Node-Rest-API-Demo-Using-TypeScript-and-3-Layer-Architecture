import { DBConstants } from "../db-layer/models/DBConstants";

export class BaseRequest {
    sortBy: string;
    sortingOrder: number;
    sortingField: string;
    searchText: string;
    offset: number;
    limit: number;
    sortingObject = {};
    lowStockOnly: boolean;



    // public getLimit(): number {
    //     if (this.limit == undefined) {
    //         this.limit = DBConstants.defaultLimit;
    //     }
    //     return this.limit;
    // }

    // public getOffset(): number {
    //     if (this.offset == undefined) {
    //         this.offset = DBConstants.defaultOffset
    //     }
    //     return this.offset;
    // }

}