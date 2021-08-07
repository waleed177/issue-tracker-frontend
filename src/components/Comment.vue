<template>
  <div class="card">
    <div class="card-header">
      {{commentData.author.username}} <span class="text-muted"> commented. </span>
    </div>
    <div class="card-body">
      
      <div class="card-text">
        {{commentData.body}}
      </div>
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

</style>
