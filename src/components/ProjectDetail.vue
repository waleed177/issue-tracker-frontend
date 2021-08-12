<template>
  <div class="card">
    <div class="card-header">
      Issues
      <router-link class="float-right" :to="'/new_issue/' + this.projectId">
        <button class="btn btn-outline-secondary">
          New Issue
        </button>
      </router-link>
    </div>
    <div class="card-body">
      <Issue v-for="issue in issues" 
        :key="issue" 
        :issue="issue" 
        :showPublicityModifier='showPublicityModifier'/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Issue from '@/components/Issue.vue';
import { axios } from '@/globals/globals';

@Options({
  components: {
    Issue,
  },
  props: {
    projectId: Number,
    showPublicityModifier: Boolean
  },
  data() {
    return {
      issues: []
    }
  }
})

export default class ProjectDetail extends Vue {
  issues!: []
  projectId!: number;
  showPublicityModifier!: boolean;
  
  async mounted() {

    let res = await axios.get("http://127.0.0.1:8000/tracker/issues/?project=" + this.projectId);
    this.issues = res.data;

  }

}
</script>
