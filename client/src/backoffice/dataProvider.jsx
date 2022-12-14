import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8080';
const httpClient = fetchUtils.fetchJson;

const dataProvider= {
    getList: (resource, params) => {
        const url = `${apiUrl}/${resource}`;

        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => response.json())
            .then( data => {
                if(data) resolve(data);
                else reject()
            } )
        })
    },

    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;

        return new Promise((resolve, reject) => {
            fetch(url)
            .then(response => response.json())
            .then( data => {
                if(data) resolve(data);
                else reject()
            } )
        })
    },
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        if(resource !== 'id'){
            const url = `${apiUrl}/${resource}?${stringify(query)}`;
            return httpClient(url).then(({ json }) => ({ data: json }));
        }else{
            return new Promise((resolve, reject) => { resolve()})
        }
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) => {
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }))
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { id: params.id} )
        };
    
        return new Promise((resolve, reject) => {
            fetch(`${apiUrl}/${resource}`, requestOptions)
            .then(response => response.json())
            .then(data => {
            resolve(data)
            });
        })
    },

    deleteMany: (resource, params) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { id: params.ids} )
        };
    
        return new Promise((resolve, reject) => {
            fetch(`${apiUrl}/${resource}`, requestOptions)
            .then(response => response.json())
            .then(data => {
            resolve(data)
            });
        })
    }
};

export default dataProvider;