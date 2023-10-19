export const chooseWords = async (resultObject:any) => {
    try {
        for (let i = 0; i < resultObject.length; i++){
            const words = resultObject[i].words;
            console.log(words)
            const filtered = words.filter((value:string, index:number) => words.indexOf(value) == index);
            resultObject[i].words = filtered.toString();
            
        }

        

        return resultObject;
    } catch (error) {
        console.log('[helpers]: error', error);

        throw error;
    }
}