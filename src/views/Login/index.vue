<template>
  <div>
    <div v-if="isPc">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>

      <van-form @submit="onSubmit">
        <van-field
          v-model="phoneNumber"
          required
          name="手机号"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
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
        <div class="submit">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            submit-on-enter="true"
            >登陆</van-button
          >
        </div>
      </van-form>

      <div class="forget">
        <router-link to="/forget">
          <span class="text">忘记密码</span>
        </router-link>
        <router-link to="/regist">
          <span class="text" style="margin-left: 20px">立即注册</span>
        </router-link>
      </div>
      <div class="bottom">
        备案号（豫ICP备2020025681号）<a href="https://beian.miit.gov.cn"
          >工信部官网首页</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../utils/http/request.js";
export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
      images: [],
      isPc: false,
    };
  },

  created: async function () {
    let res = await request(null, "/getLoginMedia");
    var result = res.data;
    result.forEach((element) => {
      this.images.push(element.url);
    });

    var system = {};
    var p = navigator.platform;
    var u = navigator.userAgent;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    if (system.win || system.mac) {
      if (u.indexOf("Win") || u.indexOf("Mac")) {
        if (u.includes("Android") || u.includes("iPhone")) {
          this.isPc = true;
        } else {
          document.write(
            "<center><h1>PC端不能打开，请切换到移动端或者电脑端切换为移动端模式并刷新</h1></center>"
          );
        }
      }
    } else {
      this.isPc = true;
    }
  },
  methods: {
    onSubmit(values) {
      let data = {
        phoneNumber: this.phoneNumber,
        password: this.password,
      };
      request(data, "/login").then((res) => {
        if (res.code != 200) {
          this.$dialog
            .alert({
              title: "登陆结果",
              message: res.message,
            })
            .then(() => {
              this.password = "";
            });
        } else {
          localStorage.token = res.data;
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.van-swipe {
  height: 40vh;
  max-width: 120vw;
}
img {
  max-width: 100vw !important;
  height: 40vh;
}
.van-form {
  margin-top: 20px;
}
.submit {
  margin-top: 80px;
  height: calc(100vh * 20 / 100);
  border-radius: 2000px !important;
}

.van-button--block {
  width: 20%;
  height: calc(100vw * 20 / 100);
  margin: 0 auto;
  border-radius: 2000px !important;
}
.forget {
  height: 40px;
  text-align: center;
}
.text {
  color: #646566;
  text-align: center;
  font-size: 14px;
}
.bottom {
  text-align: center;
  bottom: 0px;
}
</style>