<template>
  <div>
    <ProjectDetail 
      :project-id="$route.params.id"
      :showPublicityModifier="true"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ProjectDetail from '@/components/ProjectDetail.vue';

@Options({
  components: {
    ProjectDetail
  }
})

export default class Project extends Vue {

}
</script>
