<template>
  <div class="friendLink">
    <div v-if="linkData.length !== 0">
      <div class="link_box" v-for="item in linkData" :key="item.id">
        <span class="link_name">
          <b
            ><i>{{ item.linkname }}：</i></b
          >
        </span>
        <span
          ><a class="link_address" :href="item.linkurl" target="_blank"
            ><b
              ><i>{{ item.linkurl }}</i></b
            ></a
          >
        </span>
        <div class="link_delete" @click="deletelink(item._id)">
          <img class="delete_image" src="@/assets/icon/delete.png" alt=" " />
        </div>
      </div>
    </div>

    <div class="linkAddBox">
      <span class="linkAddBox_span">添加友链：</span>
      <input
        class="linkname_input link_input"
        type="text"
        v-model.trim="linkbox.linkname"
        placeholder="链接名"
      />
      <input
        class="linkurl_input link_input"
        type="text"
        v-model.trim="linkbox.linkurl"
        placeholder="链接地址"
      />
      <button class="my_button" @click="addlink">添加</button>
    </div>
  </div>
</template>

<script>
import { addlink, getlink, deletelink } from "@/request/link";
export default {
  data() {
    return {
      linkData: [
        // {
        //   linkname: "My music",
        //   linkurl: "https://wacht.xyz",
        //   _id: "",
        // },
      ],
      linkbox: {
        linkname: "",
        linkurl: "",
      },
    };
  },
  created() {
    this.getlink();
  },
  methods: {
    //获取友链
    getlink() {
      getlink()
        .then((res) => {
          this.linkData = res.data.data;
        })
        .catch((err) => {});
    },
    //添加友链
    addlink() {
      if (this.linkbox.linkname === "" || this.linkbox.linkurl === "") {
        this.$message.warning("链接名和链接地址不能为空");
        return;
      }
      addlink(this.linkbox)
        .then((res) => {
          res.data.status
            ? this.$message.success(res.data.msg)
            : this.$message.warning(res.data.msg);
          this.getlink();
        })
        .catch((err) => {});
    },
    //删除友链
    deletelink(id) {
      deletelink({ _id: id })
        .then((res) => {
          res.data.status
            ? this.$message.success(res.data.msg)
            : this.$message.warning(res.data.msg);
          this.getlink();
        })
        .catch((err) => {});
    },
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 450px) {
  .friendLink {
    width: 100%;
    // margin-bottom: 10vh;
    .link_box {
      position: relative;
      margin: 30px 5px;
      padding: 1px 10px;
      height: 5vh;
      line-height: 5vh;
      border-radius: 20px;

      .link_address {
        transition: 0.3s;
        color: rgb(3, 115, 180);
        &:hover {
          color: rgb(5, 73, 150);
        }
      }
      .link_delete {
        position: absolute;
        top: 0;
        right: 2px;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        width: 5vh;
        height: 5vh;
        transition: 0.3s;

        &:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.274);
        }
        .delete_image {
          // position: absolute;
          width: 25px;
          height: 25px;
        }
      }
    }
    .linkAddBox {
      position: fixed;
      display: flex;

      justify-content: space-around;
      padding: 0 10px;
      margin: 5px;
      top: 90vh;
      // width: 95%;
      height: 5vh;
      border-radius: 20px;

      .linkAddBox_span {
        display: none;
      }
      .link_input {
        // margin: 0 auto;
        width: 40%;
        padding: 0 10px;
        height: 30px;
        box-shadow: 0 0 5px 1px #eee;
        border-radius: 5px;
        // margin: 0 20px;
        transition: 0.3s;
        box-sizing: border-box;
      }

      .linkurl_input {
        margin-left: 10px;
      }

      .my_button {
        // position: absolute;
        // right: 25px;
        // width: 50px;
      }
    }
  }
}
@media (min-width: 451px) {
  .friendLink {
    width: 100%;
    margin-bottom: 30vh;

    .link_box {
      position: relative;
      margin: 30px 0 30px;
      padding: 1px 10px;
      height: 5vh;
      // line-height: 5vh;
      border-radius: 20px;

      .link_name {
      }
      .link_address {
        transition: 0.3s;
        color: rgb(3, 115, 180);
        &:hover {
          color: rgb(5, 73, 150);
        }
      }
      .link_delete {
        position: absolute;
        top: 0;
        right: 2px;
        bottom: 0;
        margin: auto;
        border-radius: 50%;
        width: 5vh;
        height: 5vh;
        transition: 0.3s;

        &:hover {
          cursor: pointer;
          background-color: rgba(255, 255, 255, 0.274);
        }
        .delete_image {
          // position: absolute;
          width: 25px;
          height: 25px;
        }
      }
    }
    .linkAddBox {
      position: fixed;
      padding: 0 10px;
      top: 85vh;
      width: 950px;
      height: 5vh;
      border-radius: 20px;

      .link_input {
        margin: 0 auto;
        padding: 0 20px;
        height: 30px;
        box-shadow: 0 0 5px 1px #eee;
        border-radius: 5px;
        margin: 0 20px;
        transition: 0.3s;

        &:hover {
          box-shadow: 0 0 10px 2px #eee;
        }
      }

      .linkurl_input {
        width: 50%;
      }

      .my_button {
        position: absolute;
        right: 25px;
        width: 50px;
      }
    }
  }
}

.link_box,
.linkAddBox {
  display: flex;
  align-items: center;
}
.link_name,
.link_address {
  &:hover {
    cursor: pointer;
  }
}
</style>