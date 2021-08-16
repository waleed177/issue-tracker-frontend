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

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/bootstrap4.min.css"

createApp(App).use(router).mount('#app')