<template>
  <div class="card">
    <div class="author">
      {{commentData.author.username}}
    </div>
    <div class="content">
      {{commentData.body}}
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    commentData: Object
  }
})
export default class Comment extends Vue {
  commentData!: unknown
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
