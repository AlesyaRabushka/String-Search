import $host from "../http/http"

export class Service{
    static async getFiles(searchedString:string){
        try {
            const result = await $host.post('search/', {searchedString});
            console.log(result.data);

            return result.data;
        } catch (error) {
            console.log('[Service] error:', error);

            throw error;
        }
    }
}

export default Service;