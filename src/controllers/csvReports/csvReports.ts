import json2csv from "json-2-csv";
import heroes from "../heroes/heroes";
import s3Controller from "../s3/s3Controller";
import {
  ExtensionFiles,
  CODES,
  STATUS_DESCRIPTION,
} from "../../config/settings";
import genericFunctions from "../../utils/genericResponse";

/**
 * @name CsvReports
 * @description class for generate the csv reports
 */
class CsvReports {
  /**
   * @name generateHeroesCSVReport
   * @description method for get all data and create a csv report
   * @returns String with the url with the report
   */
  public async generateHeroesCSVReport(): Promise<any> {
    let body: any = {};
    let response: any = {};
    try {
      const allData: any = await heroes.listHeroes();
      if (allData.body != null && allData.length > 0) {
        const csv = await json2csv.json2csvAsync(allData.body);
        let url: string = await s3Controller.uploadFile(
          csv,
          ExtensionFiles.CSV
        );
        if (url) {
          body = { url: url };
          response = await genericFunctions.setResponse(
            CODES.SUCCESS,
            STATUS_DESCRIPTION.SUCCESS,
            body
          );
        } else {
          response = await genericFunctions.setResponse(
            CODES.SERVER_ERROR,
            STATUS_DESCRIPTION.ERROR,
            null
          );
        }
      }
    } catch (error) {
      response = await genericFunctions.setResponse(
        CODES.SERVER_ERROR,
        STATUS_DESCRIPTION.ERROR,
        null
      );
    }
    return response;
  }
}

const csvReports = new CsvReports();
export default csvReports;
