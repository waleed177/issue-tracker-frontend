<template>
  <div class="card">
    <div v-for="label in labels" :key="label.id" class="labelDiv">
      <IssueLabel 
        :label="label.name"
        :color="label.color" 
        :startingState="label.on"
        :label-id="label.id" 
        :issue="issueId"
        @toggle="issueLabelToggle"/>
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
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { axios } from "@/globals/globals";
import IssueLabel from "@/components/IssueLabel.vue";

@Options({
  props: {
    issueId: Number
  },
  components: {
    IssueLabel
  },
  data() {
    return {
      labels: Array,
      currentLabels: Array,
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
  .labelDiv {
    margin-top: 5px;
  }
</style>
