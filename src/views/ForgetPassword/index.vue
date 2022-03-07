<template>
  <div class="header">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phoneNumber"
        label="手机号码"
        type="number"
        name="手机号码"
        required
        placeholder="请输入手机号码"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <div class="passCode">
        <van-field
          v-model="passCode"
          label="验证码"
          type="number"
          name="验证码"
          placeholder="请输入验证码"
        />

        <van-button
          :disabled="isBtnDisabled"
          type="info"
          @click="sendCode"
          ref="btn"
        >
          {{ btnContext }}
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: "",
      passCode: "",
      time: 31 * 1000,
      isBtnDisabled: false,
      btnContext: "点击发送",
      timeOutTest: () => {},
    };
  },
  methods: {
    onSubmit(values) {
      // console.log(values);
    },
    //启动定时器
    startTimeOut() {
      this.timeOutTest = setTimeout(() => {
        this.btnContext = this.btnContext - 1;
        if (this.btnContext != 0) {
          this.startTimeOut();
        } else {
          this.btnContext = "重新发送";
          this.isBtnDisabled = false;
        }
      }, 1000);
    },
    sendCode() {
      if (this.phoneNumber == null || this.phoneNumber == "") {
        this.$dialog.alert({
          message: "手机号不能为空",
        });
      } else if (
        this.phoneNumber.length != 11 ||
        !this.phoneNumber.startsWith("1")
      ) {
        this.$dialog.alert({
          message: "您输入的手机号有误",
        });
      } else {
        this.btnContext = 30;
        this.isBtnDisabled = true;
        this.startTimeOut();
      }
    },
  },
};
</script>

<style lang="less">
.passCode {
  display: flex;
  justify-content: center;
  align-items: center;
}

.van-button--normal {
  font-size: 14px !important;
  width: 3rem;
  margin-right: 20px;
}
.header {
  margin-top: 10%;
}
</style>