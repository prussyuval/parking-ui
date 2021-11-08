import axios from 'axios';

const HOST = window.location.hostname;
let BASE_URL;
if (HOST === 'localhost' || HOST === '127.0.0.1') {
    // local deployment
    BASE_URL = 'http://' + HOST + ':5000/api';
} else {
    // production deployment
    BASE_URL = 'http://ec2-18-197-156-106.eu-central-1.compute.amazonaws.com/api';
}

const url = (relativeUrl) => `${BASE_URL}/${relativeUrl}`;

const LOGGING = false;

class ServerRequest {
    static logResponse(method, response) {
        if (LOGGING === true) {
            console.log(`[${method}] Received response:`);
            console.log(response);
        }
    }

    static async delete(relativeUrl) {
        const response = await axios.delete(url(relativeUrl), {
            withCredentials: true
        }).catch(error => {
            return error.response;
        });
        this.logResponse('DELETE', response);
        return response.data;
    }

    static async put(relativeUrl, body) {
        const response = await axios.put(url(relativeUrl), body, {
            withCredentials: true
        }).catch(error => {
            return error.response;
        });
        this.logResponse('PUT', response);
        return response.data;
    }

    static async post(relativeUrl, body) {
        const response = await axios.post(url(relativeUrl), body, {
            withCredentials: true
        }).catch(error => {
            return error.response;
        });
        this.logResponse('POST', response);
        return response.data;
    }

    static async get(relativeUrl, params = {}, cancelToken) {
        const response = await axios.get(url(relativeUrl), {
            cancelToken: cancelToken,
            params: params,
            withCredentials: false
        }).catch(error => {
            return error.response;
        });
        this.logResponse('GET', response);
        return response.data;
    }
}

export default ServerRequest;