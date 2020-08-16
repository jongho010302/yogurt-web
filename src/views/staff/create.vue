<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="q-mb-md"></div>
      <q-stepper
        v-model="step"
        ref="stepper"
        active-color="primary"
        done-color="primary"
        class="no-shadow"
        animated
      >
        <q-step
          :name="1"
          title="기본 정보 기입"
          icon="assignment"
          :done="step > 1"
        >
          <!-- 이름 -->
          <div class="text-weight-bold">이름</div>
          <q-input
            v-model="name"
            dense
            placeholder="이름을 입력해 주세요."
            :color="primaryColor"
            style="width: 300px;"
            class="q-mb-xl"
            @input="handleNameChange"
          >
            <template v-slot:append>
              <q-icon v-if="nameVerified" name="done" color="black" />
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
              @input="handleUsernameChange"
            >
              <template v-slot:append>
                <q-icon v-if="usernameVerified" name="done" color="black" />
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
                  name="report"
                  color="black"
                >
                  <q-tooltip>
                    아이디 중복검사를 해주세요.
                  </q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-btn
              v-if="usernameVerifyVisible && !usernameVerified"
              color="black"
              rounded
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
                <q-icon
                  v-if="emailSendVerifyCodeVisible"
                  name="done"
                  color="black"
                />
                <q-icon v-else name="warning" color="black">
                  <q-tooltip>이메일 형식을 맞춰 주세요.</q-tooltip>
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
                <q-icon v-if="emailVerified" name="done" color="black" />
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
            class="q-mb-xl"
            @input="handlePhoneNumberChange"
          >
            <template v-slot:append>
              <q-icon v-if="phoneNumberVerified" name="done" color="black" />
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
            class="q-mb-xl"
          />

          <!-- 역할 -->
          <div class="text-weight-bold">역할</div>
          <q-option-group
            v-model="role"
            :options="roleOptions"
            :color="primaryColor"
            inline
            class="q-mb-xl"
          />

          <!-- 생일 -->
          <div class="text-weight-bold">생일</div>
          <q-input
            v-model="birth"
            :color="primaryColor"
            mask="####-##-##"
            dense
            class="q-mb-xl"
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
            class="q-mb-xl"
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
            class="q-mb-xl"
          />
        </q-step>

        <q-step
          :name="2"
          title="근무시간 입력"
          icon="assignment"
          :done="step > 2"
        >
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
          <div class="row items-center">
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
        </q-step>

        <q-step :name="3" title="등록" icon="assignment" :done="step > 3"
          >We will register based on the information you have entered so
          far.</q-step
        >

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="handleSubmit($refs.stepper)"
              :color="primaryColor"
              :label="step === 3 ? '저장' : '진행'"
            />
            <q-btn
              v-if="step > 1"
              flat
              :color="primaryColor"
              @click="$refs.stepper.previous()"
              label="뒤로 가기"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { parseDate } from '@/util/date';
import { warningAlert } from '@/util/ui';
import {
  usernameRegex,
  nameRegex,
  emailRegex,
  phoneNumberRegex,
} from '@/util/regex';

const namespace = 'staff';
const authNamespace = 'auth';

@Component
export default class StaffCreate extends Vue {
  data() {
    return {
      step: 1,
      // Step 1
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

      // Step 2
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

  handleNameChange(value: string) {
    if (nameRegex.test(value)) {
      this.$data.nameVerified = true;
    } else {
      this.$data.nameVerified = false;
    }
  }

  handleUsernameChange(value: string) {
    this.$data.usernameVerified = false;
    if (usernameRegex.test(value)) {
      this.$data.usernameVerifyVisible = true;
    } else {
      this.$data.usernameVerifyVisible = false;
    }
  }

  async verifyUsername() {
    await this.$store.dispatch(`${authNamespace}/verifyUsername`, {
      username: this.$data.username,
    });

    this.$data.usernameVerified = true;
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

  async sendVerifyCode() {
    await this.$store.dispatch(`${authNamespace}/sendSignUpCode`, {
      email: this.$data.email,
    });

    this.$data.isEmailVerifyCodeSend = true;
  }

  async verifyCode() {
    try {
      await this.$store.dispatch(`${authNamespace}/verifySignUpCode`, {
        email: this.$data.email,
        verifyCode: this.$data.emailVerifyCode,
      });

      this.$data.emailVerified = true;
    } catch (err) {
      this.$data.emailVerified = false;
    }
  }

  handlePhoneNumberChange(value: string) {
    if (phoneNumberRegex.test(value)) {
      this.$data.phoneNumberVerified = true;
    } else {
      this.$data.phoneNumberVerified = false;
    }
  }

  handleBasicValidation(): boolean {
    if (!this.$data.nameVerified) {
      warningAlert('name을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.usernameVerified) {
      warningAlert('username을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.emailVerified) {
      warningAlert('email을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.phoneNumberVerified) {
      warningAlert('phone을(를) 입력해 주세요.number.');
      return false;
    }
    if (!this.$data.gender) {
      warningAlert('gender을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.role) {
      warningAlert('role을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.birth) {
      warningAlert('birth을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.hiredAt) {
      warningAlert('hiredAt을(를) 입력해 주세요.');
      return false;
    }
    if (!this.$data.introduce) {
      warningAlert('self을(를) 입력해 주세요.introduce.');
      return false;
    }

    return true;
  }

  handleWorkingTimeValidation(): boolean {
    if (
      !this.$data.isMonDayOff &&
      !(this.$data.monWorkingStartTime && this.$data.monWorkingEndTime)
    ) {
      warningAlert('monday을(를) 입력해 주세요.');
      return false;
    }
    if (
      !this.$data.isTueDayOff &&
      !(this.$data.tueWorkingStartTime && this.$data.tueWorkingEndTime)
    ) {
      warningAlert('tuesday을(를) 입력해 주세요.');
      return false;
    }
    if (
      !this.$data.isWedDayOff &&
      !(this.$data.wedWorkingStartTime && this.$data.wedWorkingEndTime)
    ) {
      warningAlert('wednesday을(를) 입력해 주세요.');
      return false;
    }
    if (
      !this.$data.isThuDayOff &&
      !(this.$data.thuWorkingStartTime && this.$data.thuWorkingEndTime)
    ) {
      warningAlert('thursday을(를) 입력해 주세요.');
      return false;
    }
    if (
      !this.$data.isFriDayOff &&
      !(this.$data.friWorkingStartTime && this.$data.friWorkingEndTime)
    ) {
      warningAlert('friday을(를) 입력해 주세요.');
      return false;
    }
    if (
      !this.$data.isSatDayOff &&
      !(this.$data.satWorkingStartTime && this.$data.satWorkingEndTime)
    ) {
      warningAlert('saturday을(를) 입력해 주세요.');
      return false;
    }
    if (
      !this.$data.isSunDayOff &&
      !(this.$data.sunWorkingStartTime && this.$data.sunWorkingEndTime)
    ) {
      warningAlert('sunday을(를) 입력해 주세요.');
      return false;
    }

    return true;
  }

  async handleSubmit(stepper: any) {
    if (!this.handleBasicValidation()) {
      return;
    }

    if (this.$data.step === 2) {
      if (!this.handleWorkingTimeValidation()) {
        return;
      }
    }

    if (this.$data.step === 3) {
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
    }
    stepper.next();
  }
}
</script>
