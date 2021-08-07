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
          <router-link to="/login">
            <button class="btn btn-outline-primary">
              Login
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

  <div class="container">
    <router-view/>
  </div>
</template>

<style>

</style>
