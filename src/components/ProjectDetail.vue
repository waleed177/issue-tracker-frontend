<template>
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

      <Issue v-for="issue in issues" 
        :key="issue" 
        :issue="issue" 
        :showPublicityModifier='showPublicityModifier'/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Issue from '@/components/Issue.vue';
import { axios } from '@/globals/globals';

@Options({
  components: {
    Issue,
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
  
  async mounted() {
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
    this.refresh();
  }

  async showPublicity(type: string) {
    this.showPublicityType = type;
    this.updateQuery();
  }

}
</script>
