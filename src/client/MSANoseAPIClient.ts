const FormData = require('form-data');
import axios, { AxiosResponse } from 'axios';

export async function validateMicroservice(rootPath: string) {

    const url = "http://localhost:8080/api/v1/report";

    const options = {
        method: 'POST',
        url: url,
        headers: {
            'content-type': 'application/json'
        },
        data: {
            "pathToCompiledMicroservices": rootPath,
            "organizationPath": "",
            "outputPath": ""
        },
    };

    return axios.request(options).then(function (response) {
        console.log(response.data);
        return response.data;
    })
        .catch(function (error) {
            console.error(error);
        });

}