import { Headers } from "../config/settings";

/**
 * @name GenericFunctions
 * @description class for generic functions
 */
class GenericFunctions {
  /**
   * @name setResponse
   * @description method for create a response
   * @param code
   * @param status
   * @param body
   * @returns {Object}
   */
  public async setResponse(code: number, status: string, body: any): Promise<any> {
    let response: any = {};
    let bodyResponse: any = JSON.stringify({
      code: code,
      status: status,
      body: body,
    });
    response.body = bodyResponse;
    response.headers = Headers;
    return response;
  }
}

const genericFunctions = new GenericFunctions();
export default genericFunctions;
