import FuzzySearch from "fuzzy-search";
import { IFile } from "../types/types";

import {fuzzyFilter, fuzzyMatch} from "fuzzbunny";

// import FuzzySearch from "../fuzzySearch/fuzzySearch";

// через либу
// возвращет файлы, гд встречаются буковки из searchedString
// const checkMatch = (files: IFile[], searchedString: string) => {
//     try {
//         const searcher = new FuzzySearch(files, ['name', 'text'], {
//             caseSensitive:false,
//         })

//         //1
//         const result = searcher.search(searchedString);

//         //2
//         // const results:Array<IFile> = [];

//         // for (let index in files){
//         //     if (fuzzyMatch(files[index].name, searchedString) || fuzzyMatch(files[index].text, searchedString)){
//         //         results.push(files[index])
//         //     }
//         // }
        
//         console.log(result)

//         return result;

//     } catch (error) {
//         console.log(error);

//         throw error;
//     }
// }


function levenshtein(searchedString: string, text: string): number {
    let i, j, stringLength, textLength, flip, ch, chl, ii, ii2, cost, cutHalf;

    stringLength = searchedString.length;
    textLength = text.length;
    
    let cr: number = 1;
    let cri: number =1;
    let ci: number = 1;
    let cd: number = 1;

    cutHalf = flip = Math.max(stringLength, textLength);

    let minCost = Math.min(cd, ci, cr);
    let minD = Math.max(minCost, (stringLength - textLength) * cd);
    let minI = Math.max(minCost, (textLength - stringLength) * ci);
    let buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= textLength; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < stringLength; ++i, flip = cutHalf - flip) {
        ch = searchedString[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < textLength; ++j, ++ii, ++ii2) {
            cost = (ch === text[j] ? 0 : (chl === text[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[textLength + cutHalf - flip];
}




// через расстояние левенштейна
// отдельно записывает слова, которые совпадают
const checkMatch = (searchedString:string, text:string) => {
    try {
        const splittedString = searchedString.split(' ');
        const splittedText = text.replace(/[.,!?()\n]/g,"").split(' ')
        let matchedWords: Array<string> = [];

        for (let i in splittedString){
            for (let j in splittedText){
                const res = levenshtein(splittedString[i], splittedText[j])
    
                if (res <= 2){
                    matchedWords.push(splittedText[j]);
                }
            }
        }
        

        let check;
        if (matchedWords.length != 0) {
            check = true;
            return {
                check, 
                matchedWords
            }
        }

        
        return {
            check: false,
            matchedWords
        }

    } catch (error) {
        console.log(error);

        throw error;
    }
}

export default checkMatch;