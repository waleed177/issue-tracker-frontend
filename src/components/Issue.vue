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
  <div class="card my-3">
    <div class="card-header">
      <router-link :to="'/issues/' + issue_data.id">{{issue_data.title}}</router-link> 
      <div v-if="showPublicityModifier && issue_data.can_modify_publicity" class="float-right">
        <input type="button"
          :class="publicityButtonClass" 
          :value="publicityButtonLabel" 
          @click="togglePublic"/>
      </div>
    </div>
    <div class="card-body text-muted py-0">
      <div v-if="issue_data.author != null">
        opened by {{issue_data.author.username}} at {{creationDate}}. 
      </div>
      <div v-else>
        opened by {{issue_data.guest_name}} at {{creationDate}}.
      </div>
      <IssueLabel v-for="label in issue_data.labels" :key="label.id"
          :label="label.name"
          :color="label.color" 
          :startingState="label.on"
          :label-id="label.id" 
          :no-check="true"
          :issue="issue_data.id"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios, getAPIPath } from "@/globals/globals";
import { format_django_date } from "@/globals/date";
import IssueLabel from "@/components/IssueLabel.vue";

@Options({
  props: {
    issue: Object,
    showPublicityModifier: Boolean
  },
  components: {
    IssueLabel
  },
  data() {
    return {
      creationDate: "",
      publicityButtonLabel: "Make Public",
      issue_data: {},
      publicityButtonClass: {
        'btn': true,
        'btn-outline-success': true,
        'btn-outline-danger': false 
      }
    }
  }
})
export default class IssueDetail extends Vue {
  issue!: any;
  issue_data!: any;
  creationDate!: string;
  publicityButtonLabel!: string;
  publicityButtonClass!: any;

  mounted() {
    this.creationDate = format_django_date(this.issue.creation_date);
    this.issue_data = this.issue;
    this.refresh();
  }

  refresh() {
    if(this.issue_data.publicity == 1) {
      this.publicityButtonLabel = "Make Private";
      this.publicityButtonClass['btn-outline-success'] = false;
      this.publicityButtonClass['btn-outline-danger'] = true;
    } else {
      this.publicityButtonLabel = "Make Public";
      this.publicityButtonClass['btn-outline-success'] = true;
      this.publicityButtonClass['btn-outline-danger'] = false;
    }
  }

  async togglePublic() {
    let res = await axios.post(getAPIPath("tracker/issues/" + this.issue_data.id + "/toggle_publicity/"));
    this.issue_data = res.data;
    this.refresh();
  }
}
</script>

<style scoped>

  
</style>
