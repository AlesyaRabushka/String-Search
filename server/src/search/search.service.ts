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
                        // только txt рассматривает?
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
            // console.log(files)
            // console.log(files)

            // files.forEach((file) => {
                // const filePath = path.join(directory, file)
            //     const status = fs.statSync(filePath);
            //     // только txt рассматривает
            //     if (status.isFile()){
            //         // console.log('file')
                    
            //         if (path.extname(filePath) === ".txt"){
            //             const data = fs.readFileSync(filePath, 'utf-8');
            //             // добавляем в массив объект файла
            //             console.log(filePath)
            //             const fileInfo = {
            //                 name: file,
            //                 text: data,
            //             }
            //             fileNames.push(fileInfo)
            //         }

            //     } else if (status.isDirectory()){
            //         // console.log('dir')
            //         // const subFileNames = this.getAllSystemFiles(filePath);
            //         // return subFileNames;
            //     }
                
            // })

            let result: Array<IFile> = [];
            console.log(files.length)
            // console.log('here', fileNames)
            // проверяем, есть ли в файле match
            files.forEach(file => {
                const {check, matchedWords} = checkMatch(searchedString, file.text)
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