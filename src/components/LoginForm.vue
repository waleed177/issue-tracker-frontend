<!--#region PREAMBLE  -->
<!--
    This is the client-side of the issue-tracker software.
    Copyright (C) 2021 waleed177 <potatoxel@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, version 3 of the
    License only.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<!--#endregion -->

<template>
  <div class="card">
    <div class="card-header">
      Login
    </div>
    <div class="card-body">
      <div>
        Username: <input class="form-control" type="text" v-model="username"/>
      </div>
      <div>
        Password: <input class="form-control" type="password" v-model="password"/>
      </div>
      <input class="btn btn-outline-primary float-right mt-2" type="submit" value="Login" v-on:click="login"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import router from '@/router';
import { axios, getAPIPath, set_token } from "@/globals/globals";

@Options({
  props: {},
  data() {
    return {
      username: "",
      password: ""
    }
  }
})
export default class CommentForm extends Vue {
  username!: string
  password!: string

  public async login() {
    try {

      let res = await axios.post(getAPIPath("tracker/token-auth/"), {
        "username": this.username,
        "password": this.password
      });
      
      let token = res.data.token;
      set_token(token);
      console.log("Login success!");

      router.push({
        name: "home"
      })
    } catch (error) {
      console.log("Login failed.");
    }
    
  }
}
</script>

<style scoped>

</style>
