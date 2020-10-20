import axios from "axios";
import config from "../config";


axios.defaults.withCredentials = true;
axios.defaults.credentials = "include";

var postRequest = async (route, body) => {
   try {
       var response = await axios.post(config.apiURL + route, body);
       return response.data;
   } catch (error) {
       console.log(config.apiURL + route);
       return {success: false, msg: "api Post request Failed", err: error, route: config.apiURL + route};
   }
}

var getRequest = async (route) => {
    try {
        var response = await axios.get(config.apiURL + route);
        return response.data;
    } catch (error) {
        return {success: false, msg: "api Get request Failed", err: error, route: config.apiURL + route};
    }
}

export const apiService = {
    postRequest,
    getRequest
}
