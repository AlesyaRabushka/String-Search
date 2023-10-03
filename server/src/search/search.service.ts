import * as fs from 'fs';
import checkStringMatch from '../algorithm/algorithm';
import { IFile } from '../types/types';
import checkMatch from '../algorithm/algorithm';




export class SearchService{
    constructor(){};

    async getAllSystemFiles(directory:string){
        try {
            const fileNames: string[] = [];

            const files = fs.readdirSync(directory);

            files.forEach((file) => {
                // только txt рассматривает?
                if (file.endsWith('txt')){
                    const filePath = `${directory}/${file}`;
                    const status = fs.statSync(filePath);

                    if (status.isFile()){
                        fileNames.push(file);
                    } else if (status.isDirectory()){
                        const subFileNames = this.getAllSystemFiles(filePath)
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
            const fileNames: Array<IFile> = [];

            const files = fs.readdirSync(directory);

            files.forEach((file) => {
                // только txt рассматривает
                if (file.endsWith('txt')){
                    const filePath = `${directory}/${file}`;
                    const status = fs.statSync(filePath);

                    if (status.isFile()){
                        const data = fs.readFileSync(filePath, 'utf-8');

                        // добавляем в массив объект файла
                        const fileInfo = {
                            name: file,
                            text: data,
                        }
                        fileNames.push(fileInfo)

                    } else if (status.isDirectory()){
                        const subFileNames = this.getAllSystemFiles(filePath);
                    }
                }
            })

            // проверяем, есть ли в файле match
            const result = checkMatch(fileNames, searchedString)
            
            return result;
        } catch (error) {
            console.log('[SearchService error] ', error);

            throw error;
        }
    }
}

export const searchService = new SearchService;