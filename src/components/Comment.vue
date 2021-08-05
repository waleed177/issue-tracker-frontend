<template>
  <div class="card">
    <div class="author">
      {{author}}
    </div>
    <div class="content">
      {{content}}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    author: String,
    content: String
  }
})
export default class Comment extends Vue {
  msg!: string;
  content!: string;

}
</script>

<style scoped>
  .card {
    text-align: left;
    border: 1px solid black;
    border-radius: 3px;
    margin: 3px;
  }
</style>
