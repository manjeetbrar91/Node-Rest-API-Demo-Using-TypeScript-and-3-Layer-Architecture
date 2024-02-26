import { ObjectID } from 'bson';
import { DBConstants } from "../../db-layer/models/DBConstants";
import { ObjectStatus } from "../../service-layer/models/ObjectStatus";
import { ResultModel } from "../../service-layer/models/ResultModel";
import { ServiceObject } from "../../service-layer/models/ServiceObject";
import { BaseRequest } from "../../web-layer/BaseRequest";
import { Utils } from "./Utils";
export class Utility {
  constructor() {

  }

  public static setServiceObjectProperties(object: ServiceObject, item: any): void {
    const id = item._id != null ? item._id : item.id;
    if (id) {
      object.setId(Utility.getStringId(id));
    }
    object.setEnable(item.enable);
    object.setCreatedAt(item.createdAt);
    object.setLastModifiedAt(item.updatedAt ? item.updatedAt : item.lastModifiedAt);
    object.setStatus(Utils.parseDefaultEnum(item.status, ObjectStatus, ObjectStatus.Active));
  }
  public static setServiceObjectPropertiesOnlyId(object: ServiceObject, item: any): void {
    const id = item._id != null ? item._id : item.id;
    if (id) {
      object.setId(Utility.getStringId(id));
    }
  }
  public static getListOfItems<T>(itemsArray: any, getItem: (item: any) => T): Array<T> {
    if (itemsArray == undefined || itemsArray == null) {
      return [];
    }

    let items: Array<T> = itemsArray.map(it => {
      return getItem(it);
    });

    return items;
  }
  public static getBasicDbObject() {
    let updateTime: Date = new Date();
    return {
      updatedTS: updateTime.getTime(),
      updatedAt: updateTime
    }
  }
  public static getStringId(id: any): string {
    return id != null ? new ObjectID(id).toHexString() : null;
  }
  public static baseRequestToResultModel(req: BaseRequest, resultModel: ResultModel): ResultModel {
    resultModel.setLimit(req.limit)
    resultModel.setLimit(req.offset)
    // resultModel.setLimit(req.searchText)
    // resultModel.setLimit(req.sortBy)
    // resultModel.set(req.sortingField)

    // resultModel.setSo(req.sortingOrder)
    return resultModel;
  }
  public static validateRequest(req: BaseRequest): any {
    req.limit = req.limit != undefined ? req.limit : DBConstants.defaultLimit;
    req.offset = req.offset != undefined ? req.offset : DBConstants.defaultOffset;
    req.sortingField = req.sortingField ? req.sortingField : DBConstants.defaultSortingField;
    if (req.sortBy && req.sortBy.toLowerCase() === 'asc') {
      req.sortingOrder = DBConstants.ASCsorting;
    }
    else {
      req.sortingOrder = DBConstants.DESCsorting;
    }
    req.sortingObject = {};
    req.sortingObject[req.sortingField] = req.sortingOrder;
    return req;
  }






  public static enumKeys<E>(e: E): (keyof E)[] {
    return Object.keys(e) as (keyof E)[];
  }
}
