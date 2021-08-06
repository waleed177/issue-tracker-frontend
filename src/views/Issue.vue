<template>
  <div>
    <IssueDetail :issue-id="$route.params.id"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IssueDetail from '@/components/IssueDetail.vue';

@Options({
  components: {
    IssueDetail
  }
})

export default class Issue extends Vue {

}
</script>
