import * as AWS from "aws-sdk";
import { v4 as uuid_v4 } from "uuid";
import { BucketConfigurations,Errors, ExtensionFiles } from "../../config/settings";

/**
 * @name S3Controller
 * @description class for the s3 logic
 */
class S3Controller {
  /**
   * @name uploadFile
   * @description Method for load a especified file
   * @param data
   * @param type
   * @returns String- the url with the location of the document
   */
  public async uploadFile(data: any, type: string): Promise<any> {
    let s3 = new AWS.S3();
    let contentType = await this.getContenType(type);
    const bucketParamsCsv = {
      Bucket: BucketConfigurations.nameBucket,
      Key: "files/" + uuid_v4() + "." + type,
      Body: data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: contentType,
      ContentDisposition: "inline",
    };
    let dataCsv = await s3.upload(bucketParamsCsv).promise();
    return dataCsv.Location;
  }

  /**
   * @name getContenType
   * @description method for get the content type
   * @param extension 
   * @returns String with the content type
   */
  private async getContenType(extension: string){
    let contentTypeMap: Map<string, string> = new Map();
    contentTypeMap.set("",Errors.NOT_EXIST_ESTENSION);
    contentTypeMap.set(ExtensionFiles.CSV,"application/csv");
    contentTypeMap.set(ExtensionFiles.PDF,"application/pdf");
    return contentTypeMap.has(extension) ? contentTypeMap.get(extension) : contentTypeMap.get("");
  }
}

const s3Controller = new S3Controller();
export default s3Controller;
