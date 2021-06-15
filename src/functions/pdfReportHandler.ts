import pdfReports from '../controllers/pdfReports/pdfReports';

/**
 * @name pdfHeroesReports
 * @description Method for generate the pdf report
 * @returns Object
 */
export async function pdfHeroesReports():Promise<any>{
    let response:any = await pdfReports.generateHeroesPdfReport();
    return response;
}