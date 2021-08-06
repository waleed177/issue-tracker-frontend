<template>
  <div class="card">
    <div>
      Title: <input class="title" type="text" v-model="title"/>
    </div>
    Comment:
    <CommentForm ref="comment_form" :issue-id="issueId" no-submit="true"/>
    <div>
      <input type="submit" value="submit" v-on:click="submit"/>
    </div>
 
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, set_token } from "@/globals/globals";
import CommentForm from "@/components/CommentForm.vue";

@Options({
  props: {
    projectId: Number
  },
  components: {
    CommentForm
  },
  data() {
    return {
      title: "",
      issueId: 0
    }
  },
  emits: ["submit"]
})
export default class IssueForm extends Vue {
  title!: string;
  issueId!: number;
  projectId!: number;

  public async submit() {
    console.log(this.title);
    console.log(this.projectId);
    let res = await axios.post("http://127.0.0.1:8000/tracker/issues/?project=" + this.projectId, {
        "title": this.title,
        "project": this.projectId
    });
    let comment_form: CommentForm = this.$refs.comment_form as CommentForm;
    await comment_form.submit(res.data.id);
    this.$emit("submit");
  }
}
</script>

<style scoped>
  .card {
    text-align: left;
    border: 1px solid black;
    border-radius: 3px;
    margin: 3px;
  }
  
  .comment {
    width: 100%;
  }
</style>
