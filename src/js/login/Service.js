// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import axios from "axios";
import {toast} from 'react-toastify';

class LoginService {

    async getToken(userInfo) {
        let response;

        try {
            response = await axios.post('/auth', userInfo);
        } catch (error) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            throw new Error(error.message);
        }


        return response.data;
    }
}

export default new LoginService();
