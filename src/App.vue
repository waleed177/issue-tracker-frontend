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
          <router-link v-if="!isLoggedIn" to="/login">
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
import { axios, isLoggedIn, logout } from '@/globals/globals';
import { computed } from '@vue/runtime-core';

@Options({
  data() {
    return {
      project: {},
      isLoggedIn: false
    }
  }
})

export default class App extends Vue {
  project!: any;
  isLoggedIn!: boolean;

  async mounted() {
    this.isLoggedIn = isLoggedIn();
  }

  logout() {
    if(logout()) {
      this.isLoggedIn = false;
    }
  }
}

</script>

<style>

</style>
