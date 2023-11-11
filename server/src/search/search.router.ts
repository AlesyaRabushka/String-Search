import { Router } from "express";
import { searchController } from "./search.controller";

export const searchRouter = Router();

searchRouter.get('/', searchController.getAllSystemFiles.bind(searchController));
searchRouter.get('/suggestions', searchController.getSearchBarSuggestions.bind(searchController));
searchRouter.post('/', searchController.getFilesWithString.bind(searchController));