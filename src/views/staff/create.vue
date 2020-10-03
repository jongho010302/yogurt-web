<template>
  <div>
    <!-- Header -->
    <div class="create-header">
      <div class="create-header-block">
        <el-breadcrumb
          separator-class="el-icon-arrow-right"
          style="margin-bottom: 12px"
        >
          <el-breadcrumb-item :to="{ path: '/staff' }">강사</el-breadcrumb-item>
          <el-breadcrumb-item>강사등록</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="create-header-block__title">
          <h3>강사등록</h3>
        </div>
      </div>
    </div>

    <!-- Middle -->
    <div class="create-form">
      <!-- 이름 -->
      <div class="create-form-block">
        <div class="create-form-block__index">01</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">이름</div>
          </div>
          <div class="create-form-block__input">
            <el-input
              v-model="name"
              @input="onNameChange"
              class="el-custom-input"
              style="width: 300px"
            >
              <span slot="suffix">
                <i
                  v-if="nameVerified"
                  class="el-icon-check"
                  style="font-size: 20px"
                />
                <el-tooltip v-else content="이름의 형식을 맞춰주세요.">
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
              </span>
            </el-input>
          </div>
        </div>
      </div>

      <!-- 아이디 -->
      <div class="create-form-block">
        <div class="create-form-block__index">02</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">아이디</div>
          </div>
          <div class="create-form-block__input">
            <el-input
              v-model="username"
              @input="onUsernameChange"
              class="el-custom-input"
              style="width: 300px"
            >
              <span slot="suffix">
                <i
                  v-if="usernameVerified"
                  class="el-icon-check"
                  style="font-size: 20px"
                />
                <el-tooltip
                  v-if="!usernameVerified && !usernameVerifyVisible"
                  content="아이디는 8자에서 10자이어야 합니다."
                >
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
                <el-tooltip
                  v-if="!usernameVerified && usernameVerifyVisible"
                  content="아이디 중복검사를 해주세요."
                >
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
              </span>
            </el-input>
            <el-button
              v-if="usernameVerifyVisible && !usernameVerified"
              size="small"
              style="margin-left: 5px"
              @click="verifyUsername"
              >중복검사</el-button
            >
          </div>
        </div>
      </div>

      <!-- 이메일 -->
      <div class="create-form-block">
        <div class="create-form-block__index">03</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">이메일</div>
          </div>
          <div class="create-form-block__input">
            <el-input
              v-model="email"
              type="email"
              @input="onEmailChange"
              class="el-custom-input"
              style="width: 300px"
            >
              <span slot="suffix">
                <i
                  v-if="isEmailVerificationCodeSend"
                  class="el-icon-check"
                  style="font-size: 20px"
                />
                <el-tooltip
                  v-if="!emailSendVerificationCodeVisible"
                  content="이메일의 형식을 맞춰주세요."
                >
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
                <el-tooltip
                  v-if="
                    emailSendVerificationCodeVisible &&
                    !isEmailVerificationCodeSend
                  "
                  content="인증번호를 발송해 주세요."
                >
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
              </span>
            </el-input>
            <el-button
              v-if="emailSendVerificationCodeVisible"
              size="small"
              style="margin-left: 5px"
              @click="sendVerificationCode"
              >{{
                !isEmailVerificationCodeSend ? '인증번호 보내기' : '다시보내기'
              }}</el-button
            >
          </div>
        </div>
      </div>

      <!-- 인증번호 -->
      <div class="create-form-block">
        <div class="create-form-block__index">04</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">인증번호</div>
          </div>
          <div class="create-form-block__input">
            <el-input
              v-model="emailVerificationCode"
              :disabled="!isEmailVerificationCodeSend"
              class="el-custom-input"
              style="width: 300px"
            >
              <span slot="suffix">
                <i
                  v-if="emailVerified"
                  class="el-icon-check"
                  style="font-size: 20px"
                />
                <el-tooltip
                  v-if="!emailVerified && isEmailVerificationCodeSend"
                  content="인증해 주세요."
                >
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
              </span>
            </el-input>
            <el-button
              v-if="isEmailVerificationCodeSend"
              size="small"
              style="margin-left: 5px"
              @click="verificationCode"
              >인증</el-button
            >
          </div>
        </div>
      </div>

      <!-- 휴대폰 번호  -->
      <div class="create-form-block">
        <div class="create-form-block__index">05</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">휴대폰 번호</div>
          </div>
          <div class="create-form-block__input">
            <el-input
              v-model="phoneNumber"
              @input="onPhoneNumberChange"
              mask="###-####-####"
              class="el-custom-input"
              style="width: 300px"
            >
              <span slot="suffix">
                <i
                  v-if="phoneNumberVerified"
                  class="el-icon-check"
                  style="font-size: 20px"
                />
                <el-tooltip
                  v-else
                  content="올바른 휴대폰 번호를 입력해 주세요."
                >
                  <i class="el-icon-warning-outline" style="font-size: 20px" />
                </el-tooltip>
              </span>
            </el-input>
          </div>
        </div>
      </div>

      <!-- 성별  -->
      <div class="create-form-block">
        <div class="create-form-block__index">06</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">성별</div>
          </div>
          <div class="create-form-block__input">
            <el-radio v-model="gender" label="M">남자</el-radio>
            <el-radio v-model="gender" label="F">여자</el-radio>
          </div>
        </div>
      </div>

      <!-- 직무 -->
      <div class="create-form-block">
        <div class="create-form-block__index">07</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">직무</div>
          </div>
          <div class="create-form-block__input">
            <el-radio v-model="role" label="ROLE_INSTRUCTOR">강사</el-radio>
            <el-radio v-model="role" label="ROLE_MANAGER">매니저</el-radio>
            <el-radio v-model="role" label="ROLE_OWNER">오너</el-radio>
          </div>
        </div>
      </div>

      <!-- 생일 -->
      <div class="create-form-block">
        <div class="create-form-block__index">08</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">생일</div>
          </div>
          <div class="create-form-block__input">
            <el-date-picker
              v-model="birth"
              type="date"
              :clearable="false"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 140px"
            ></el-date-picker>
          </div>
        </div>
      </div>

      <!-- 고용 날짜 -->
      <div class="create-form-block">
        <div class="create-form-block__index">09</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">고용 날짜</div>
          </div>
          <div class="create-form-block__input">
            <el-date-picker
              v-model="hiredAt"
              type="date"
              :clearable="false"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 140px"
            ></el-date-picker>
          </div>
        </div>
      </div>

      <!-- 자기소개 -->
      <div class="create-form-block">
        <div class="create-form-block__index">10</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">자기소개</div>
          </div>
          <div class="create-form-block__input">
            <el-input v-model="introduce" class="el-custom-input"></el-input>
          </div>
        </div>
      </div>

      <!-- 근무시간 -->
      <div class="create-form-block">
        <div class="create-form-block__index">11</div>
        <div class="create-form-block__content">
          <div class="create-form-block__label">
            <div class="create-form-block__label__title">근무시간</div>
          </div>
          <div class="create-form-block__input">
            <div class="create-form-block__working-hour__container">
              <!-- 월요일 -->
              <div class="create-form-block__working-hour">
                <h5>월</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="monWorkingStartTime"
                    :disabled="isMonDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="monWorkingEndTime"
                    :disabled="isMonDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isMonDayOff">휴무일</el-checkbox>
                </div>
              </div>

              <!-- 화요일 -->
              <div class="create-form-block__working-hour">
                <h5>화</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="tueWorkingStartTime"
                    :disabled="isTueDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="tueWorkingEndTime"
                    :disabled="isTueDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isTueDayOff">휴무일</el-checkbox>
                </div>
              </div>

              <!-- 수요일 -->
              <div class="create-form-block__working-hour">
                <h5>수</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="wedWorkingStartTime"
                    :disabled="isWedDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="wedWorkingEndTime"
                    :disabled="isWedDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isWedDayOff">휴무일</el-checkbox>
                </div>
              </div>

              <!-- 목요일 -->
              <div class="create-form-block__working-hour">
                <h5>수</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="thuWorkingStartTime"
                    :disabled="isThuDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="thuWorkingEndTime"
                    :disabled="isThuDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isThuDayOff">휴무일</el-checkbox>
                </div>
              </div>

              <!-- 금요일 -->
              <div class="create-form-block__working-hour">
                <h5>금</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="friWorkingStartTime"
                    :disabled="isFriDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="friWorkingEndTime"
                    :disabled="isFriDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isFriDayOff">휴무일</el-checkbox>
                </div>
              </div>

              <!-- 토요일 -->
              <div class="create-form-block__working-hour">
                <h5>토</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="satWorkingStartTime"
                    :disabled="isSatDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="satWorkingEndTime"
                    :disabled="isSatDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isSatDayOff">휴무일</el-checkbox>
                </div>
              </div>

              <!-- 일요일 -->
              <div class="create-form-block__working-hour">
                <h5>일</h5>
                <div class="create-form-block__working-hour__input">
                  <el-time-select
                    v-model="sunWorkingStartTime"
                    :disabled="isSunDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                  <span>~</span>
                  <el-time-select
                    v-model="sunWorkingEndTime"
                    :disabled="isSunDayOff"
                    align="center"
                    style="width: 120px"
                  ></el-time-select>
                </div>
                <div class="create-form-block__working-hour__check">
                  <el-checkbox v-model="isSunDayOff">휴무일</el-checkbox>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div class="bottom-action-bar">
      <span @click="$router.push('/staff')" style="cursor: pointer">
        <i
          class="el-icon-arrow-left"
          style="font-size: 14px; margin-right: 8px"
        />뒤로가기
      </span>
      <div class="space"></div>
      <el-button @click="onSubmit" style="color: black"
        >강사 등록 완료</el-button
      >
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
import { validateParam } from '@/util/validation';
import '@/css/Create.scss';

const namespace = 'staff';
const userNamespace = 'user';

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
      emailSendVerificationCodeVisible: false,
      isEmailVerificationCodeSend: false,
      emailVerificationCode: '',
      phoneNumber: '',
      phoneNumberVerified: false,
      gender: 'M',
      birth: parseDate(new Date(), 'yyyy-mm-dd'),
      profileUrl:
        'https://seoulforest-image.s3.ap-northeast-2.amazonaws.com/default_profile.png',
      phone: '',
      introduce: '',
      role: 'ROLE_INSTRUCTOR',
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

  get user() {
    return this.$store.getters[`${userNamespace}/getUser`];
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
    this.$data.isEmailVerificationCodeSend = false;
    this.$data.emailVerificationCode = '';
    if (emailRegex.test(value)) {
      this.$data.emailSendVerificationCodeVisible = true;
    } else {
      this.$data.emailSendVerificationCodeVisible = false;
    }
  }

  onPhoneNumberChange(value: string) {
    this.$data.phoneNumber = value
      .replace(/[^0-9]/g, '')
      .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');

    if (phoneNumberRegex.test(this.$data.phoneNumber)) {
      this.$data.phoneNumberVerified = true;
    } else {
      this.$data.phoneNumberVerified = false;
    }
  }

  async verifyUsername() {
    try {
      validateParam(this.$data.username, '아이디를 입력해 주세요.');

      await this.$store.dispatch(`${userNamespace}/verifyUsername`, {
        username: this.$data.username,
      });

      this.$data.usernameVerified = true;
    } catch (err) {
      console.error(err);
    }
  }

  async sendVerificationCode() {
    try {
      validateParam(this.$data.email, '이메일을 입력해 주세요.');

      await this.$store.dispatch(`${userNamespace}/sendSignUpCode`, {
        email: this.$data.email,
      });

      this.$data.isEmailVerificationCodeSend = true;
    } catch (err) {
      console.error(err);
    }
  }

  async verificationCode() {
    try {
      validateParam(this.$data.email, '이메일을 입력해 주세요.');
      validateParam(
        this.$data.emailVerificationCode,
        '인증번호를 입력해 주세요.',
      );

      await this.$store.dispatch(`${userNamespace}/verifySignUpCode`, {
        email: this.$data.email,
        verificationCode: this.$data.emailVerificationCode,
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
    } catch (err) {
      console.error(err);
    }
  }
}
</script>

<style>
.create-form-block__working-hour__container {
  display: grid;
  row-gap: 2rem;
  column-gap: 2rem;
}
.create-form-block__working-hour {
  display: grid;
  grid-template-columns: 40px 300px auto;
  align-items: center;
  padding-left: 20px;
}
.create-form-block__working-hour h5 {
  font-size: 20px;
  font-weight: 700;
}
.create-form-block__working-hour__check {
  display: flex;
  /* justify-content: flex-end; */
}
</style>