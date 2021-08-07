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
import { axios, set_token } from "@/globals/globals";

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

      let res = await axios.post("http://127.0.0.1:8000/tracker/token-auth/", {
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
