import FuzzySearch from "fuzzy-search";
import { IFile } from "../types/types";

import {fuzzyFilter, fuzzyMatch} from "fuzzbunny";

// возвращет файлы, гд встречаются буковки из searchedString
const checkMatch = (files: IFile[], searchedString: string) => {
    try {
        const searcher = new FuzzySearch(files, ['name', 'text'], {
            caseSensitive:false,
        })

        //1
        const result = searcher.search(searchedString);

        //2
        // const results:Array<IFile> = [];

        // for (let index in files){
        //     if (fuzzyMatch(files[index].name, searchedString) || fuzzyMatch(files[index].text, searchedString)){
        //         results.push(files[index])
        //     }
        // }
        
        console.log(result)

        return result;

    } catch (error) {
        console.log(error);

        throw error;
    }
}

export default checkMatch;