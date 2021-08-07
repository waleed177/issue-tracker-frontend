<template>
  <div class="card my-3">
    <div class="card-header">
      <router-link :to="'/issues/' + issue.id">{{issue.title}}</router-link> 
    </div>
    <div class="card-body text-muted py-0">
      opened by {{issue.author.username}}.
    </div>
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

  
</style>
