<template>
  <div class="card">
    <div>
      <input class="comment" type="text" v-model="comment"/>
    </div>
    <div>
      <input type="submit" value="submit" v-on:click="sendComment"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, set_token } from "@/globals/globals";

@Options({
  props: {},
  data() {
    return {
      comment: ""
    }
  },
  emits: ["submit"]
})
export default class CommentForm extends Vue {
  comment!: string;

  public async sendComment() {
    let res = await axios.post("http://127.0.0.1:8000/tracker/comments/?issue=2", {
        "body": this.comment,
        "issue": 2
    });
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
