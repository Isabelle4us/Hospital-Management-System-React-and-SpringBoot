import axios from 'axios';

const API_BASE_URL = '';
class ApiService {

    getAllDatas(url) {
        return axios.get(API_BASE_URL + url);
    }
    getAll(url) {
        return axios.get(API_BASE_URL + url);
    }
    getOneById(url) {
        return axios.get(API_BASE_URL + url);
    }

    // fetchPatientByEmail(email) {
    //     return axios.get(USER_API_BASE_URL + '/find-by-email/' + email);
    // }

    deleteById(url) {
        return axios.delete(API_BASE_URL + url);
    }

    post(url, data) {
        const str = JSON.stringify(data, null, 4);
        console.log("post request: " + str);
        return axios.post(API_BASE_URL + url, data);
    }

    put(url, data) {
        const str = JSON.stringify(data, null, 4);
        console.log("put request: " + str);
        return axios.put(API_BASE_URL + url, data);
    }

}

export default new ApiService();