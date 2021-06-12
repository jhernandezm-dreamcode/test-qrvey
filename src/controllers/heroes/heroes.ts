import { APIGatewayProxyResult } from "aws-lambda";
import commonDB from "../../commons/commonDB";
import {
  DBConfigurations,
  Headers,
  CODES,
  STATUS_DESCRIPTION,
} from "../../config/settings";
import genericFunctions from "../../utils/genericResponse";

/**
 * @name Heroes
 * @description Class for heroes
 */
class Heroes {
  /**
   * @name insertHeroe
   * @description Method for insert a heroe
   * @param body
   */
  public async insertHeroe(body: any): Promise<any> {
    let response: any;
    try {
      const insertDynamo: any = await commonDB.putRecord(
        DBConfigurations.tableHeroesName,
        body
      );
      response = await genericFunctions.setResponse(
        CODES.SUCCESS,
        STATUS_DESCRIPTION.SUCCESS,
        body
      );
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
   * @name listHeroes
   * @description method for get all the items
   * @returns {Object}
   */
  public async listHeroes(): Promise<any> {
    let response: any;
    try {
      const listDynamo: any = await commonDB.getAllRecord(
        DBConfigurations.tableHeroesName
      );
      console.log("list dynamo", listDynamo);
      response = await genericFunctions.setResponse(
        CODES.SUCCESS,
        STATUS_DESCRIPTION.SUCCESS,
        listDynamo
      );
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
   * @name getHeroe
   * @description method for get an Heroe
   * @param id - identifier
   * @returns {Object}
   */
  public async getHeroe(id: string): Promise<any> {
    let response: any;
    try {
      let getItem: any = await commonDB.getRecord(
        DBConfigurations.tableHeroesName,
        id
      );
      if(getItem==undefined){
        getItem = "Does not exist information for this user"
      }
      response = await genericFunctions.setResponse(
        CODES.SUCCESS,
        STATUS_DESCRIPTION.SUCCESS,
        getItem
      );
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
   * @name updateHeroes
   * @description method fot update a hero
   * @param body
   * @returns {Object}
   */
  public async updateHeroes(body: any): Promise<any> {
    let response: any;
    try {
      const update: any = await commonDB.updateRecord(
        body,
        DBConfigurations.tableHeroesName
      );
      response = await genericFunctions.setResponse(
        CODES.SUCCESS,
        STATUS_DESCRIPTION.SUCCESS,
        body
      );
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
   * @name deleteHeroe
   * @description method for deletele a hero
   * @param id 
   * @returns {Object}
   */
  public async deleteHeroe(id: string): Promise<any> {
    let response: any;
    try {
      const deleteHeroes: any = await commonDB.deleteRecord(
        DBConfigurations.tableHeroesName,
        id
      );
      response = await genericFunctions.setResponse(
        CODES.SUCCESS,
        STATUS_DESCRIPTION.SUCCESS,
        id
      );
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
}

const heroes = new Heroes();
export default heroes;
