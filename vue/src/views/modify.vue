<template>
  <div class="modify">
    <!-- <div class="modify_title"></div> -->
    <div class="modify_box">
      <div class="modify_label">头像</div>
      <div class="modify_box_right">
        <el-upload
          class="avatar-uploader"
          action="http://116.62.23.57/modify/uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img :src="userInfo.avatar" class="avatar" />
        </el-upload>
      </div>
    </div>
    <form action=""></form>
    <div class="modify_box">
      <div class="modify_label">昵称</div>
      <div class="modify_box_right">
        <el-input class="modify_input" v-model="userInfo.nickname"></el-input>
      </div>
    </div>
    <div class="modify_box">
      <div class="modify_label">签名</div>
      <div class="modify_box_right">
        <el-input class="modify_input" v-model="userInfo.signature"></el-input>
      </div>
    </div>
    <div class="modify_box">
      <div class="modify_label">标签</div>
      <div class="modify_box_right">
        <el-input class="modify_input_tag" v-model="tags"></el-input>
      </div>
    </div>
    <div class="modify_box">
      <div class="modify_label">其他</div>
      <div class="modify_box_right">
        <el-input class="modify_input_tag" value="暂时没想到。。。"></el-input>
      </div>
    </div>
    <div class="modify_box">
      <div class="modify_label"></div>
      <div class="modify_box_right">
        <button
          type="button"
          class="my_button submit_button"
          @click="modifyData()"
        >
          确认修改
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { modifyData, updateAvatar } from "../request/modify";
export default {
  data() {
    return {
      userInfo: {
        nickname: "",
        avatar: "",
        signature: "",
        tags: [],
      },
      // tags: "",
    };
  },
  computed: {
    tags: {
      get() {
        return this.userInfo.tags.join(" ");
      },
      set(newValue) {
        this.userInfo.tags = newValue.split(" ");
      },
    },
  },
  created() {
    this.userInfo = this.$store.state.userInfo;
    // this.tags = this.$store.state.userInfo.tags.join(" ");
  },
  methods: {
    //图片上传后
    handleAvatarSuccess(res, file) {
      if (file.response.status) {
        //file.response:上传后前端返回的数据
        // console.log("file.response.data", file.response.data);
        let params = {
          avatar: file.response.data,
        };
        updateAvatar(params)
          .then((res) => {
            res.data.status
              ? this.$message.success(res.data.msg)
              : this.$message.warning(res.data.msg);
            this.$store.commit("setUSERINFO", res.data.data);
            this.userInfo.avatar = URL.createObjectURL(file.raw);
          })
          .catch((err) => {});
      }
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      // console.log("beforeAvatarUpload--", file);
      // const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      // return isJPG && isLt2M;
      return isLt2M;
    },
    modifyData() {
      let params = {
        nickname: this.userInfo.nickname,
        signature: this.userInfo.signature,
        tags: this.userInfo.tags,
      };
      modifyData(params).then((res) => {
        if (res.data.status) {
          this.$message.success(res.data.msg);
          // console.log("modifyData---", res.data);
          this.$store.commit("setUSERINFO", res.data.data);
        } else {
          this.$message.warning(res.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.modify {
  margin: 5vh 20px;
  border-radius: 15px;
  //   height: 80vh;
  //   .modify_title {
  //     margin: 5px 10px;

  //     // text-align: center;
  //     font-size: 20px;
  //     font-weight: bolder;
  //   }
  .modify_box {
    display: flex;
    width: 95%;
    margin: 0 auto;
    // border-bottom: 1px solid #eeeeee9c;
    padding: 2px 0;
    .modify_label {
      width: 80px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }

    .modify_box_right {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 250px;
      .avatar-uploader {
        position: absolute;
        left: 15px;
      }
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .el-upload--text {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.submit_button {
  width: 100px;
  height: 35px;
  background-color: rgb(105, 219, 223);
  &:hover {
    background-color: rgb(117, 241, 245);
  }
}
</style>
<style lang="less" scoped>
/deep/.el-input {
  .el-input__inner {
    // color: #3f3a3a;
    // width: 70%;
    font-weight: bolder;
    border: none;
    transition: 0.3s;
    font-family: "仓耳渔阳体 W03";
    // background-color: #ffffff5e;
    background: transparent;
    &:hover {
      color: #000000;
      border: none;
      //   box-shadow: 0 0 5px 0 #fff;
    }
    &:focus {
      color: #000000;
      border: none;
      //   box-shadow: 0 0 5px 0 #fff;
    }
  }
}
</style>