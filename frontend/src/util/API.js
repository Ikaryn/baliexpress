const API_URL = 'http://localhost:5000'


const getJSON = (path, options) => 
    fetch(path, options)
        .then(res => res.json())
        .catch(err => console.warn(`API_ERROR: ${err.message}`));


export default class API {
    constructor(url = API_URL) {
        this.url = url;
    }
    
    makeAPIRequest(path, options) {
        return getJSON(`${this.url}/${path}`, options);
    }    
    
    get(path, options) {
        const response = this.makeAPIRequest(path, options);
        console.log("get");
        console.log(response);
        return response;
    }
}