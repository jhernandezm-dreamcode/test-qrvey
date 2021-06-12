import heroes from "../../../src/controllers/heroes/heroes";
import commonDB from "../../../src/commons/commonDB";
import { RequestHeroes, DynamoResponses, SuccesResponse } from "./heroesMocks";

describe("crud heroes", () => {
  it("success insert", async () => {
    let createRequest: any = RequestHeroes.createHero;
    let expectedResponse: any = SuccesResponse.insertOne;
    let insertOne: any = DynamoResponses.insertSuccess;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "putRecord")
      .mockReturnValueOnce(insertOne);
    let response: any = await heroes.insertHeroe(createRequest);
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("Error insert", async () => {
    let createRequest: any = RequestHeroes.createHero;
    let response: any = await heroes.insertHeroe(createRequest);
    expect(response.body).toBeTruthy();
  });

  it("success List", async () => {
    let insertOne: any = DynamoResponses.insertSuccess;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "getAllRecord")
      .mockReturnValueOnce(insertOne);
    let response: any = await heroes.listHeroes();
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("Bad List", async () => {
    let insertOneOperation: any = jest
      .spyOn(commonDB, "getAllRecord")
      .mockImplementation(() => {
        throw new Error();
      });
    let response: any = await heroes.listHeroes();
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("success get", async () => {
    let insertOne: any = DynamoResponses.insertSuccess;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "getRecord")
      .mockReturnValueOnce(insertOne);
    let response: any = await heroes.getHeroe("123");
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("Error get", async () => {
    let insertOneOperation: any = jest
      .spyOn(commonDB, "getRecord")
      .mockImplementation(() => {
        throw new Error();
      });
    let response: any = await heroes.getHeroe("123");
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("Error get undefine", async () => {
    let insertOne: any = undefined;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "getRecord")
      .mockReturnValueOnce(insertOne);
    let response: any = await heroes.getHeroe("123");
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("success update", async () => {
    let createRequest: any = RequestHeroes.createHero;
    let insertOne: any = DynamoResponses.insertSuccess;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "updateRecord")
      .mockReturnValueOnce(insertOne);
    let response: any = await heroes.updateHeroes(createRequest);
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("Error update", async () => {
    let createRequest: any = RequestHeroes.createHero;
    let insertOne: any = DynamoResponses.insertSuccess;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "updateRecord")
      .mockImplementation(() => {
        throw new Error();
      });;
    let response: any = await heroes.updateHeroes(createRequest);
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("success delete", async () => {
    let insertOne: any = DynamoResponses.insertSuccess;
    let insertOneOperation: any = jest
      .spyOn(commonDB, "deleteRecord")
      .mockReturnValueOnce(insertOne);
    let response: any = await heroes.deleteHeroe("123");
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

  it("Error delete", async () => {
    let insertOneOperation: any = jest
      .spyOn(commonDB, "deleteRecord")
      .mockImplementation(() => {
        throw new Error();
      });
    let response: any = await heroes.deleteHeroe("123");
    expect(response.body).toBeTruthy();
    insertOneOperation.mockRestore();
  });

});
