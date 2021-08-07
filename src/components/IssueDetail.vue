<template>
  <div class="row my-3">
    <div class="col">
      <div class="card">
        <div class="card-header">
          {{issue.title}}
        </div>
        <div class="card-body">
          <div class="card-text text-muted">
            {{issue.author.username}} opened this issue.
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-8">
      
      <comment class="mb-3" v-for="comment in comments" :key="comment.id" :comment-data="comment"/>

      <comment-form :issue-id="issueId" v-on:submit="onCommentSubmit"/>
    </div>
    <div class="col-4">
      <LabelsEditor :issue-id="issueId" @change="refresh"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Comment from '@/components/Comment.vue';
import CommentForm from '@/components/CommentForm.vue';
import { axios } from "@/globals/globals";
import LabelsEditor from "@/components/LabelsEditor.vue";

@Options({
  props: {
    issueId: Number
  },
  components: {
    Comment,
    CommentForm,
    LabelsEditor,
  },
  data() {
    return {
      comments: [],
      issue: {
        author: {
          username: "..."
        },
        title: "..."
      }
    }
  }
})
export default class IssueDetail extends Vue {
  comments!: [];
  issueId!: number;
  issue!: any;

  async refresh() {
    let res = await axios.get("http://127.0.0.1:8000/tracker/comments/?issue=" + this.issueId);
    this.comments = res.data;

    let issue = await axios.get("http://127.0.0.1:8000/tracker/issues/" + this.issueId + "/");
    this.issue = issue.data;
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

</style>
