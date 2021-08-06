<template>
  <div class="card">
    <div>
      <textarea class="comment" v-model="comment"/>
    </div>
    <div v-if="!noSubmit">
      <input type="submit" value="submit" v-on:click="submit()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, set_token } from "@/globals/globals";

@Options({
  props: {
    issueId: Number,
    noSubmit: Boolean
  },
  data() {
    return {
      comment: ""
    }
  },
  emits: ["submit"]
})
export default class CommentForm extends Vue {
  comment!: string;
  issueId!: number;
  noSubmit!: boolean;

  public async submit(issueId: number | null = null) {
    let id: number = issueId == null ? this.issueId : issueId;
    let res = await axios.post("http://127.0.0.1:8000/tracker/comments/?issue=" + id, {
        "body": this.comment,
        "issue": id
    });
    this.comment = "";
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
    resize: vertical;
  }
</style>
