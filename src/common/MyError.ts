
import { HttpError } from "routing-controllers";
import { ResultModel } from "../service-layer/models/ResultModel";
import { Constants } from "./utils/Constants";

export class MyError extends HttpError {
  public operationName: string;
  public errObject: any;
  public args: any[];

  constructor(operationName: string, errObject?: any, args: any[] = []) {
    super(200);
    Object.setPrototypeOf(this, MyError.prototype);
    this.operationName = operationName;
    this.errObject = errObject;
    this.args = args; // can be used for internal logging
  }

  toJSON() {
    let result = new ResultModel();
    result.setResult_code(Constants.RESULT_CODE_FAILED);
    result.setMessage(this.operationName);
    result.setError(this.errObject);
    // return {
    //   status: this.httpCode,
    //   // failedOperation: this.operationName,
    //   result_code: Constants.RESULT_CODE_FAILED,
    //   message: this.operationName,
    //   data: null,
    //   error: this.errObject
    // };
    return result;
  }
}