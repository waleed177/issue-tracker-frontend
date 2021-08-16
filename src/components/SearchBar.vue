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
  <div class="row">
    <div class="col-9 mr-0 pr-1">
      <input class="form-control" type="text" v-model="searchQuery"/>
    </div>
    <div class="col-3 ml-0 pl-1">
      <input class="btn btn-outline-primary w-100" type="submit" value="Search" @click="submit"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {

  },
  data() {
    return {
      searchQuery: ""
    }
  },
  emits: ["submit"]
})
export default class IssueLabel extends Vue {
  searchQuery!: string;
  
  submit() {
    this.$emit("submit", this.searchQuery);
  }

}
</script>

<style scoped>

</style>
