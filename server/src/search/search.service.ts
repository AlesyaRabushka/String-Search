import * as fs from 'fs';
import * as path from 'path';
import checkStringMatch from '../algorithm/algorithm';
import { IFile } from '../types/types';
import checkMatch from '../algorithm/algorithm';




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
            let result: Array<IFile> = [];
            console.log(files.length)
            
            // проверяем, есть ли в файле match
            files.forEach(file => {
                const {check, matchedWords} = checkMatch(searchedString, file.text);
                // const checkName = checkMatch(searchedString, file.name);

                if (check){
                    file.words = matchedWords
                    result.push(file)
                }
            })
            
            
            return result;
        } catch (error) {
            console.log('[SearchService error] ', error);

            throw error;
        }
    }
}

export const searchService = new SearchService;