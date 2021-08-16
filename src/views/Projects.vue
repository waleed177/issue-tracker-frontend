<template>
  <div class="card">
    <div class="card-header">
      Projects
    </div>
    <div class="card-body">
      <div v-for="project in projects" :key="project.id">
        <router-link :to="'/projects/' + project.id">{{project.name}}</router-link> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Issue from '@/components/Issue.vue';
import { axios } from '@/globals/globals';

@Options({
  components: {
    Issue
  },
  data() {
    return {
      projects: []
    }
  }
})

export default class Projects extends Vue {
  projects!: []

  async mounted() {

    let res = await axios.get("http://127.0.0.1:8000/tracker/projects/");
    this.projects = res.data.results;

  }

}
</script>
