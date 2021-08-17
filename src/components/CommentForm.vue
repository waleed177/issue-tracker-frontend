<!--#region PREAMBLE  -->
<!--
    This is the client-side of the issue-tracker software.
    Copyright (C) 2021 waleed177 <potatoxel@gmail.com>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, version 3 of the
    License only.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->
<!--#endregion -->

<template>
  <div v-if="!noCard" class="card">
    <div class="card-header">
      Write a comment.
    </div>
    <div class="card-body">
      <div v-if="!global_state.isLoggedIn">
         Nickname:
        <input type="text" class="resize-vertical w-100" v-model="guestName"/>
      </div>
      Comment:
      <textarea class="resize-vertical w-100" v-model="comment"/>
      <div v-if="!noSubmit">
        <input class="btn btn-outline-primary float-right" type="submit" value="Submit" v-on:click="submit()"/>
        <input 
          :class="{
            'btn': true,
            'btn-outline-danger': issue.is_open,
            'btn-outline-success': !issue.is_open,
            'float-right': true,
            'mr-1': true
          }" 
          type="submit" 
          :value="issueOpenCloseLabel" 
          v-on:click="toggleIssue()"/>
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
import { axios, getAPIPath, global_state, isLoggedIn, set_token } from "@/globals/globals";

@Options({
  props: {
    issueId: Number,
    noSubmit: Boolean,
    noCard: Boolean
  },
  data() {
    return {
      comment: "",
      guestName: "",
      issueOpenCloseLabel: "Close Issue",
      issue: {},
      global_state: global_state
    }
  },
  emits: ["submit"]
})
export default class CommentForm extends Vue {
  comment!: string;
  issueId!: number;
  noSubmit!: boolean;
  guestName!: string;
  issue!: any;
  issueOpenCloseLabel!: string;

  async mounted() {
    let issue = await axios.get(getAPIPath("tracker/issues/" + this.issueId + "/"));
    this.issue = issue.data;
    this.refresh();
  }

  async refresh() {
    this.issueOpenCloseLabel = this.issue.is_open ? "Close Issue" : "Open Issue";
  }

  public async submit(issueId: number | null = null, guestName: string | null = null) {
    let id: number = issueId == null ? this.issueId : issueId;
    let name: string = guestName == null ? this.guestName : guestName;

    let res = await axios.post(getAPIPath("tracker/comments/?issue=" + id), {
        "body": this.comment,
        "issue": id,
        "guest_name": name
    });
    this.comment = "";
    this.$emit("submit");
  }

  public async toggleIssue() {
    let res = await axios.post(getAPIPath("tracker/issues/" + this.issueId + "/close_or_open/"), {
      "open": !this.issue.is_open
    });
    this.issue = res.data;
    this.$emit("submit");
    this.refresh();
  }
}
</script>

<style scoped>
  .resize-vertical {
    resize: vertical;
  }
</style>
