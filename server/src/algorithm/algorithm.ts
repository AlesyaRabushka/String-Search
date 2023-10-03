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


function levenshtein(s1: string, s2: string): number {
    let i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;
    let cr: number = 1;
    let cri: number =1;
    let ci: number = 1;
    let cd: number = 1;

    cutHalf = flip = Math.max(l1, l2);

    let minCost = Math.min(cd, ci, cr);
    let minD = Math.max(minCost, (l1 - l2) * cd);
    let minI = Math.max(minCost, (l2 - l1) * ci);
    let buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
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