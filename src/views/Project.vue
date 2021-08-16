<template>
  <div>
    <ProjectDetail 
      :project-id="$route.params.id"
      :showPublicityModifier="true"
      :showPublicityFilters="project.is_project_admin"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ProjectDetail from '@/components/ProjectDetail.vue';
import { axios } from '@/globals/globals';

@Options({
  components: {
    ProjectDetail
  },
  data() {
    return {
      project: {}
    }
  }
})

export default class Project extends Vue {
  project!: any;

  async mounted() {

    let res = await axios.get("http://127.0.0.1:8000/tracker/projects/" + this.$route.params.id + "/");
    this.project = res.data;

  }
}

</script>
