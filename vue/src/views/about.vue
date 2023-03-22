<template>
  <div class="about">
    <div class="about_content about_top">
      <p>
        {{ aboutword }}
      </p>
    </div>
    <div class="about_content about_bottom">
      <div class="about_title">
        <i>有什么意见分享可以加我QQ： <b>1369206217</b> </i>
      </div>
      <div class="about_title"><i>或通过邮箱联系我</i></div>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item prop="username" label="姓名/昵称" :rules="rules.empty">
          <el-input v-model="dynamicValidateForm.username"></el-input
        ></el-form-item>
        <el-form-item prop="email" label="你的邮箱" :rules="rules.email">
          <el-input v-model.trim="dynamicValidateForm.email"></el-input>
        </el-form-item>
        <el-form-item prop="theme" label="邮箱主题" :rules="rules.empty">
          <el-input v-model="dynamicValidateForm.theme"></el-input
        ></el-form-item>
        <el-form-item prop="emailInfo" label="留言内容" :rules="rules.empty">
          <el-input
            type="textarea"
            v-model="dynamicValidateForm.emailInfo"
            height="500px"
          ></el-input
        ></el-form-item>
        <el-form-item>
          <button
            type="button"
            class="my_button submit_button"
            @click="submitForm('dynamicValidateForm')"
          >
            发送
          </button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { sendMail } from "@/request/about";
export default {
  data() {
    var validateEmpty = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("不能为空"));
      } else {
        callback();
      }
    };

    return {
      aboutword:
        "好像没啥想写的东西，虽然想写个博客，但是个人并不喜欢写东西分享，就简简单单这样吧。。。",
      dynamicValidateForm: {
        username: "",
        email: "",
        theme: "",
        emailInfo: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        empty: [{ required: true, validator: validateEmpty, trigger: "blur" }],
      },
    };
  },
  methods: {
    // 校验表单并发送邮件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          sendMail(this.dynamicValidateForm).then(async (res) => {
            if (res.data.status) {
              // console.log(res);
              this.$message.success(res.data.msg);
              this.dynamicValidateForm.theme = "";
              this.dynamicValidateForm.emailInfo = "";
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 450px) {
}
.about {
  // padding: 5px 5px;
  width: 100%;
  // height: 85vh;
  border-radius: 20px;
  // overflow-x: hidden;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  .about_content {
    padding: 10px 10px;
    margin: 20px auto;
    width: 90%;
    border-radius: 10px;
    transition: 0.3s;
    box-shadow: 0 0 5px 1px #eee;
    background-color: rgba(255, 255, 255, 0.5);
    &:hover {
      // cursor: pointer;
      box-shadow: 0 0 10px 1px #ffffff;
    }
    .about_title {
      // margin-bottom: 20px;
      padding-left: 30px;
      font-size: 15px;
      height: 35px;
      line-height: 35px;
      // background-color: #909399c2;
    }
  }
  .about_top {
    position: relative;
    .about_top_wrap {
      width: 100%;
      // height: 30vh;
      // overflow: hidden;
      // .about_image {
      // border-radius: 15px;
      // max-width: 100%;
      // max-height: 100%;
      // }
    }
  }

  .about_bottom {
    .submit_button {
      width: 100px;
      height: 35px;
      background-color: rgb(105, 219, 223);
      &:hover {
        background-color: rgb(117, 241, 245);
      }
    }
  }
}
</style>
<style lang="less" scoped>
/deep/ .el-input {
  .el-input__inner {
    font-family: "仓耳渔阳体 W03";
    background-color: #ffffff5e;
  }
}
/deep/.el-textarea {
  .el-textarea__inner {
    font-family: "仓耳渔阳体 W03";
    background-color: #ffffff5e;
  }
}

.el-form-item:last-child {
  margin-bottom: 0;
}
</style>