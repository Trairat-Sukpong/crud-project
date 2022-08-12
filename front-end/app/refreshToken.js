import axios from 'axios'
import * as env from './env.json'

export const refresh_token = async () => {
    await axios({
        method: "POST",
        withCredentials: true,
        url: env.host_api + "/api/auth/refresh_token",
    })
        .then(function (response) {
            if (response.data.status == "ok") {
                localStorage.setItem('token', response.data.token)
                window.location.reload();
            } else {
                window.location.reload();
            }
        })
        .catch(function (error) {
            localStorage.removeItem('token')
            console.log(error);

        });
}