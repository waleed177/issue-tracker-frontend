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
    <div v-if="commentData.author != null && !commentData.is_status_change" class="card-header">
      {{commentData.author.username}} 
      <strong class="text-primary"> (Logged In) </strong> 
      <span class="text-muted"> commented at {{creationDate}} </span>
    </div>
    <div v-else-if="!commentData.is_status_change" class="card-header">
      {{commentData.guest_name}} 
      <strong class="text-secondary"> (Anonymous) </strong> 
      <span class="text-muted"> commented at {{creationDate}} </span>
    </div>
    <div class="card-body">
      
      <div v-if="!commentData.is_status_change" class="card-text">
        {{commentData.body}}
      </div>
      <div v-else class="card-text">
        <div v-if="statusBodyData.type=='label'">
          <strong> {{commentData.author.username}} </strong>
          <span v-if="statusBodyData.action=='removed'">
            Removed Label 
          </span>
          <span v-if="statusBodyData.action=='added'">
            Added Label 
          </span>
          <IssueLabel
              :label="statusBodyData.label.name"
              :color="statusBodyData.label.color"
              :noCheck="true"/>
          at
          <span class="text-muted"> {{creationDate}} </span>
        </div>
        <div v-else-if="statusBodyData.type=='issue'">
          <strong> {{commentData.author.username}} </strong>
          <span v-if="statusBodyData.action=='open'">
            Opened Issue 
          </span>
          <span v-if="statusBodyData.action=='close'">
            Closed Issue 
          </span>
          at
          <span class="text-muted"> {{creationDate}} </span>
        </div>
      </div>

    </div>
    
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { format_django_date } from '@/globals/date';
import IssueLabel from './IssueLabel.vue';

@Options({
  props: {
    commentData: Object
  },
  components: {
    IssueLabel
  },
  data() {
    return {
      creationDate: "",
      statusBodyData: {}
    }
  }
})
export default class Comment extends Vue {
  commentData!: any;
  creationDate!: string;
  statusBodyData!: any;

  mounted() {
    this.creationDate = format_django_date(this.commentData.creation_date);

    if(this.commentData.is_status_change)
      this.statusBodyData = JSON.parse(this.commentData.body);
  }
}
</script>

<style scoped>

</style>
