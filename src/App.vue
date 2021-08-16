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

  <div class="jumbotron text-center mt-3">
    <router-link to="/legal">Legal</router-link>
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
