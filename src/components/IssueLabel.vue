<template>
  <div class="label" 
      :style="{
        backgroundColor: color,
        border: border,
        color: textColor
      }"
      v-on:click="click">
    <input type="checkbox" ref="checkbox"/>
    {{label}}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

function componentToHex(c: string | number) {
  var hex = (c as any).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex: string) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

@Options({
  props: {
    label: String,
    color: String,
    labelId: Number,
    startingState: Boolean,
  },
  data() {
    return {
      on: false,
      border: "1px solid black",
      textColor: "black",
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
  border!: string;
  textColor!: string;

  mounted() {
    this.on = this.startingState;
    (this.$refs.checkbox as any).checked = this.on;

    //'1px solid black'
    var color = hexToRgb(this.color);
    if(color != null){
      let add = -Math.round(Math.max(color.r, color.g, color.b)/1.5);
      color.r = Math.max(0, Math.min(255, color.r+add));
      color.g = Math.max(0, Math.min(255, color.g+add));
      color.b = Math.max(0, Math.min(255, color.b+add));
      this.border = "2px solid " + rgbToHex(color.r, color.g, color.b);
      this.textColor = rgbToHex(color.r, color.g, color.b);
    }
    
  }

  click() {
    this.on = !this.on;
    (this.$refs.checkbox as any).checked = this.on;
    this.$emit("toggle", this.labelId, this.on);
  }
}
</script>

<style scoped>
  .label {
    border: 1px solid rgb(192, 192, 192);
    border-radius: 32px;
    padding: 3px;
    margin: 3px;
    display:inline-block;
  }
</style>
