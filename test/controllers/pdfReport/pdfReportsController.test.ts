import heroes from "../../../src/controllers/heroes/heroes";
import { DBmocks } from "../../mocks/bdMock";
import s3Controller from "../../../src/controllers/s3/s3Controller";
import pdfReport from "../../../src/controllers/pdfReports/pdfReports";

describe("GENERATE PDF REPORT", () => {
  it(`Success GENERATE REPORT`, async () => {
    let listMock: any = DBmocks.LIST_OBJECT;
    let listHeroes: any = jest
      .spyOn(heroes, "listHeroes")
      .mockReturnValueOnce(listMock);
    let s3Upload: any = jest
      .spyOn(s3Controller, "uploadFile")
      .mockResolvedValue("someUrl");
    let response: any = await pdfReport.generateHeroesPdfReport();
    expect(response.body).toBeTruthy();
    listHeroes.mockRestore();
    s3Upload.mockRestore();
  });

  it(`ERROR GENERATE REPORT`, async () => {
    let listMock: any = DBmocks.LIST_OBJECT;
    let listHeroes: any = jest
      .spyOn(heroes, "listHeroes")
      .mockReturnValueOnce(listMock);
    let s3Upload: any = jest
      .spyOn(s3Controller, "uploadFile")
      .mockImplementation(() => {
        throw new Error();
      });
    let response: any = await pdfReport.generateHeroesPdfReport();
    expect(response.body).toBeTruthy();
    listHeroes.mockRestore();
    s3Upload.mockRestore();
  });
});
