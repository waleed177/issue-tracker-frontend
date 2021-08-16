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
    <button 
      v-if="paginationData.previous"
      class="btn btn-outline-primary mx-1"
      @click="previousPage">
      Previous
    </button>
    <span v-for="page in pages" :key="page">
      <a href="#" class="mx-1" @click="changePage(page)">
        <b v-if="pageNumber == page">
          {{page}}
        </b>
        <span v-else>
          {{page}}
        </span>
      </a> 
    </span>
    <button 
      v-if="paginationData.next"
      class="btn btn-outline-primary mx-1" 
      @click="nextPage">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    pageSize: Number
  },
  data() {
    return {
      pageNumber: 1,
      pages: [],
      paginationData: {}
    }
  },
  emits: ["changed"]
})
export default class Pagination extends Vue {
  pageNumber!: number;
  paginationData!: any;
  pages!: number[];
  pageSize!: number;

  refresh() {
    console.log(this.paginationData);
    this.pages = [];
    for(let i = 1; i <= Math.ceil(this.paginationData.count/5); i++) {
      this.pages.push(i);
    }
  }

  changePage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.$emit("changed", this.pageNumber);
    this.refresh();
  }

  previousPage() {
    this.changePage(this.pageNumber-1);
  }

  nextPage() {
    this.changePage(this.pageNumber+1);
  }
}
</script>

<style scoped>

</style>
