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
    <div class="card-header">
      Projects
    </div>
    <div class="card-body">
      <div v-for="project in projects" :key="project.id">
        <router-link :to="'/projects/' + project.id">{{project.name}}</router-link> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Issue from '@/components/Issue.vue';
import { axios, getAPIPath } from '@/globals/globals';

@Options({
  components: {
    Issue
  },
  data() {
    return {
      projects: []
    }
  }
})

export default class Projects extends Vue {
  projects!: []

  async mounted() {
    
    let res = await axios.get(getAPIPath("tracker/projects/"));
    this.projects = res.data.results;

  }

}
</script>
