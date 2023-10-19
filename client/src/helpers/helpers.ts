export const chooseWords = async (resultObject:any) => {
    try {

        for (let i = 0; i < resultObject.length; i++){
            const words = resultObject[i].words;
            
            resultObject[i].words = String(words);
        }

        

        return resultObject;
    } catch (error) {
        console.log('[helpers]: error', error);

        throw error;
    }
}