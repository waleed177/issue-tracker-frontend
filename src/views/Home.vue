<template>
  <div class="home">
    <Comment author="aa" content="woow"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Comment from '@/components/Comment.vue'

@Options({
  components: {
    Comment
  },
})
export default class Home extends Vue {}
</script>
