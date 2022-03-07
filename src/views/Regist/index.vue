<template>
  <div class="header">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phoneNumber"
        required
        name="手机号"
        label="手机号"
        type="number"
        placeholder="再次输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />

      <van-field
        v-model="password"
        required
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="rePassword"
        required
        type="password"
        name="密码"
        label="密码"
        placeholder="再次输入密码"
        :rules="[{ required: true, message: '请再次填写密码' }]"
      />

      <van-field v-model="age" name="年龄" label="年龄" type="number" />

      <van-radio-group v-model="sex" direction="horizontal"> 
        <van-radio name="0" checked-color="#00ff00">男</van-radio>
        <van-radio name="1" checked-color="#00ff00">女</van-radio>
      </van-radio-group>

      <van-field
        v-model="nikeName"
        name="昵称"
        label="昵称"
        placeholder="小明同学"
      />

      <van-field
        v-model="email"
        required
        name="邮箱"
        label="邮箱"
        placeholder="请输入邮箱地址"
        :rules="[{ required: true, message: '请输入邮箱地址' }]"
      />

      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          submit-on-enter="true"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { request } from "../../utils/http/request.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      rePassword: "",
      phoneNumber: "",
      age: "",
      sex: "0",
      nikeName: "",
      email: "",
    };
  },
  methods: {
    onSubmit(values) {
      if (this.rePassword != this.password) {
        this.$toast("两次密码不一致");
        return;
      }
      if (this.phoneNumber.length != 11) {
        this.$toast("手机号码有误");
        return;
      }
      if (this.email.indexOf("@") == -1) {
        this.$toast("邮箱有误!");
        return;
      }
      let data = {
        username: this.username,
        password: this.password,
        sex: this.sex,
        phoneNumber: this.phoneNumber,
        age: this.age,
        nikeName: this.nikeName,
        email: this.email,
      };
      request(data, "/save").then((res) => {
        if (res.code === 200) {
          this.$dialog
            .alert({
              title: "注册结果",
              message: res.message,
            })
            .then(() => {
              this.$router.push("/login");
            });
        } else {
          this.$dialog.alert({
            title: "注册结果",
            message: res.message,
          });
        }
      });
    },
  },
};
</script>

<style lang="less">
.header {
  margin-top: calc(100vh * 10 / 100);
}
.van-radio__label {
  font-size: 14px;
  color: #646566;
}
.van-radio-group {
  align-items: center;
  justify-content: center;
  justify-content: space-evenly;
  height: 1.2rem;
}
.van-radio {
  margin-top: 10px;
  height: 24px;
}
</style>