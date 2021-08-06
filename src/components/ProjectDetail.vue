<template>
  <div>
    Project
    <Issue v-for="issue in issues" :key="issue" :issue="issue"/>
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
  props: {
    projectId: Number
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

  async mounted() {

    let res = await axios.get("http://127.0.0.1:8000/tracker/issues/?project=" + this.projectId);
    this.issues = res.data;

  }

}
</script>
