<template>
  <div class="card">
    <span class="author">
      {{issue.author}}
    </span>
    <span class="title">
      {{issue.title}}
    </span>
    <router-link :to="'/issues/' + issue.id">Home</router-link> 
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios } from "@/globals/globals";

@Options({
  props: {
    issue: Object
  },
  components: {}
})
export default class IssueDetail extends Vue {
  issue: any;
}
</script>

<style scoped>
  .card {
    text-align: left;
    border: 1px solid black;
    border-radius: 3px;
    padding: 3px;
  }
  
</style>
