<template>
  <div class="row">
    <div class="col-2"></div>
    <div class="col-8">
      <div class="q-mb-md"></div>
      <q-stepper
        v-model="step"
        ref="stepper"
        active-color="black"
        done-color="black"
        class="no-shadow"
        animated
      >
        <q-step :name="1" title="기본 정보 기입" icon="assignment" :done="step > 1">
          <!-- 이름 -->
          <div class="text-weight-bold">이름</div>
          <q-input
            v-model="name"
            dense
            placeholder="이름을 입력해 주세요."
            :color="primaryColor"
            style="width: 300px"
            class="q-mb-xl"
            @input="handleNameChange"
          >
            <template v-slot:append>
              <q-icon v-if="!nameVerified" name="warning">
                <q-tooltip>Please format your name.</q-tooltip>
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
              style="width: 300px"
              class="q-mr-sm"
              @input="handleUsernameChange"
            >
              <template v-slot:append>
                <q-icon v-if="!usernameVerifyVisible" name="warning">
                  <q-tooltip>Username must be 8 to 20 length.</q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-btn
              v-if="usernameVerifyVisible"
              color="black"
              rounded
              @click="handleUsernameVerifyClick"
            >Verify</q-btn>
          </div>

          <!-- 이메일 -->
          <div class="text-weight-bold">이메일</div>
          <div class="q-mb-xl row">
            <q-input
              v-model="email"
              type="email"
              dense
              placeholder="이메일을 입력해 주세요."
              :color="primaryColor"
              style="width: 300px"
              class="q-mr-sm"
              @input="handleEmailChange"
            >
              <template v-slot:append>
                <q-icon v-if="!emailDuppVerificationVisible" name="warning">
                  <q-tooltip>Please format your email.</q-tooltip>
                </q-icon>
              </template>
            </q-input>
            <q-btn
              v-if="emailDuppVerificationVisible"
              class="q-mr-sm"
              color="black"
              rounded
              @click="handleEmailDuppVerifyClick"
            >Verify</q-btn>
          </div>

          <!-- 인증번호 -->
          <div class="text-weight-bold">인증번호</div>
          <div class="q-mb-xl row">
            <q-input
              v-model="emailVerificationCode"
              type="email"
              :disable="!emailDuppVerified"
              dense
              placeholder="이메일 인증번호를 입력해 주세요."
              :color="primaryColor"
              style="width: 300px"
              class="q-mr-sm"
            />
            <q-btn
              v-if="emailDuppVerified"
              class="q-mr-sm"
              color="black"
              rounded
              @click="handleEmailSendCodeClick"
            >Send Code</q-btn>
            <q-btn
              v-if="emailDuppVerified"
              color="black"
              rounded
              @click="handleEmailVerificationCodeClick"
            >Verify</q-btn>
          </div>

          <!-- 휴대폰 번호 -->
          <div class="text-weight-bold">휴대폰 번호</div>
          <q-input
            v-model="phoneNumber"
            dense
            placeholder="휴대폰 번호를 입력해 주세요."
            :color="primaryColor"
            mask="###-####-####"
            style="width: 300px"
            class="q-mb-xl"
            @input="handlePhoneNumberChange"
          >
            <template v-slot:append>
              <q-icon v-if="!phoneNumberVerified" name="warning">
                <q-tooltip>Please format your phone number.</q-tooltip>
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
            style="width: 120px; height: 50px"
          >
            <template v-slot:prepend>
              <q-icon name="event" style="cursor: pointer">
                <q-menu>
                  <q-list dense>
                    <q-item style="padding: 0 0px">
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
            style="width: 120px; height: 50px"
          >
            <template v-slot:prepend>
              <q-icon name="event" style="cursor: pointer">
                <q-menu>
                  <q-list dense>
                    <q-item style="padding: 0 0px">
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

        <q-step :name="2" title="근무시간 입력" icon="assignment" :done="step > 2">
          <div class="text-h5 text-weight-bold q-mb-lg">근무시</div>

          <div class="text-weight-bold q-mb-md q-mt-md">월요일</div>
          <div class="row items-center">
            <q-input
              v-model="monWorkingStartTime"
              dense
              :disable="isMonDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="monWorkingEndTime"
              dense
              :disable="isMonDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isMonDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">화요</div>
          <div class="row items-center">
            <q-input
              v-model="tueWorkingStartTime"
              dense
              :disable="isTueDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="tueWorkingEndTime"
              dense
              :disable="isTueDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isTueDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">수요</div>
          <div class="row items-center">
            <q-input
              v-model="wedWorkingStartTime"
              dense
              :disable="isWedDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="wedWorkingEndTime"
              dense
              :disable="isWedDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isWedDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">목요</div>
          <div class="row items-center">
            <q-input
              v-model="thuWorkingStartTime"
              dense
              :disable="isThuDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="thuWorkingEndTime"
              dense
              :disable="isThuDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isThuDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">금요</div>
          <div class="row items-center">
            <q-input
              v-model="friWorkingStartTime"
              dense
              :disable="isFriDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="friWorkingEndTime"
              dense
              :disable="isFriDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isFriDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">토요</div>
          <div class="row items-center">
            <q-input
              v-model="satWorkingStartTime"
              dense
              :disable="isSatDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="satWorkingEndTime"
              dense
              :disable="isSatDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isSatDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>

          <div class="text-weight-bold q-mb-md q-mt-md">일요일</div>
          <div class="row items-center">
            <q-input
              v-model="sunWorkingStartTime"
              dense
              :disable="isSunDayOff"
              class="q-mr-md"
              style="width: 100px"
            />~
            <q-input
              v-model="sunWorkingEndTime"
              dense
              :disable="isSunDayOff"
              class="q-ml-md"
              style="width: 100px"
            />
            <q-checkbox v-model="isSunDayOff" :color="primaryColor" dense class="q-ml-md q-mr-sm" />off
          </div>
        </q-step>

        <q-step
          :name="3"
          title="등록"
          icon="assignment"
          :done="step > 3"
        >We will register based on the information you have entered so far.</q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="handleSubmit($refs.stepper);"
              :color="primaryColor"
              :label="step === 3 ? 'Finish' : 'Continue'"
            />
            <q-btn
              v-if="step > 1"
              flat
              :color="primaryColor"
              @click="$refs.stepper.previous()"
              label="Back"
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
import { parseDate, yogurtAlert } from '@/util';
import { ApiResponse } from '@/types';
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
      emailDuppVerificationVisible: false,
      emailDuppVerified: false,
      emailVerified: false,
      emailVerificationCode: '',
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

  async handleUsernameVerifyClick() {
    const res: ApiResponse = await this.$store.dispatch(
      `${authNamespace}/handleUsernameVerify`,
      { username: this.$data.username },
    );

    if (!res.success) {
      return;
    }

    this.$data.usernameVerified = true;
    yogurtAlert(res.message);
  }

  handleEmailChange(value: string) {
    this.$data.emailVerified = false;
    this.$data.emailDuppVerified = false;
    this.$data.emailVerificationCode = '';
    if (emailRegex.test(value)) {
      this.$data.emailDuppVerificationVisible = true;
    } else {
      this.$data.emailDuppVerificationVisible = false;
    }
  }

  async handleEmailDuppVerifyClick() {
    const res: ApiResponse = await this.$store.dispatch(
      `${authNamespace}/handleEmailDuppVerify`,
      { email: this.$data.email },
    );

    if (!res.success) {
      this.$data.emailDuppVerified = false;
      return;
    }

    this.$data.emailDuppVerified = true;
    yogurtAlert(res.message);
  }

  async handleEmailSendCodeClick() {
    const res: ApiResponse = await this.$store.dispatch(
      `${authNamespace}/handleEmailVerficiationCodeSend`,
      { email: this.$data.email },
    );

    if (!res.success) {
      return;
    }

    yogurtAlert(res.message);
  }

  async handleEmailVerificationCodeClick() {
    const res: ApiResponse = await this.$store.dispatch(
      `${authNamespace}/handleEmailVerificationCodeCheck`,
      {
        verificationCode: this.$data.emailVerificationCode,
        email: this.$data.email,
      },
    );

    if (!res.success) {
      this.$data.emailVerified = false;
      return;
    }

    this.$data.emailVerified = true;
    yogurtAlert(res.message);
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
      yogurtAlert('Please verify your name.');
      return false;
    }
    if (!this.$data.usernameVerified) {
      yogurtAlert('Please verify your username.');
      return false;
    }
    if (!this.$data.emailVerified) {
      yogurtAlert('Please verify your email.');
      return false;
    }
    if (!this.$data.phoneNumberVerified) {
      yogurtAlert('Please verify your phone number.');
      return false;
    }
    if (!this.$data.gender) {
      yogurtAlert('Please enter your gender.');
      return false;
    }
    if (!this.$data.role) {
      yogurtAlert('Please enter your role.');
      return false;
    }
    if (!this.$data.birth) {
      yogurtAlert('Please enter your birth.');
      return false;
    }
    if (!this.$data.hiredAt) {
      yogurtAlert('Please enter your hiredAt.');
      return false;
    }
    if (!this.$data.introduce) {
      yogurtAlert('Please enter your self-introduce.');
      return false;
    }

    return true;
  }

  handleWorkingTimeValidation(): boolean {
    if (
      !this.$data.isMonDayOff &&
      !(this.$data.monWorkingStartTime && this.$data.monWorkingEndTime)
    ) {
      yogurtAlert('Please enter your monday.');
      return false;
    }
    if (
      !this.$data.isTueDayOff &&
      !(this.$data.tueWorkingStartTime && this.$data.tueWorkingEndTime)
    ) {
      yogurtAlert('Please enter your tuesday.');
      return false;
    }
    if (
      !this.$data.isWedDayOff &&
      !(this.$data.wedWorkingStartTime && this.$data.wedWorkingEndTime)
    ) {
      yogurtAlert('Please enter your wednesday.');
      return false;
    }
    if (
      !this.$data.isThuDayOff &&
      !(this.$data.thuWorkingStartTime && this.$data.thuWorkingEndTime)
    ) {
      yogurtAlert('Please enter your thursday.');
      return false;
    }
    if (
      !this.$data.isFriDayOff &&
      !(this.$data.friWorkingStartTime && this.$data.friWorkingEndTime)
    ) {
      yogurtAlert('Please enter your friday.');
      return false;
    }
    if (
      !this.$data.isSatDayOff &&
      !(this.$data.satWorkingStartTime && this.$data.satWorkingEndTime)
    ) {
      yogurtAlert('Please enter your saturday.');
      return false;
    }
    if (
      !this.$data.isSunDayOff &&
      !(this.$data.sunWorkingStartTime && this.$data.sunWorkingEndTime)
    ) {
      yogurtAlert('Please enter your sunday.');
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
      const res: ApiResponse = await this.$store.dispatch(
        `${namespace}/saveStaff`,
        {
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
        },
      );
      this.$router.push({ path: '/staff' });

      if (!res.success) {
        return;
      }

      yogurtAlert(res.message);
    }
    stepper.next();
  }
}
</script>
