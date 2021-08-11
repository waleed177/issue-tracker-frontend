import Axios, { AxiosInstance } from "axios";

export let axios: AxiosInstance;
const common: {"Content-Type": string, Authorization?: string} = {
    "Content-Type": "application/json"
}

if(localStorage.getItem("token")) {
    common.Authorization = "Token " + localStorage.getItem("token") as string;
}

axios = Axios.create({
    headers: {
        common: common
    }
})

export function set_token(token: string) {
    axios = Axios.create({
        headers: {
            common: {
                "Content-Type": "application/json",
                "Authorization":  "Token " + token
            }
        }
    })
    localStorage.setItem("token", token);
}

export function isLoggedIn() {
    return localStorage.getItem("token") != null;
}