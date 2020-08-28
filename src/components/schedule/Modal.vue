<template>
  <div>
    <div
      data-modal="modal"
      class="el-dialog__wrapper create-lesson-modal"
      style="z-index: 2024;"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="dialog"
        class="el-dialog"
        style="margin-top: 15vh;"
      >
        <div class="el-dialog__header">
          <div class="create-lesson-modal__title">
            <h3>일정등록</h3>
          </div>
          <button type="button" aria-label="Close" class="el-dialog__headerbtn">
            <i class="el-dialog__close el-icon el-icon-close"></i>
          </button>
        </div>
        <div class="el-dialog__body">
          <div class="create-lesson-modal__body">
            <a class=""
              ><div>
                <h5>프라이빗 수업</h5>
                <p>개인/듀엣/트리플 레슨 (예약 필수)</p>
              </div></a
            ><a class=""
              ><div>
                <h5>그룹 수업</h5>
                <p>
                  고정된 스케쥴의 오픈형 수업 과정 (자유 수강형/예약 필수)
                </p>
              </div></a
            >
          </div>
          <div class="create-lesson-modal__footer">
            <p>
              수업/클래스란?<br />
              수업은 말 그대로 하루 한 회차의 수업을 의미하며, 그런 수업들이
              모여<br />
              이루어진 프로그램을 일컬어 클래스라 칭합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="v-modal" @click="$emit('close')"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Schedule extends Vue {
  created() {
    document.addEventListener('click', (e) => {
      e.stopPropagation();
      // @ts-ignore
      if (e.target.dataset.hasOwnProperty('modal')) {
        this.$emit('close');
      }
    });
  }
}
</script>
