
import heroes from '../../../src/controllers/heroes/heroes';
import commonDB from '../../../src/commons/commonDB';
import {RequestHeroes,DynamoResponses,SuccesResponse} from './heroesMocks';

describe("crud heroes", ()=>{
    it("success insert",async()=>{
        let createRequest:any = RequestHeroes.createHero;
        let expectedResponse:any = SuccesResponse.insertOne;
        let insertOne:any = DynamoResponses.insertSuccess;
        let insertOneOperation:any = jest.spyOn(commonDB,"putRecord").mockReturnValueOnce(insertOne);
        let response:any = await heroes.insertHeroe(createRequest); 
        expect(response.body).toBeTruthy();
        insertOneOperation.mockRestore();
    })

    it("Error insert",async()=>{
        let createRequest:any = RequestHeroes.createHero;
        let response:any = await heroes.insertHeroe(createRequest); 
        expect(response.body).toBeTruthy();
    })
})