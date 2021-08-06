<template>
  <div class="card">
    <span class="author">
      {{author}}
    </span>
    <span class="title">
      {{title}}
    </span>

    <comment v-for="comment in comments" :key="comment.id" :comment-data="comment"/>

    <comment-form :issue-id="issueId" v-on:submit="onCommentSubmit"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Comment from '@/components/Comment.vue';
import CommentForm from '@/components/CommentForm.vue';
import { axios } from "@/globals/globals";

@Options({
  props: {
    issueId: Number
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
export default class IssueDetail extends Vue {
  comments!: [];
  issueId!: number;

  async refresh() {
    let res = await axios.get("http://127.0.0.1:8000/tracker/comments/?issue=" + this.issueId);
    this.comments = res.data;
  }

  async mounted() {
    await this.refresh();
  }

  async onCommentSubmit() {
    await this.refresh();
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
