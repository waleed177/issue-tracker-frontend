<template>
  <span :style="{backgroundColor: color}" v-on:click="click">
    <input type="checkbox" ref="checkbox"/>
    {{label}}
  </span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    label: String,
    color: String,
    labelId: Number,
    startingState: Boolean,
  },
  data() {
    return {
      on: false
    }
  },
  emits: ["toggle"]
})
export default class IssueLabel extends Vue {
  label!: string;
  color!: string;
  labelId!: number;
  on!: boolean;
  startingState!: boolean;

  mounted() {
    this.on = this.startingState;
    (this.$refs.checkbox as any).checked = this.on;
  }

  click() {
    this.on = !this.on;
    (this.$refs.checkbox as any).checked = this.on;
    this.$emit("toggle", this.labelId, this.on);
  }
}
</script>

<style scoped>
  span {
    border: 1px solid rgb(192, 192, 192);
    border-radius: 8px;
    padding: 3px;
    background-color: rgb(255, 205, 205);
  }
</style>
