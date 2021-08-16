//#define PREAMBLE
//   This is the client-side of the issue-tracker software.
//   Copyright (C) 2021 waleed177 <potatoxel@gmail.com>
//
//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Affero General Public License as
//   published by the Free Software Foundation, version 3 of the
//   License only.
//
//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU Affero General Public License for more details.
//
//   You should have received a copy of the GNU Affero General Public License
//   along with this program.  If not, see <https://www.gnu.org/licenses/>.
//#endregion

import Axios, { AxiosInstance } from "axios";
import { reactive } from "vue";

export const global_state = reactive({
    isLoggedIn: false
});

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
    global_state.isLoggedIn = true;
}

export function isLoggedIn() {
    return localStorage.getItem("token") != null;
}

export function logout() {
    localStorage.removeItem("token");
    global_state.isLoggedIn = false;
    return true;
}

global_state.isLoggedIn = isLoggedIn();