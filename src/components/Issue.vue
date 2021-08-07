<template>
  <div class="card my-3">
    <div class="card-header">
      <router-link :to="'/issues/' + issue.id">{{issue.title}}</router-link> 
    </div>
    <div class="card-body text-muted py-0">
      opened by {{issue.author.username}} at {{creationDate}}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios } from "@/globals/globals";
import { format_django_date } from "@/globals/date";

@Options({
  props: {
    issue: Object
  },
  components: {},
  data() {
    return {
      creationDate: ""
    }
  }
})
export default class IssueDetail extends Vue {
  issue!: any;
  creationDate!: string;

  mounted() {
    this.creationDate = format_django_date(this.issue.creation_date);
  }
}
</script>

<style scoped>

  
</style>
