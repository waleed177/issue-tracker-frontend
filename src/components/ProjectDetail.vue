<template>
  <div class="row">
    <div class="col-8">
      <div class="card">
        <div class="card-header">
          Issues
          <router-link class="float-right" :to="'/new_issue/' + this.projectId">
            <button class="btn btn-outline-secondary">
              New Issue
            </button>
          </router-link>
        </div>
        <div class="card-body">
          <div v-if="showPublicityFilters">
            Show Only:
            <button class="btn btn-outline-danger mx-1" @click="showPublicity('private')">
              Private
            </button>
            <button class="btn btn-outline-success mx-1" @click="showPublicity('public')">
              Public
            </button>
            <button class="btn btn-outline-primary mx-1" @click="showPublicity('all')">
              All
            </button>
            <p> Currently showing: {{showPublicityType}} issues. </p>
          </div>
          <SearchBar @submit="search"/>
          <Issue v-for="issue in issues" 
            :key="issue" 
            :issue="issue" 
            :showPublicityModifier='showPublicityModifier'/>
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-header">
          Filters
        </div>
        <div class="card-body">
          <div v-for="label in labels" :key="label.id">
            <IssueLabel 
              :label="label.name"
              :color="label.color" 
              :startingState="true"
              :label-id="label.id" 
              @toggle="issueLabelToggle"/>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Issue from '@/components/Issue.vue';
import { axios } from '@/globals/globals';
import IssueLabel from '@/components/IssueLabel.vue'
import SearchBar from '@/components/SearchBar.vue';

@Options({
  components: {
    Issue,
    IssueLabel,
    SearchBar
  },
  props: {
    projectId: Number,
    showPublicityModifier: Boolean,
    showPublicityFilters: Boolean
  },
  data() {
    return {
      issues: [],
      query: "",
      showPublicityType: "all",
      labels: [],
      searchQuery: ""
    }
  }
})

export default class ProjectDetail extends Vue {
  issues!: []
  projectId!: number;
  showPublicityModifier!: boolean;
  query!: string;
  showPublicityType!: string;
  showPublicityFilters!: boolean;
  labels!: Array<any>;
  searchQuery!: string;

  async mounted() {
    let labels = await axios.get("http://127.0.0.1:8000/tracker/issue_labels/");
    this.labels = labels.data;

    this.labels.forEach((element: any) => {
      element.on = true;
    });
    this.refresh();
  }

  async refresh() {
    let res = await axios.get("http://127.0.0.1:8000/tracker/issues/?project=" + this.projectId + "&" + this.query);
    this.issues = res.data;
  }

  async updateQuery() {
    this.query = "";

    if(this.showPublicityType == "private")
      this.query += "publicity=0&";
    else if(this.showPublicityType == "public")
      this.query += "publicity=1&";
    
    let labels = "";
    this.labels.forEach((label: any) => {
      if(label.on) {
        labels += label.id + "$";
      }
    });
    labels = labels.substring(0, labels.length-1);

    if (labels != "")
      this.query += "labels=" + labels + "&";

    if (this.searchQuery.trim() != "") {
      this.query += "query=" + encodeURIComponent(this.searchQuery) + "&";
    }

    this.refresh();
  }

  async showPublicity(type: string) {
    this.showPublicityType = type;
    this.updateQuery();
  }

  async issueLabelToggle(id: number, on: boolean) {

    this.labels.forEach((label: any, key: number) => {
      if(label.id == id) {
        this.labels[key].on = on;
      }
    });
    
    this.updateQuery();
  }
  
  async search(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.updateQuery();
  }

}
</script>
