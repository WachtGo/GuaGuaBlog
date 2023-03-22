<template>
  <div class="login">
    <div class="iconImageWrap" @click="clickLoginIcon">
      <img class="iconImage" src="@/assets/icon/login3.png" alt=" " />
    </div>
    <div class="loginWrap" v-if="loginShow">
      <el-form
        v-if="registerShow"
        :model="registerForm"
        status-icon
        :rules="rules"
        ref="registerForm"
        label-width="70px"
        size="small"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input type="text" v-model.trim="registerForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model.trim="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="registerForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="我的名言">
          <el-input
            type="textarea"
            v-model.trim="registerForm.signature"
          ></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="userCaptcha">
          <el-input
            type="text"
            v-model.trim="registerForm.userCaptcha"
            class="usercaptcha_input"
          ></el-input>
          <div class="captchaImg" @click="getCaptcha">
            <div ref="captcha2"></div>
          </div>
        </el-form-item>
        <el-form-item>
          <button
            type="button"
            class="my_button loginButton"
            @click="submitRegForm('registerForm')"
          >
            注册
          </button>
          <span
            class="regist_tip"
            @click="
              registerShow = !registerShow;
              getCaptcha();
            "
            >继续登录</span
          >
        </el-form-item>
      </el-form>
      <el-form
        v-else
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        size="small"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item label="验证码" prop="userCaptcha">
          <el-input
            type="text"
            v-model.trim="ruleForm.userCaptcha"
            class="usercaptcha_input"
          ></el-input>
          <div class="captchaImg" @click="getCaptcha">
            <div ref="captcha"></div>
          </div>
        </el-form-item>

        <el-form-item>
          <button
            type="button"
            class="my_button loginButton"
            @click="loginForm('ruleForm')"
          >
            登录
          </button>
          <span
            class="regist_tip"
            @click="
              registerShow = !registerShow;
              getCaptcha();
            "
            >注册一个</span
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="loginWrap2" v-if="loginedShow">
      <div class="loginedtab" @click="modifyData">修改资料</div>
      <div
        class="loginedtab"
        @click="
          loginedShow = !loginedShow;
          loginShow = !loginShow;
        "
      >
        切换账号
      </div>
      <div class="loginedtab" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
import { getroot, login, register, getCaptcha } from "@/request/user";
import { strTolow } from "@/utils/tools";
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (value.length < 2 || value.length > 16) {
        callback(new Error("长度在2~16之间"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (value.length < 6 || value.length > 16) {
        callback(new Error("长度在6~16之间"));
      } else {
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCaptcha = (rule, value, callback) => {
      if (value === "" && this.captchafalseCount <= 30) {
        callback(new Error("请输入验证码"));
      } else if (value !== this.text) {
        this.captchafalseCount++;
        switch (this.captchafalseCount) {
          case 2:
            callback(new Error("两个都能错？"));
            break;
          case 3:
            callback(new Error("两个都能错？"));
            break;
          default:
            callback(new Error("要不看看眼科？"));
        }
      } else {
        callback();
      }
    };
    return {
      loginShow: false,
      loginedShow: false,
      registerShow: false,
      ruleForm: {
        username: "",
        password: "",
        userCaptcha: "",
      },
      registerForm: {
        // headphoto: "",
        // avatarname: "",
        nickname: "",
        username: "",
        password: "",
        signature: "",
        userCaptcha: "",
        checkPass: "",
      },
      rules: {
        nickname: [
          { required: true, message: "随便写一个也行", trigger: "blur" },
        ],
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }],
        userCaptcha: [{ validator: validateCaptcha, trigger: "blur" }],
      },
      captcha: "", //svg图片验证码
      captchafalseCount: 0, //娱乐一下，计算验证码输错次数
      submitTimer: null,
      userCaptcha: "", //用户填的验证码
      text: "", //验证码正确内容
    };
  },
  watch: {
    loginShow: {
      //登录页面打开时获取验证码
      handler() {
        if (this.loginShow) this.getCaptcha();
      },
    },
  },
  created() {
    //退出登录时会刷新，然后这里检测登录状态，若未登录则获取root账户
    if (!this.$store.state.token) this.getroot();
  },
  methods: {
    //点击登录按钮验证是否登陆状态展示对应选项
    clickLoginIcon() {
      this.$store.state.token
        ? ((this.loginShow = false), (this.loginedShow = !this.loginedShow))
        : (this.loginShow = !this.loginShow);
    },
    //获取root信息，未登录时展示数据
    getroot() {
      // console.log(22);
      getroot()
        .then(async (res) => {
          res.data.status
            ? await this.$store.commit("setUSERINFO", res.data.data)
            : this.$message.error("获取root信息失败");
          // console.log("getroot", res.data.data);
        })
        .catch((err) => {
          // console.log("获取root信息失败");
        });
    },
    //获取验证码
    getCaptcha() {
      getCaptcha().then((res) => {
        // console.log(res);
        this.$refs.captcha
          ? (this.$refs.captcha.innerHTML = res.data.data.data)
          : (this.text = strTolow(res.data.data.text));
        this.$refs.captcha2
          ? (this.$refs.captcha2.innerHTML = res.data.data.data)
          : (this.text = strTolow(res.data.data.text));
      });
    },
    //提交登录表单
    loginForm(formName) {
      if (this.submitTimer) return;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login(this.ruleForm)
            .then(async (res) => {
              //   console.log("login--------", res);
              this.submitTimer = setTimeout(() => {
                this.submitTimer = null;
              }, 2000);
              // console.log("登录--", res);
              if (res.data.status) {
                this.$store.commit("setUSERINFO", res.data.data); //设置vuex中的userInfo
                this.$store.commit("setTOKEN", res.data.token); //设置token
                this.loginShow = false;
                this.$message.success(res.data.msg);
                location.reload(); //刷新页面，重新获取数据
                // await console.log("登录成功返回---", res);
              } else {
                this.$message.warning(res.data.msg);
              }
            })
            .catch((error) => {});
        } else {
          //   this.$message.error("error submit!");
          return false;
        }
      });
    },

    //注册
    submitRegForm(formName) {
      // console.log(1);
      if (this.submitTimer) return;
      // console.log(2);
      this.$refs[formName].validate((valid) => {
        // console.log(3);
        if (valid) {
          register(this.registerForm)
            .then((res) => {
              //   console.log("login--------", res);

              this.submitTimer = setTimeout(() => {
                this.submitTimer = null;
              }, 2000);
              if (res.data.status) {
                this.registerShow = !this.registerShow;
                this.registerForm = {};
                this.$message.success(res.data.msg);
                this.$nextTick(() => {
                  this.getCaptcha();
                  (this.ruleForm = {
                    //防止注册成功后原先填的账号密码还在
                    username: "",
                    password: "",
                    userCaptcha: "",
                  }),
                    (this.ruleForm.username = res.data.username); //将注册后返回的账号填上
                });
              } else {
                this.$message.warning(res.data.msg);
              }
            })
            .catch((error) => {});
        } else {
          return false;
        }
      });
    },
    modifyData() {
      this.$router.currentRoute.name !== "modify"
        ? this.$router.push("/modify")
        : this.$message.warning("已在当前页面");

      this.loginedShow = false;
    },
    //退出登录
    async loginOut() {
      await this.$store.commit("removeTOKEN");
      this.$message.success("成功退出登录");
      this.loginedShow = false;
      // this.$router.push("/");
      this.getroot();

      // this.$nextTick(() => {
      //   location.reload(); //刷新页面
      // });
    },
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 450px) {
}
@media (min-width: 450px) {
}
.login {
  z-index: 99;
  position: relative;

  .iconImageWrap {
    width: 50px;
    font-size: 30px;
    height: 5vh;
    transition: 0.3s;
    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.3);
      //   color: #cc9966;
    }
  }

  .loginWrap,
  .loginWrap2 {
    z-index: 99;
    position: absolute;
    padding: 10px 10px 5px;
    width: 300px;
    // height: 150px;
    top: 55px;
    right: 5px;
    // background-color: antiquewhite;

    .el-form-item:last-child {
      // margin-bottom: 5px;
    }

    // position: relative;
    // // max-height: 50px;
    // overflow: hidden;
    // white-space: nowrap;
    .usercaptcha_input {
      // vertical-align: top;
      width: 50%;
      margin-right: 50%;
    }
    .captchaImg {
      position: absolute;
      display: inline-block;
      width: 70px;
      height: 32px;
      bottom: 0;
      right: 8px;
      // margin-left: 50px;
      border-radius: 5px;
      overflow: hidden;
      //   vertical-align: bottom;
      background-color: #ffffff;
      &:hover {
        cursor: pointer;
      }
    }

    .loginButton {
      width: 100px;
      height: 35px;
      background-color: rgb(105, 219, 223);
      &:hover {
        background-color: rgb(117, 241, 245);
      }
    }
  }
  .loginWrap {
  }
  .loginWrap2 {
    padding: 5px 0;
    width: 150px;
    .loginedtab {
      //   width: 100px;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      transition: 0.3s;
      //   background-color: #eee;

      &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.658);
      }
    }
  }
}
</style>
<style lang="less" >
.el-form {
  // position: relative;
  font-family: "仓耳渔阳体 W03";
  .regist_tip {
    position: absolute;
    right: 5px;
    bottom: 0;
    font-size: 12px;
    transition: 0.3s;
    color: #7c7c7c;
    &:hover {
      cursor: pointer;
      color: #000;
    }
  }
}

el-button,
el-button--primary,
el-button--small {
  span {
    font-family: "仓耳渔阳体 W03";
  }
}
</style>