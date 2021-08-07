<template>
  <div>
    <IssueForm :project-id="this.$route.params.id" @submit="submit"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import IssueForm from '@/components/IssueForm.vue';

@Options({
  components: {
    IssueForm
  }
})

export default class NewIssue extends Vue {
  submit() {
    this.$router.push("/projects/" + this.$route.params.id);
  }
}
</script>
