<template>
  <div>
    Hello
    <Issue/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Issue from '@/components/Issue.vue';

@Options({
  components: {
    Issue
  },
})
export default class Projects extends Vue {}
</script>
