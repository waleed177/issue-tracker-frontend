<template>
  <div v-if="!noCard" class="card">
    <div class="card-header">
      Write a comment.
    </div>
    <div class="card-body">
      <textarea class="resize-vertical w-100" v-model="comment"/>
      <div v-if="!noSubmit">
        <input class="btn btn-outline-primary float-right" type="submit" value="submit" v-on:click="submit()"/>
      </div>
    </div>
   
  </div>
  <div v-else>
    <textarea class="resize-vertical w-100" v-model="comment"/>
    <div v-if="!noSubmit">
      <input class="btn btn-outline-primary float-right" type="submit" value="submit" v-on:click="submit()"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, set_token } from "@/globals/globals";

@Options({
  props: {
    issueId: Number,
    noSubmit: Boolean,
    noCard: Boolean
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
  .resize-vertical {
    resize: vertical;
  }
</style>
