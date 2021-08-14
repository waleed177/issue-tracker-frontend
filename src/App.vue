<template>
  <nav class="navbar navbar-expand navbar-light bg-light mb-3">
    <div class="container-fluid">
      <div class="nav navbar-nav">        
        <router-link
          :class="{
            'nav-item': true,
            'nav-link': true,
            'active': this.$route.name == 'home'
          }" 
          to="/">Projects</router-link>
      </div>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <router-link v-if="!global_state.isLoggedIn" to="/login">
            <button class="btn btn-outline-success">
              Login
            </button>
          </router-link>
          <button v-else class="btn btn-outline-danger" @click="logout">
              Logout
          </button>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">
    <router-view/>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, global_state, isLoggedIn, logout } from '@/globals/globals';
import { computed } from '@vue/runtime-core';

@Options({
  data() {
    return {
      project: {},
      global_state: global_state
    }
  }
})

export default class App extends Vue {
  project!: any;
  isLoggedIn!: boolean;

  logout() {
    logout();
  }
}

</script>

<style>

</style>
