import * as fs from 'fs';
import * as path from 'path';
import checkStringMatch from '../algorithm/algorithm';
import { IFile } from '../types/types';
import checkMatch from '../algorithm/algorithm';


let STRINGS:Array<any> = [];

export class SearchService{
    constructor(){};

    async getAllSystemFiles(directory:string){
        try {
            const fileNames: Array<IFile> = [];

            const files = fs.readdirSync(directory);

            files.forEach((file) => {
                if (!file.startsWith(".")){
                    const filePath = path.join(directory, file);
                    const status = fs.statSync(filePath);
    
                    if (status.isFile()){
                        // console.log('file')
                        // только txt рассматривает
                        if (path.extname(filePath) === ".txt"){
                            const data = fs.readFileSync(filePath, 'utf-8');
                            // добавляем в массив объект файла
                            // console.log(filePath)
                            const fileInfo = {
                                name: file,
                                text: data,
                            }
                            fileNames.push(fileInfo)
                        }
                    } else if (status.isDirectory()){
                        // console.log('dir')
                        this.getAllSystemFiles(filePath).then(result => fileNames.push(...result))
                    }
                }
                
            })
            
            return fileNames;
        } catch (error) {
            console.log('[SearchService error] ', error);

            throw error;
        }
    }

    async getFilesWithString(directory:string, searchedString: string){
        try {
            

            const files = await this.getAllSystemFiles(directory);
            let result: Array<any> = [];
            let usedFiles:Array<string> = [];

            console.log(files.length)
            if (searchedString.includes(' ')){
                // console.log('STRINGS', STRINGS)
                // console.log(searchedString.length)
                STRINGS.forEach(fileInfo => {
                    if (fileInfo[1].includes(`${searchedString}`)){
                        const wordsArr: Array<string> = []
                        wordsArr.push(searchedString)
                        let markedText = ''
                        if (fileInfo[2].includes(searchedString)){
                            console.log('HERE IS IT')
                            markedText = fileInfo[2].replace(searchedString, `<mark>${searchedString}</mark>`)
                            console.log(markedText)
                        }
                        let text = fileInfo[2];
                        if (markedText.length > 0){
                            text = markedText;
                        }
                        const obj = {
                            name: fileInfo[0],
                            text: text,
                            words : wordsArr,
                        }
                        if (!usedFiles.includes(obj.name)){
                            usedFiles.push(obj.name)
                            result.push(obj)
                        }

                    }
                })
            } else {

                files.forEach(file => {
                    const {check, matchedWords} = checkMatch(searchedString, file.text);
                    // const checkName = checkMatch(searchedString, file.name);
    
                    if (check){
                        file.words = matchedWords
                        result.push(file)
                    }
                })
            }
            // проверяем, есть ли в файле match
            
            console.log(result)
            return result;
        } catch (error) {
            console.log('[SearchService error] ', error);

            throw error;
        }
    }

    async getSearchBarSuggestions(){
        try {
            console.log('here')
            const files = await this.getAllSystemFiles(String(process.env.DIRECTORY))
            // console.log(files)
            let splitted:Array<string> = []
            for (let i = 0; i < files.length; i++){
                const spl = files[i].text.split('.')
                let strings:Array<string> = [];
                for (let j = 0; j < spl.length; j++){
                    splitted.push(spl[j])
                    strings.push(spl[j])
                }
                const fileInfo = [
                    files[i].name,
                    strings,
                    files[i].text
                ]
                
                STRINGS.push(fileInfo)
            }

            // for (let i = 0; i < splitted.length; i++){
            //     const phrase = splitted[i];
                
            //     const filtered = splitted.filter((value:string, index:number) => words.indexOf(value) == index);
            //     resultObject[i].words = filtered.toString();
                
            // }

            const filtered = splitted.filter((value:string, index:number) => splitted.indexOf(value) == index);
            // console.log('filtered', filtered)
            
            console.log(filtered)
            return filtered
        } catch (error) {
            console.log('[SearchService error] ', error);

            throw error;
        }
    }

}

export const searchService = new SearchService;