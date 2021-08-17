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
  <div class="row my-3">
    <div class="col">
      <div class="card">
        <div class="card-header">
          {{issue.title}}
        </div>
        <div class="card-body">
          <div v-if="issue.author != null" class="card-text text-muted">
            {{issue.author.username}} opened this issue at {{creationDate}}
          </div>
          <div v-else class="card-text text-muted">
            {{issue.guest_name}} opened this issue at {{creationDate}}
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
import { axios, getAPIPath } from "@/globals/globals";
import LabelsEditor from "@/components/LabelsEditor.vue";
import { format_django_date } from "@/globals/date";

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
      },
      creationDate: ""
    }
  }
})
export default class IssueDetail extends Vue {
  comments!: [];
  issueId!: number;
  issue!: any;
  creationDate!: string;

  async refresh() {
    let res = await axios.get(getAPIPath("tracker/comments/?issue=" + this.issueId));
    this.comments = res.data;

    let issue = await axios.get(getAPIPath("tracker/issues/" + this.issueId + "/"));
    this.issue = issue.data;

    this.creationDate = format_django_date(this.issue.creation_date);
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
