<template>
  <div>
    <div class="q-pa-lg q-pl-xl">
      <div class="q-mb-xl text-weight-bold">강사 > 강사등록</div>

      <!-- 이름 -->
      <div class="text-weight-bold">이름</div>
      <q-input
        v-model="name"
        dense
        placeholder="이름을 입력해 주세요."
        color="primary"
        style="width: 300px;"
        class="q-mb-xl row"
        @input="onNameChange"
      >
        <template v-slot:append>
          <q-icon v-if="nameVerified" name="done" color="primary" />
          <q-icon v-else name="warning" color="black">
            <q-tooltip>이름의 형식을 맞춰주세요.</q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <!-- 아이디 -->
      <div class="text-weight-bold">아이디</div>
      <div class="q-mb-xl row">
        <q-input
          v-model="username"
          dense
          placeholder="아이디를 입력해 주세요."
          :color="primaryColor"
          style="width: 300px;"
          class="q-mr-sm"
          @input="onUsernameChange"
        >
          <template v-slot:append>
            <q-icon v-if="usernameVerified" name="done" color="primary" />
            <q-icon
              v-if="!usernameVerified && !usernameVerifyVisible"
              name="warning"
              color="black"
            >
              <q-tooltip>
                아이디는 8자에서 10자이어야 합니다.
              </q-tooltip>
            </q-icon>
            <q-icon
              v-if="!usernameVerified && usernameVerifyVisible"
              name="error"
              color="warning"
            >
              <q-tooltip>
                아이디 중복검사를 해주세요.
              </q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <q-btn
          v-if="usernameVerifyVisible && !usernameVerified"
          color="primary"
          outline
          label="중복검사"
          @click="verifyUsername"
        />
      </div>

      <!-- 이메일 -->
      <div class="text-weight-bold">이메일</div>
      <div class="q-mb-xl row">
        <q-input
          v-model="email"
          type="email"
          dense
          placeholder="이메일을 입력해 주세요."
          color="primary"
          style="width: 300px;"
          class="q-mr-sm"
          @input="onEmailChange"
        >
          <template v-slot:append>
            <q-icon v-if="isEmailVerifyCodeSend" name="done" color="primary" />
            <q-icon
              v-if="!emailSendVerifyCodeVisible"
              name="warning"
              color="black"
            >
              <q-tooltip>이메일 형식을 맞춰 주세요.</q-tooltip>
            </q-icon>
            <q-icon
              v-if="emailSendVerifyCodeVisible && !isEmailVerifyCodeSend"
              name="warning"
              color="black"
            >
              <q-tooltip>인증번호를 발송해 주세요.</q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <q-btn
          v-if="emailSendVerifyCodeVisible"
          class="q-mr-sm"
          color="primary"
          outline
          :label="!isEmailVerifyCodeSend ? '인증번호 보내기' : '다시보내기'"
          @click="sendVerifyCode"
        />
      </div>

      <!-- 인증번호 -->
      <div class="text-weight-bold">인증번호</div>
      <div class="q-mb-xl row">
        <q-input
          v-model="emailVerifyCode"
          type="email"
          :disable="!isEmailVerifyCodeSend"
          dense
          placeholder="이메일 인증번호를 입력해 주세요."
          :color="primaryColor"
          style="width: 300px;"
          class="q-mr-sm"
        >
          <template v-slot:append>
            <q-icon v-if="emailVerified" name="done" color="primary" />
            <q-icon
              v-if="!emailVerified && isEmailVerifyCodeSend"
              name="warning"
              color="black"
            >
              <q-tooltip>인증해 주세요.</q-tooltip>
            </q-icon>
          </template>
        </q-input>
        <q-btn
          v-if="isEmailVerifyCodeSend"
          color="primary"
          outline
          label="인증"
          @click="verifyCode"
        />
      </div>

      <!-- 휴대폰 번호 -->
      <div class="text-weight-bold">휴대폰 번호</div>
      <q-input
        v-model="phoneNumber"
        dense
        placeholder="휴대폰 번호를 입력해 주세요."
        :color="primaryColor"
        mask="###-####-####"
        style="width: 300px;"
        class="q-mb-xl row"
        @input="onPhoneNumberChange"
      >
        <template v-slot:append>
          <q-icon v-if="phoneNumberVerified" name="done" color="primary" />
          <q-icon v-else name="warning" color="black">
            <q-tooltip>올바른 휴대폰 번호를 입력해 주세요.</q-tooltip>
          </q-icon>
        </template>
      </q-input>

      <!-- 성별 -->
      <div class="text-weight-bold">성별</div>
      <q-option-group
        v-model="gender"
        :options="genderOptions"
        :color="primaryColor"
        inline
        class="q-mb-xl row"
      />

      <!-- 역할 -->
      <div class="text-weight-bold">역할</div>
      <q-option-group
        v-model="role"
        :options="roleOptions"
        :color="primaryColor"
        inline
        class="q-mb-xl row"
      />

      <!-- 생일 -->
      <div class="text-weight-bold">생일</div>
      <q-input
        v-model="birth"
        :color="primaryColor"
        mask="####-##-##"
        dense
        class="q-mb-xl row"
        style="width: 120px; height: 50px;"
      >
        <template v-slot:prepend>
          <q-icon name="event" style="cursor: pointer;">
            <q-menu>
              <q-list dense>
                <q-item style="padding: 0 0px;">
                  <q-date v-model="birth" :color="primaryColor" minimal />
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </template>
      </q-input>

      <!-- 고용 날짜 -->
      <div class="text-weight-bold">고용 날짜</div>
      <q-input
        v-model="hiredAt"
        :color="primaryColor"
        mask="####-##-##"
        dense
        class="q-mb-xl row"
        style="width: 120px; height: 50px;"
      >
        <template v-slot:prepend>
          <q-icon name="event" style="cursor: pointer;">
            <q-menu>
              <q-list dense>
                <q-item style="padding: 0 0px;">
                  <q-date v-model="hiredAt" :color="primaryColor" minimal />
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </template>
      </q-input>

      <!-- 자기 소개 -->
      <div class="text-weight-bold">자기 소개</div>
      <q-input
        v-model="introduce"
        dense
        placeholder="자기 소개를 입력해주세요."
        :color="primaryColor"
        class="q-mb-xl row"
        style="width: 80%; height: 50px;"
      />

      <div class="text-h5 text-weight-bold q-mb-lg">근무시간</div>

      <div class="text-weight-bold q-mb-md q-mt-md">월요일</div>
      <div class="row items-center">
        <q-input
          v-model="monWorkingStartTime"
          dense
          :disable="isMonDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="monWorkingEndTime"
          dense
          :disable="isMonDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isMonDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>

      <div class="text-weight-bold q-mb-md q-mt-md">화요일</div>
      <div class="row items-center">
        <q-input
          v-model="tueWorkingStartTime"
          dense
          :disable="isTueDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="tueWorkingEndTime"
          dense
          :disable="isTueDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isTueDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>

      <div class="text-weight-bold q-mb-md q-mt-md">수요일</div>
      <div class="row items-center">
        <q-input
          v-model="wedWorkingStartTime"
          dense
          :disable="isWedDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="wedWorkingEndTime"
          dense
          :disable="isWedDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isWedDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>

      <div class="text-weight-bold q-mb-md q-mt-md">목요일</div>
      <div class="row items-center">
        <q-input
          v-model="thuWorkingStartTime"
          dense
          :disable="isThuDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="thuWorkingEndTime"
          dense
          :disable="isThuDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isThuDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>

      <div class="text-weight-bold q-mb-md q-mt-md">금요일</div>
      <div class="row items-center">
        <q-input
          v-model="friWorkingStartTime"
          dense
          :disable="isFriDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="friWorkingEndTime"
          dense
          :disable="isFriDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isFriDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>

      <div class="text-weight-bold q-mb-md q-mt-md">토요일</div>
      <div class="row items-center">
        <q-input
          v-model="satWorkingStartTime"
          dense
          :disable="isSatDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="satWorkingEndTime"
          dense
          :disable="isSatDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isSatDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>

      <div class="text-weight-bold q-mb-md q-mt-md">일요일</div>
      <div class="row items-center" style="margin-bottom: 100px;">
        <q-input
          v-model="sunWorkingStartTime"
          dense
          :disable="isSunDayOff"
          class="q-mr-md"
          style="width: 100px;"
        />~
        <q-input
          v-model="sunWorkingEndTime"
          dense
          :disable="isSunDayOff"
          class="q-ml-md"
          style="width: 100px;"
        />
        <q-checkbox
          v-model="isSunDayOff"
          :color="primaryColor"
          dense
          class="q-ml-md q-mr-sm"
        />off
      </div>
    </div>

    <!-- Footer -->
    <div
      class="q-px-lg"
      style="
        position: fixed;
        bottom: 0px;
        left: 56px;
        right: 0px;
        background-color: #64aeff;
        width: 97%;
        height: 60px;
        z-index: 1;
        display: flex;
        align-items: center;
        color: white;
      "
    >
      <span @click="$router.push('/staff')" style="cursor: pointer;">
        <q-icon name="keyboard_arrow_left" />뒤로가기
      </span>
      <q-space />
      <q-btn
        label="강사 등록 완료"
        color="white"
        text-color="black"
        @click="onSubmit"
      ></q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { parseDate } from '@/util/date';
import {
  usernameRegex,
  nameRegex,
  emailRegex,
  phoneNumberRegex,
} from '@/util/regex';
import { validateParam } from '@/util/common';

const namespace = 'staff';
const authNamespace = 'auth';

@Component
export default class StaffCreate extends Vue {
  data() {
    return {
      name: '',
      nameVerified: false,
      username: '',
      usernameVerified: false,
      usernameVerifyVisible: false,
      email: '',
      emailVerified: false,
      emailSendVerifyCodeVisible: false,
      isEmailVerifyCodeSend: false,
      emailVerifyCode: '',
      phoneNumber: '',
      phoneNumberVerified: false,
      gender: '',
      genderOptions: [
        {
          label: '남자',
          value: 'M',
        },
        {
          label: '여자',
          value: 'F',
        },
      ],
      birth: parseDate(new Date(), 'yyyy-mm-dd'),
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
      phone: '',
      introduce: '',
      role: 'instructor',
      roleOptions: [
        {
          label: '강사',
          value: 'ROLE_INSTRUCTOR',
        },
        {
          label: '매니저',
          value: 'ROLE_MANAGER',
        },
        {
          label: '오너',
          value: 'ROLE_OWNER',
        },
      ],
      showCalendar: false,
      hiredAt: parseDate(new Date(), 'yyyy-mm-dd'),

      isMonDayOff: false,
      monWorkingStartTime: '09:00',
      monWorkingEndTime: '18:00',
      isTueDayOff: false,
      tueWorkingStartTime: '09:00',
      tueWorkingEndTime: '18:00',
      isWedDayOff: false,
      wedWorkingStartTime: '09:00',
      wedWorkingEndTime: '18:00',
      isThuDayOff: false,
      thuWorkingStartTime: '09:00',
      thuWorkingEndTime: '18:00',
      isFriDayOff: false,
      friWorkingStartTime: '09:00',
      friWorkingEndTime: '18:00',
      isSatDayOff: true,
      satWorkingStartTime: '09:00',
      satWorkingEndTime: '18:00',
      isSunDayOff: true,
      sunWorkingStartTime: '09:00',
      sunWorkingEndTime: '18:00',
    };
  }

  get primaryColor() {
    return this.$store.state.primaryColor;
  }

  get user() {
    return this.$store.getters[`${authNamespace}/getUser`];
  }

  onNameChange(value: string) {
    if (nameRegex.test(value)) {
      this.$data.nameVerified = true;
    } else {
      this.$data.nameVerified = false;
    }
  }

  onUsernameChange(value: string) {
    this.$data.usernameVerified = false;
    if (usernameRegex.test(value)) {
      this.$data.usernameVerifyVisible = true;
    } else {
      this.$data.usernameVerifyVisible = false;
    }
  }

  onEmailChange(value: string) {
    this.$data.emailVerified = false;
    this.$data.isEmailVerifyCodeSend = false;
    this.$data.emailVerifyCode = '';
    if (emailRegex.test(value)) {
      this.$data.emailSendVerifyCodeVisible = true;
    } else {
      this.$data.emailSendVerifyCodeVisible = false;
    }
  }

  onPhoneNumberChange(value: string) {
    if (phoneNumberRegex.test(value)) {
      this.$data.phoneNumberVerified = true;
    } else {
      this.$data.phoneNumberVerified = false;
    }
  }

  async verifyUsername() {
    try {
      validateParam(this.$data.username, '아이디를 입력해 주세요.');

      await this.$store.dispatch(`${authNamespace}/verifyUsername`, {
        username: this.$data.username,
      });

      this.$data.usernameVerified = true;
    } catch (err) {}
  }

  async sendVerifyCode() {
    try {
      validateParam(this.$data.email, '이메일을 입력해 주세요.');

      await this.$store.dispatch(`${authNamespace}/sendSignUpCode`, {
        email: this.$data.email,
      });

      this.$data.isEmailVerifyCodeSend = true;
    } catch (err) {}
  }

  async verifyCode() {
    try {
      validateParam(this.$data.email, '이메일을 입력해 주세요.');
      validateParam(this.$data.emailVerifyCode, '인증번호를 입력해 주세요.');

      await this.$store.dispatch(`${authNamespace}/verifySignUpCode`, {
        email: this.$data.email,
        verifyCode: this.$data.emailVerifyCode,
      });

      this.$data.emailVerified = true;
    } catch (err) {
      this.$data.emailVerified = false;
    }
  }

  async onSubmit() {
    try {
      validateParam(this.$data.name, '이름을 입력해 주세요.');
      validateParam(this.$data.nameVerified, '올바른 이름을 입력해 주세요.');
      validateParam(this.$data.username, '아이디를 입력해 주세요.');
      validateParam(
        this.$data.usernameVerified,
        '올바른 아이디를 입력해 주세요.',
      );
      validateParam(this.$data.email, '이메일을 입력해 주세요.');
      validateParam(this.$data.emailVerified, '올바른 이메일릏 입력해 주세요.');
      validateParam(this.$data.phoneNumber, '전화번호를 입력해 주세요.');
      validateParam(
        this.$data.phoneNumberVerified,
        '올바른 전화번호를 입력해 주세요.',
      );
      validateParam(this.$data.gender, '성별을 입력해 주세요.');
      validateParam(this.$data.role, '역할을 입력해 주세요.');
      validateParam(this.$data.birth, '생일을 입력해 주세요.');
      validateParam(this.$data.hiredAt, '고용 날짜를 입력해 주세요.');
      validateParam(this.$data.introduce, '자기소개를 입력해 주세요.');

      if (!this.$data.isMonDayOff) {
        validateParam(
          this.$data.monWorkingStartTime,
          '월요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.monWorkingEndTime,
          '월요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      if (!this.$data.isTueDayOff) {
        validateParam(
          this.$data.tueWorkingStartTime,
          '화요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.tueWorkingEndTime,
          '화요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      if (!this.$data.isWedDayOff) {
        validateParam(
          this.$data.wedWorkingStartTime,
          '수요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.wedWorkingEndTime,
          '수요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      if (!this.$data.isThuDayOff) {
        validateParam(
          this.$data.thuWorkingStartTime,
          '목요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.thuWorkingEndTime,
          '목요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      if (!this.$data.isFriDayOff) {
        validateParam(
          this.$data.friWorkingStartTime,
          '금요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.friWorkingEndTime,
          '금요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      if (!this.$data.isSatDayOff) {
        validateParam(
          this.$data.satWorkingStartTime,
          '토요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.satWorkingEndTime,
          '토요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      if (!this.$data.isSunDayOff) {
        validateParam(
          this.$data.sunWorkingStartTime,
          '일요일 근무 시작 시간을 입력해 주세요.',
        );
        validateParam(
          this.$data.sunWorkingEndTime,
          '일요일 근무 종료 시간을 입력해 주세요.',
        );
      }

      await this.$store.dispatch(`${namespace}/saveStaff`, {
        studioId: this.user.studio.id,
        name: this.$data.name,
        username: this.$data.username,
        email: this.$data.email,
        gender: this.$data.gender,
        phone: this.$data.phoneNumber,
        birth: this.$data.birth,
        introduce: this.$data.introduce,
        profileUrl: this.$data.profileUrl,
        hiredAt: this.$data.hiredAt,
        role: this.$data.role,
        isMonDayOff: this.$data.isMonDayOff,
        monWorkingStartTime: this.$data.monWorkingStartTime,
        monWorkingEndTime: this.$data.monWorkingEndTime,
        isTueDayOff: this.$data.isTueDayOff,
        tueWorkingStartTime: this.$data.tueWorkingStartTime,
        tueWorkingEndTime: this.$data.tueWorkingEndTime,
        isWedDayOff: this.$data.isWedDayOff,
        wedWorkingStartTime: this.$data.wedWorkingStartTime,
        wedWorkingEndTime: this.$data.wedWorkingEndTime,
        isThuDayOff: this.$data.isThuDayOff,
        thuWorkingStartTime: this.$data.thuWorkingStartTime,
        thuWorkingEndTime: this.$data.thuWorkingEndTime,
        isFriDayOff: this.$data.isFriDayOff,
        friWorkingStartTime: this.$data.friWorkingStartTime,
        friWorkingEndTime: this.$data.friWorkingEndTime,
        isSatDayOff: this.$data.isSatDayOff,
        satWorkingStartTime: this.$data.satWorkingStartTime,
        satWorkingEndTime: this.$data.satWorkingEndTime,
        isSunDayOff: this.$data.isSunDayOff,
        sunWorkingStartTime: this.$data.sunWorkingStartTime,
        sunWorkingEndTime: this.$data.sunWorkingEndTime,
      });
      await this.$router.push('/staff');
    } catch (err) {}
  }
}
</script>
