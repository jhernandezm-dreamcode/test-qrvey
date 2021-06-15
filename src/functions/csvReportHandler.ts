import csvReports from "../controllers/csvReports/csvReports";

/**
 * @name csvHeroesReport
 * @description function for generate the report in csv format
 */
export async function csvHeroesReport(): Promise<any> {
    console.log("csv report")
    let response:any = await csvReports.generateHeroesCSVReport();
    return response;
}
