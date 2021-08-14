<template>
  <div class="row">
    <div class="col-9 mr-0 pr-1">
      <input class="form-control" type="text" v-model="searchQuery"/>
    </div>
    <div class="col-3 ml-0 pl-1">
      <input class="btn btn-outline-primary w-100" type="submit" value="Search" @click="submit"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {

  },
  data() {
    return {
      searchQuery: ""
    }
  },
  emits: ["submit"]
})
export default class IssueLabel extends Vue {
  searchQuery!: string;
  
  submit() {
    this.$emit("submit", this.searchQuery);
  }

}
</script>

<style scoped>

</style>
