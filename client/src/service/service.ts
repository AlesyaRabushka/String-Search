import hosts from "../http/http"

export class Service{
    static async getFiles(searchedString:string){
        try {
            const result = await hosts.$host.post('search/', {searchedString});
            const obj = {'word':searchedString}
            const pyResults = await hosts.$hostPy.post('/search', obj);

            console.log('res',result.data);
            console.log('pyRes',pyResults.data)

            if (searchedString.includes(' ')){
                return result.data
            } else return pyResults.data;
        } catch (error) {
            console.log('[Service] error:', error);

            throw error;
        }
    }

    static async getSearchBarSuggestion(){
        try {
            const result = await hosts.$host.get('search/suggestions');
            // const py = await hosts.$hostPy.get('/try');
            console.log(result.data)

            return result.data
        } catch (error) {
            console.log('[SearchService error] ', error);

            throw error;
        }
    }
}

export default Service;