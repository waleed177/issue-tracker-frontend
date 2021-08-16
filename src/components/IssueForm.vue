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
  <div class="card">
    <div class="card-header">
      Title: <input class="w-100 d-inline" type="text" v-model="title"/>
    </div>
    <div class="card-body">
      <div v-if="!loggedIn" class="mb-2">
        Nickname: <input type="text" class="resize-vertical w-100" v-model="guestName"/>
      </div>
      Comment:
      <CommentForm ref="comment_form" :issue-id="issueId" :no-card="true" no-submit="true"/>
      <input class="btn btn-outline-primary mt-2 float-right" type="submit" value="Submit Issue" v-on:click="submit"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, isLoggedIn, set_token } from "@/globals/globals";
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
      issueId: 0,
      loggedIn: false,
      guestName: ""
    }
  },
  emits: ["submit"]
})
export default class IssueForm extends Vue {
  title!: string;
  issueId!: number;
  projectId!: number;
  loggedIn!: boolean;
  guestName!: string;

  mounted() {
    this.loggedIn = isLoggedIn();
  }

  public async submit() {
    let res = await axios.post("http://127.0.0.1:8000/tracker/issues/?project=" + this.projectId, {
        "title": this.title,
        "project": this.projectId,
        "guest_name": this.guestName
    });
    let comment_form: CommentForm = this.$refs.comment_form as CommentForm;
    await comment_form.submit(res.data.id, this.guestName);
    this.$emit("submit");
  }
}
</script>

<style scoped>

</style>
