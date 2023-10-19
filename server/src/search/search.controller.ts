import { Request, Response } from "express";
import { SearchService, searchService } from "./search.service";

const DIRECTORY = String(process.env.DIRECTORY)

export class SearchController{
    constructor(private readonly searchService: SearchService){};

    async getAllSystemFiles(request: Request, response: Response){
        try {
            const result = await this.searchService.getAllSystemFiles(DIRECTORY);

            response.status(200).json(result)
        } catch (error) {
            console.log('[SearchController error] ', error);

            throw error;
        }
    }

    async getFilesWithString(request:Request, response:Response){
        try {
            const {searchedString} = request.body;
            console.log(DIRECTORY)
            const result = await this.searchService.getFilesWithString(DIRECTORY, searchedString);
            console.log('DONE', result.length);
            response.status(201).json(result);
        } catch (error) {
            console.log('[SearchController error] ', error);

            throw error;
        }
    }
}

export const searchController = new SearchController(searchService);