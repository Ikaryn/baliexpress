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
    
    put(path, body, header = '') {
        // console.log(options);
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...header },
            body: JSON.stringify(body)
        }
        
        const response = this.makeAPIRequest(path, options);
        return response;
        
    }
    
    get(path) {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const response = this.makeAPIRequest(path, options);
        return response;
    }
    
    post(path, body) {
        // console.log(options);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        
        const response = this.makeAPIRequest(path, options);
        return response;
        
    }

    delete(path, body) {
        // console.log(options);
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }
        
        const response = this.makeAPIRequest(path, options);
        return response;
        
    }
}