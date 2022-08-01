import axios from 'axios';
import * as env from '../../../env.json'

const url = env.host_api_item

export const getdata = async (input) => {

    // const user = username.replace(/\s/g, "");
    // console.log(username);
    try {
        const response = await axios.get(url + input.path);
        const data = await response.data
        // console.log(data);
        return data;
    } catch (e) {
        // console.log(e.response.data.message);
        return e.response.data.message;
    }

}

export const postdata = async (input) => {
    // console.log(input);
    try {
        const response = await axios.post(url + input.path, { data: input.data });
        const data = await response.data
        return data;
    } catch (e) {
        // console.log(e.response.data.message);
        return e.response.data.message;
    }

}
