<template>
  <div class="card">
    <div v-if="commentData.author != null" class="card-header">
      {{commentData.author.username}} <span class="text-muted"> commented at {{creationDate}} </span>
    </div>
    <div v-else class="card-header">
      {{commentData.guest_name}} <span class="text-muted"> commented at {{creationDate}} </span>
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
import { format_django_date } from '@/globals/date';

@Options({
  props: {
    commentData: Object
  },
  data() {
    return {
      creationDate: ""
    }
  }
})
export default class Comment extends Vue {
  commentData!: any;
  creationDate!: string;

  mounted() {
    this.creationDate = format_django_date(this.commentData.creation_date)
  }
}
</script>

<style scoped>

</style>
