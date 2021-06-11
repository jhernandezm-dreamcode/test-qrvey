import * as AWS from "aws-sdk";
AWS.config.update({ region: "us-east-1" });

/**
 * @name CommonDB
 * @description This is the generic class for any CRUD operation in any class/model
 */
class CommonDB {
  /**
   * @name putRecord
   * @description generic method for insert a register in dynamo
   * @param tableName
   * @param item
   * @returns {Object}
   */
  public async putRecord(tableName: string, item: any): Promise<any> {
    const docClient = new AWS.DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      convertEmptyValues: true,
    });
    const params = {
      TableName: tableName,
      Item: item,
      ReturnValues: "ALL_OLD",
    };
    let data: any;

    data = await docClient.put(params).promise();
    return data;
  }

  /**
   * @name getRecord
   * @description method for get a register
   * @param tableName
   * @param id
   * @returns {Object}
   */
  public async getRecord<T>(
    tableName: string,
    id: string | undefined
  ): Promise<T> {
    const docClient = new AWS.DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      convertEmptyValues: true,
    });
    const params = {
      TableName: tableName,
      Key: { id: id },
    };
    const data = await docClient.get(params).promise();
    return data.Item as T;
  }

  /**
   * @name deleteRecord
   * @description Method for delete a register
   * @param tableName
   * @param id
   * @returns {Object}
   */
  public async deleteRecord(tableName: string, id: any) {
    const docClient = new AWS.DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      convertEmptyValues: true,
    });
    const params = {
      TableName: tableName,
      Key: { id: id },
    };

    let data: any;

    data = await docClient.delete(params).promise();
    return data;
  }

  /**
   * @name getAllRecord
   * @description method for get all the registers
   * @param tableName
   * @returns {Object}
   */
  public async getAllRecord(tableName: string) {
    var documentClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: tableName,
    };
    let data = await documentClient.scan(params).promise();
    return data.Items;
  }

  /**
   * @name updateRecord
   * @description method for update a record
   * @param updateRecord
   * @param tableName
   * @returns {Object}
   */
  public async updateRecord(updateRecord: any, tableName: string) {
    let expresionsNames: any = {};
    let expresionsValues: any = {};
    let exp = {
      UpdateExpression: "set",
      ExpressionAttributeNames: expresionsNames,
      ExpressionAttributeValues: expresionsValues,
    };
    Object.entries(updateRecord).forEach(([key, item]) => {
      if (key != "id") {
        exp.UpdateExpression += ` #${key} = :${key},`;
        exp.ExpressionAttributeNames["#" + key] = key;
        exp.ExpressionAttributeValues[`:${key}`] = item;
      }
    });
    exp.UpdateExpression = exp.UpdateExpression.slice(0, -1);

    var documentClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: tableName,
      KeyConditionExpression: "id = :id",
      ExpressionAttributeValues: {
        ":id": updateRecord.id,
      },
    };
    let data = await documentClient.query(params).promise();
    if (data && data.Items) {
      for (const result of data.Items) {
        let updateParams = {
          TableName: tableName,
          Key: { id: result.id },
          ...exp,
        };
        await documentClient.update(updateParams).promise();
      }
    }
  }
}

const commonDB = new CommonDB();
export default commonDB;
