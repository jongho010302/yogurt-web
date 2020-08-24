<template>
  <label class="el-radio is-checked" :class="{ 'is-checked': checked }" role="radio">
    <span class="el-radio__input" :class="{ 'is-checked': checked }">
      <span class="el-radio__inner"></span>
      <input type="radio" class="el-radio__original" :value="value" aria-hidden="true" checked />
    </span>
    <span class="el-radio__label">{{ label }}</span>
  </label>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class TicketCard extends Vue {
  @Prop() label!: string;
  @Prop() value!: any;
  @Prop() checked!: boolean;

  created() {
    if (this.checked) {
      this.$emit('onChange', this.value);
    }
  }
}
</script>

<style>
.el-radio {
  color: #606266;
  font-weight: 500;
  line-height: 1;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  outline: none;
  font-size: 14px;
}
.el-radio__input {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  display: inline-block;
  line-height: 1;
  position: relative;
  vertical-align: middle;
}
.el-radio__input.is-checked .el-radio__inner {
  border-color: #4799f2;
  background: #4799f2;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #4799f2;
}
.el-radio__inner {
  border: 1px solid #dcdfe6;
  border-radius: 100%;
  width: 14px;
  height: 14px;
  background-color: #fff;
  position: relative;
  cursor: pointer;
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-radio__inner.el-radio__input.is-checked .el-radio__inner:after {
  -webkit-transform: translate(-50%, -50%) scale(1);
  transform: translate(-50%, -50%) scale(1);
}
.el-radio__inner:after {
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: #fff;
  content: '';
  position: absolute;
  left: 30%;
  top: 30%;
  transition: transform 0.15s ease-in, -webkit-transform 0.15s ease-in;
}
.el-radio__original {
  opacity: 0;
  outline: none;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
}
.el-radio__label {
  font-size: 14px;
  padding-left: 10px;
}
</style>