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
    <div class="card-body">
      <button class="btn btn-outline-primary w-100" @click="labelAdder = !labelAdder"> 
        <div v-if="labelAdder">
          labels ^
        </div>
        <div v-else>
          labels v
        </div>
      </button>

      <div v-if="labelAdder" class="rounded-bottom border border-primary">
        <div v-for="label in labels" :key="label.id">
          <IssueLabel 
            :label="label.name"
            :color="label.color" 
            :startingState="label.on"
            :label-id="label.id" 
            :issue="issueId"
            @toggle="issueLabelToggle"/>
        </div>
      </div>
      

      <div style="margin-top: 20px">
        <IssueLabel v-for="label in currentLabels" :key="label.id"
          :label="label.name"
          :color="label.color" 
          :startingState="label.on"
          :label-id="label.id" 
          :issue="issueId"
          @toggle="issueLabelToggle"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios } from "@/globals/globals";
import IssueLabel from "@/components/IssueLabel.vue";

@Options({
  props: {
    issueId: Number,
  },
  components: {
    IssueLabel
  },
  data() {
    return {
      labels: [],
      currentLabels: [],
      labelAdder: false
    }
  },
  emits: []
})
export default class LabelsEditor extends Vue {
  labels!: Array<any>;
  issueId!: number;
  currentLabels!: Array<any>;

  async refresh() {
    let res = await axios.get("http://127.0.0.1:8000/tracker/issue_labels/");
    
    let currentLabels = await axios.get("http://127.0.0.1:8000/tracker/issues/" + this.issueId + "/");
    currentLabels.data.labels.forEach((current: any) => {
      current.on = true;
    });
    
    res.data.forEach((value: any) => {
      value.on = false;
      currentLabels.data.labels.forEach((current: any) => {
        if(value.id == current.id) {
          value.on = true;
        }
      });
    });

    this.labels = res.data;
    this.currentLabels = currentLabels.data.labels;
  }

  async mounted() {
    this.refresh();
  }

  async issueLabelToggle(id: number, on: boolean) {
    let res = await axios.post("http://127.0.0.1:8000/tracker/issues/set_label/", {
      issue: this.issueId,
      label: id,
      on: on
    });
    this.refresh();
    this.$emit("change");
  }
}
</script>

<style scoped>
  .labelAdder {
    background-color: rgb(218, 218, 218);
    padding: 10px;
  }
</style>
