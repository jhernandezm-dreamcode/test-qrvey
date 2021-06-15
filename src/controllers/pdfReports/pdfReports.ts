import { jsPDF } from "jspdf";
import heroes from "../heroes/heroes";
import s3Controller from "../s3/s3Controller";
import {
  ExtensionFiles,
  CODES,
  STATUS_DESCRIPTION,
} from "../../config/settings";
import genericFunctions from "../../utils/genericResponse";

/**
 * @name PdfReports
 * @description Class for generate the pdf reports
 */
class PdfReports {
  private headerArray: any = [];
  private dataArray: any = [];
  /**
   * @name generateHeroesPdfReport
   * @description method for get all the heroes and create a pdf report
   * @returns String with the url of pdf report
   */
  public async generateHeroesPdfReport(): Promise<any> {
    let body: any = {};
    let response: any = await genericFunctions.setResponse(
      CODES.SUCCESS,
      STATUS_DESCRIPTION.SUCCESS,
      null
    );
    try {
      const allData: any = await heroes.listHeroes();
      let dataJson = JSON.parse(allData.body);
      if (dataJson.body != null && dataJson.body.length > 0) {
        let pdf = new jsPDF({ orientation: "landscape" });
        let listObj: any = [];
        for (const iterator of dataJson.body) {
          this.headerArray = [];
          this.keysAndElementsFromJson(iterator);
          var obJson = this.listToJson(this.headerArray, this.dataArray);
          listObj.push(obJson);
          this.dataArray = [];
        }
        let headerFormat: any = this.createHeaders(this.headerArray);
        console.log(headerFormat);
        console.log(listObj);
        let dataPdf = await pdf.table(1, 1, listObj, headerFormat, {
          autoSize: true,
        });
        console.log("47");
        console.log(dataPdf.output());
        let pdfUrl = await s3Controller.uploadFile(dataPdf.output(), "pdf");
        body = { url: pdfUrl };
        response = await genericFunctions.setResponse(
          CODES.SUCCESS,
          STATUS_DESCRIPTION.SUCCESS,
          body
        );
      }
    } catch (error) {
      console.log("error", error);
      response = await genericFunctions.setResponse(
        CODES.SERVER_ERROR,
        STATUS_DESCRIPTION.ERROR,
        null
      );
    }
    return response;
  }

  /**
   * @name listToJson
   * @description method for
   * @param labels
   * @param data
   * @returns Json
   */
  private listToJson(labels: [], data: []): any {
    let obj: any = {};
    for (var i = 0; i < labels.length; i++) {
      obj[labels[i]] = data[i];
    }
    return obj;
  }

  /**
   * @name keysAndElementsFromJson
   * @description method for get all the keys of a json object
   * @param array
   */
  private keysAndElementsFromJson(array: any): any {
    if (typeof array != "object") {
      console.log("values");
      console.log(array);
      this.dataArray.push(array);
    } else {
      for (let element in array) {
        if (typeof array[element] != "object") {
          this.headerArray.push(element);
        }
        console.log("key");
        console.log(element);
        this.keysAndElementsFromJson(array[element]);
      }
    }
  }

  /**
   * @name createHeaders
   * @param keys
   * @returns array of headers
   */
  private createHeaders(keys: any): any {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0,
      });
    }
    return result;
  }
}

const pdfReports = new PdfReports();
export default pdfReports;
