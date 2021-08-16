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
