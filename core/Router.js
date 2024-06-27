export class Router {
    constructor() {
        this.endpoints = {};
    }

    getRouteMask(url, method) {
        return `${url}:${method}`;
    }

    request(url, method, callback) {
        const endpointKey = this.getRouteMask(url, method);

        if (!this.endpoints[endpointKey]) {
            this.endpoints[endpointKey] = callback;
        } else {
            throw new Error('Такой адрес уже объявлен');
        }
    }

    get(url, callback) {
        this.request(url, 'get', callback);
    }

    post(url, callback) {
        this.request(url, 'post', callback);
    }

    put(url, callback) {
        this.request(url, 'put', callback);
    }

    delete(url, callback) {
        this.request(url, 'delete', callback);
    }
}
