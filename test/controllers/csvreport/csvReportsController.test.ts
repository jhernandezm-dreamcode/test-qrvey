import csvReports from "../../../src/controllers/csvReports/csvReports";
import heroes from "../../../src/controllers/heroes/heroes";
import { DBmocks } from "../../mocks/bdMock";
import s3Controller from "../../../src/controllers/s3/s3Controller";

describe("GENERATE CSV REPORT", () => {
  it(`Success GENERATE REPORT`, async () => {
    let listMock: any = DBmocks.LIST_OBJECT;
    let listHeroes: any = jest
      .spyOn(heroes, "listHeroes")
      .mockReturnValueOnce(listMock);
    let s3Upload: any = jest
      .spyOn(s3Controller, "uploadFile")
      .mockResolvedValue("someUrl");
    let response: any = await csvReports.generateHeroesCSVReport();
    expect(response.body).toBeTruthy();
    listHeroes.mockRestore();
    s3Upload.mockRestore();
  });

  it(`BAD GENERATE REPORT - URL NULL`, async () => {
    let listMock: any = DBmocks.LIST_OBJECT;
    let listHeroes: any = jest
      .spyOn(heroes, "listHeroes")
      .mockReturnValueOnce(listMock);
    let s3Upload: any = jest
      .spyOn(s3Controller, "uploadFile")
      .mockResolvedValue(undefined);
    let response: any = await csvReports.generateHeroesCSVReport();
    expect(response.body).toBeTruthy();
    listHeroes.mockRestore();
    s3Upload.mockRestore();
  });

  it(`BAD GENERATE REPORT - LIST FAILED`, async () => {
    let listMock: any = DBmocks.LIST_OBJECT;
    let listHeroes: any = jest
      .spyOn(heroes, "listHeroes")
      .mockImplementation(() => {
        throw new Error();
      });
    let s3Upload: any = jest
      .spyOn(s3Controller, "uploadFile")
      .mockResolvedValue(undefined);
    let response: any = await csvReports.generateHeroesCSVReport();
    expect(response.body).toBeTruthy();
    listHeroes.mockRestore();
    s3Upload.mockRestore();
  });
});
