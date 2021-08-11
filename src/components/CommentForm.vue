<template>
  <div v-if="!noCard" class="card">
    <div class="card-header">
      Write a comment.
    </div>
    <div class="card-body">
      Nickname:
      <input type="text" class="resize-vertical w-100" v-model="guestName"/>
      Comment:
      <textarea class="resize-vertical w-100" v-model="comment"/>
      <div v-if="!noSubmit">
        <input class="btn btn-outline-primary float-right" type="submit" value="Submit" v-on:click="submit()"/>
        <input class="btn btn-outline-danger float-right mr-1" type="submit" value="Close Issue" v-on:click="closeIssue()"/>
      </div>
    </div>
   
  </div>
  <div v-else>
    <textarea class="resize-vertical w-100" v-model="comment"/>
    <div v-if="!noSubmit">
      <input class="btn btn-outline-primary float-right" type="submit" value="Submit" v-on:click="submit()"/>
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
      comment: "",
      guestName: ""
    }
  },
  emits: ["submit"]
})
export default class CommentForm extends Vue {
  comment!: string;
  issueId!: number;
  noSubmit!: boolean;
  guestName!: string;

  public async submit(issueId: number | null = null, guestName: string | null = null) {
    let id: number = issueId == null ? this.issueId : issueId;
    let name: string = guestName == null ? this.guestName : guestName;

    let res = await axios.post("http://127.0.0.1:8000/tracker/comments/?issue=" + id, {
        "body": this.comment,
        "issue": id,
        "guest_name": name
    });
    this.comment = "";
    this.$emit("submit");
  }

  public async closeIssue() {
    await axios.post("http://127.0.0.1:8000/tracker/issues/" + this.issueId + "/close_or_open/", {
      "open": false
    });
  }
}
</script>

<style scoped>
  .resize-vertical {
    resize: vertical;
  }
</style>
