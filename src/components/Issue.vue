<template>
  <div class="card">
    <span class="author">
      {{author}}
    </span>
    <span class="title">
      {{title}}
    </span>

    <comment v-for="comment in comments" :key="comment.id" author="waw" :content="comment.body"/>

    <comment-form v-on:submit="onCommentSubmit"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Comment from '@/components/Comment.vue';
import CommentForm from '@/components/CommentForm.vue';
import { axios, set_token } from "@/globals/globals";

@Options({
  props: {
    issue_id: Number
  },
  components: {
    Comment,
    CommentForm
  },
  data() {
    return {
      comments: []
    }
  }
})
export default class Issue extends Vue {
  comments!: [];

  async getComments() {
    let res = await axios.get("http://127.0.0.1:8000/tracker/comments/?issue=2");
    this.comments = res.data;
  }

  async mounted() {
    await this.getComments();
  }

  async onCommentSubmit() {
    await this.getComments();
  }
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
