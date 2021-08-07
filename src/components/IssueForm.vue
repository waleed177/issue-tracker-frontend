<template>
  <div class="card">
    <div class="card-header">
      Title: <input class="w-100 d-inline" type="text" v-model="title"/>
    </div>
    <div class="card-body">
      <CommentForm ref="comment_form" :issue-id="issueId" :no-card="true" no-submit="true"/>
      <input class="btn btn-outline-primary mt-2 float-right" type="submit" value="Submit Issue" v-on:click="submit"/>
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

</style>
