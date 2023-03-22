<template>
  <div class="message">
    <div class="message_board">
      <div class="go_box">
        <!-- 留言框到最顶层 -->
        <div class="go_top" @click="goTopBottom(true)">
          <img class="iconImage" src="@/assets/icon/top2.png" alt=" " />
        </div>
        <!-- 留言框到最底层 -->
        <div class="go_bottom" @click="goTopBottom(false)">
          <img class="iconImage" src="@/assets/icon/bottom2.png" alt=" " />
        </div>
      </div>
      <!-- 留言板顶部区域 -->
      <div class="board_top">
        留言板
        <!-- 切换 -->
        <div class="board_owner" @click="boardUserShow = !boardUserShow">
          <img v-if="!messageOwnerAvatar" :src="userInfo.avatar" alt=" " />
          <img v-else :src="messageOwnerAvatar" alt=" " />
        </div>
        <span class="board_top_tips" @click="boardUserShow = !boardUserShow">
          <img src="@/assets/icon/select.png" alt=" " />
        </span>
        <div v-show="boardUserShow" class="board_select_wrap">
          <ul class="board_select_ul">
            <li
              class="board_select_li"
              v-for="item in boardUsers"
              :key="item._id"
              @click="selectBoard(item._id, item.avatar)"
            >
              <div class="board_select_avatar">
                <img :src="item.avatar" alt=" " />
              </div>
              <div class="board_select_name">{{ item.nickname }}</div>
            </li>
          </ul>
        </div>
        <!-- 排序图标 -->
        <div class="board_sort" @click="positiveOrder = !positiveOrder">
          <img class="board_sort_icon" src="@/assets/icon/sort.png" alt=" " />
        </div>
      </div>
      <!-- 留言板内容区 -->
      <ul class="message_ul" id="message_ul_id">
        <li v-for="(item, index) in messageBoard" :key="index">
          <div v-if="item._id" class="message_content">
            <div class="message_line">
              <pre>{{ item.content }}</pre>
            </div>
            <div class="message_info">
              <div class="message_writer">
                <b>
                  <i>来自：{{ item.writer }}</i>
                </b>
              </div>
              <div class="message_time">
                <b>
                  <i>{{ item.createTime }}</i>
                </b>
              </div>
            </div>
            <!-- 当已登录并且当前留言板是属于该已登录用户时显示删除按钮 -->
            <div
              v-if="
                token &&
                (messageOwnerId === userInfo._id ||
                  userInfo.username === 'wacht')
              "
              class="message_delete"
            >
              <img
                class="delete_image"
                @click="deleteMessage(item._id)"
                src="@/assets/icon/delete.png"
                alt=" "
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="message_box">
      <div class="message_box_title">我想说:</div>
      <div class="write_box">
        <textarea
          class="wtite_box_input"
          name=""
          id=""
          cols="30"
          rows="10"
          v-model.trim="messageBox.content"
        ></textarea>
      </div>
      <div class="write_info">
        <div class="write_name">
          <span>昵称：</span>
          <input
            class="write_input"
            type="text"
            v-model.trim="messageBox.writer"
            placeholder="随便写"
          />
        </div>
        <button class="my_button" @click="writeMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMessages,
  writeMessage,
  deleteMessage,
  getBoardUsers,
} from "@/request/message";
import { formatDate, textParse } from "@/utils/tools";
export default {
  data() {
    return {
      boardUserShow: false,
      messageOwnername: "",
      messageOwnerId: "", //当前显示的留言板用户id
      messageOwnerAvatar: "",
      boardUsers: [],
      messageBoard: [
        {
          content: "",
          writer: "",
          createTime: "",
          _id: null,
        },
      ],
      messageBox: {
        content: "",
        writer: "",
        createTime: 0,
      },
      positiveOrder: true, //是否为正序排列（）
      warntimer: null, //
    };
  },
  created() {
    // console.log(
    //   "this.$store.state.userInfo.avatar---",
    //   this.$store.state.userInfo.avatar
    // );
    this.messageOwnerAvatar = this.$store.state.userInfo.avatar;
    this.messageOwnerName = this.$store.state.userInfo.nickname;
    this.messageOwnerId = this.$store.state.userInfo._id; //初始化当前留言板所属用户id
    this.getMessages(); //获取留言板
    this.getBoardUsers(); //获取用户
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    token() {
      return this.$store.state.token;
    },
  },
  watch: {
    positiveOrder: {
      handler() {
        this.messageBoard.reverse();
      },
    },
    messageBoard: {
      handler() {
        this.$store.commit("updateMessageCount", this.messageBoard.length);
      },
    },
  },
  methods: {
    //获取留言
    getMessages(bool) {
      getMessages({ id: this.messageOwnerId }).then(async (res) => {
        if (!res.data.data) return;
        this.messageBoard = await res.data.data;
        // console.log("获取留言--", this.messageBoard);
        this.messageBoard.forEach((item) => {
          item.createTime = formatDate(item.createTime);
        });
        if (!this.positiveOrder) {
          this.messageBoard.reverse(); //倒序排列
          return;
        }
        this.$nextTick(() => {
          if (bool) {
            //写留言则自动到最底下显示发送的留言
            this.goTopBottom(false);
          }
        });
      });
    },
    //写留言
    writeMessage() {
      if (this.messageBox.content === "" || this.messageBox.writer === "") {
        if (this.warntimer) return;
        this.$message.warning("留言内容和你的大名不能为空");
        this.warntimer = setTimeout(() => {
          this.warntimer = null;
        }, 3000);
        return;
      }
      let id = "";
      this.messageOwnerId
        ? (id = this.messageOwnerId)
        : (id = this.userInfo._id);
      // this.messageBox.content = textParse(this.messageBox.content);
      let params = {
        content: this.messageBox.content,
        writer: this.messageBox.writer,
        id: id,
        createTime: new Date().getTime(),
      };
      writeMessage(params)
        .then((res) => {
          // console.log("writeMessage--", res);
          this.messageBox.content = "";
          this.getMessages(true);
        })
        .catch((error) => {});
    },
    //删除留言
    deleteMessage(id) {
      deleteMessage({ _id: id })
        .then((res) => {
          res.data.status
            ? this.$message.success(res.data.msg)
            : this.$message.warn(res.data.msg);
          this.getMessages();
        })
        .catch((error) => {});
    },
    //跳到留言板最底部或者最顶部，再配合平滑滚动css样式
    goTopBottom(value) {
      let diva = document.getElementById("message_ul_id");
      value ? (diva.scrollTop = 0) : (diva.scrollTop = diva.scrollHeight);
    },
    //获取所有用户
    getBoardUsers() {
      getBoardUsers()
        .then((res) => {
          // console.log("getBoardUsers--", res.data.data);
          this.boardUsers = res.data.data;
        })
        .catch((err) => {});
    },
    //选择留言板
    selectBoard(id, avatar) {
      this.messageOwnerId = id;
      this.messageOwnerAvatar = avatar;
      this.getMessages();
    },
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 450px) {
  .message {
    width: 93%;
    .message_board {
      position: relative;
      margin: 10px 5px 20px;
      padding: 5px;

      border-radius: 20px;

      .go_box {
        position: absolute;
        right: -32px;
        bottom: 10px;
        width: 30px;
        height: 70px;

        .go_top,
        .go_bottom {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          user-select: none;

          &:hover {
            cursor: pointer;
          }
          img {
            width: 20px;
            height: 20px;
          }
        }
        .go_top {
          top: 0;
        }
        .go_bottom {
          bottom: 0;
        }
      }

      .board_top {
        position: relative;
        //   width: 100%;
        height: 23px;
        font-size: 18px;
        text-align: center;
        font-weight: bolder;
        //   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        .board_owner {
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 15px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          overflow: hidden;
          &:hover {
            cursor: pointer;
          }
        }
        .board_top_tips {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50px;
          margin: auto;
          width: 20px;
          height: 20px;
          transition: 0.3s;
          &:hover {
            cursor: pointer;
            background-color: rgba(233, 233, 233, 0.459);
          }
          // font-size: 12px;
          // line-height: 23px;
        }
        .board_sort {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 15px;
          margin: auto;
          width: 20px;
          height: 20px;
          transition: 0.3s;

          &:hover {
            cursor: pointer;
            background-color: rgba(238, 238, 238, 0.342);
          }

          .board_sort_icon {
          }
        }
        .board_select_wrap {
          z-index: 99;
          position: absolute;
          top: 30px;
          width: 50%;
          border-radius: 15px;
          transition: 0.3s;
          // box-shadow: 0 0 5px 1px #eee;
          background-color: rgba(255, 255, 255, 0.5);
          .board_select_ul {
            // background: #c7b6b6;
            margin: 10px;
            max-height: 60vh;
            overflow-x: hidden;
            &::-webkit-scrollbar {
              display: none;
            }

            .board_select_li {
              margin-bottom: 5px;
              padding: 2px 5px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 30px;
              border-radius: 10px;
              background: rgba(237, 237, 237, 0.7);
              transition: 0.3s;
              &:hover {
                cursor: pointer;
                background: rgba(255, 255, 255, 0.7);
              }
              .board_select_avatar {
                position: relative;
                width: 28px;
                height: 28px;
                overflow: hidden;
                border-radius: 50%;
                // background: #eee;
              }
              .board_select_name {
                margin-left: 10px;
                flex: 4;
                height: 28px;
                font-size: 13px;
                font-weight: bolder;
                line-height: 28px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // background: #d1adad;
              }
            }
          }
        }
      }
      .message_ul {
        height: 68vh;
        transition: 0.3;
        overflow-x: hidden;
        scroll-behavior: smooth; //平滑滚动
        &::-webkit-scrollbar {
          /* &符号代表.wrap，此处为less预处理器写法，css写法为.wrap::-webkit-scrollba */
          display: none;
        }

        .message_content {
          position: relative;
          padding-top: 10px;
          margin-bottom: 20px;
          font-size: 13px;
          border-radius: 15px;
          transition: 0.3s;
          background-color: rgba(0, 0, 0, 0.08);

          &:hover {
            // cursor: pointer;
            background-color: rgba(0, 0, 0, 0.116);
          }

          .message_line {
            text-indent: 1.5em;
          }
          .message_info {
            font-size: 12px;
            // height: 30px;
            // background-color: rgba(245, 222, 179, 0.527);
            .message_writer {
              margin-right: 30px;
              text-align: right;
            }
            .message_time {
              margin-right: 30px;
              text-align: right;
            }
          }
          .message_delete {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: 0.3s;

            &:hover {
              cursor: pointer;
              background-color: rgba(255, 255, 255, 0.274);
            }
            .delete_image {
              position: absolute;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
    .message_box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 5px;
      padding: 5px;
      height: 15vh;
      border-radius: 20px;
      .message_box_title {
        font-size: 18px;
        text-indent: 1em;
        font-weight: bolder;
      }
      .write_box {
        margin: 0 auto 1vh;
        padding: 2px 10px;
        width: 90%;
        height: 8vh;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 5px 0 #eee;
        box-sizing: border-box;

        .wtite_box_input {
          resize: none; //使textarea不可拖动

          width: 100%;
          background: transparent;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
      .write_info {
        display: flex;
        justify-content: space-around;
        height: 25px;
        line-height: 25px;
        //   background-color: rgb(153, 203, 223);
        .write_name {
          white-space: nowrap;
          .write_input {
            box-shadow: 0 0 5px 1px #eee;
            width: 150px;
            border-radius: 5px;
            text-align: center;
            transition: 0.3s;

            &:hover {
              box-shadow: 0 0 10px 2px #eee;
            }
          }
        }
        .my_button {
          width: 60px;
        }
      }
    }
  }
}
@media (min-width: 451px) {
  .message {
    width: 100%;
    .message_board {
      position: relative;
      margin: 20px 0 30px;
      padding: 5px;

      border-radius: 20px;

      .go_box {
        position: absolute;
        right: -60px;
        bottom: 10px;
        width: 50px;
        height: 120px;

        .go_top,
        .go_bottom {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          user-select: none;

          &:hover {
            cursor: pointer;
          }
          img {
            width: 30px;
            height: 30px;
          }
        }
        .go_top {
          top: 0;
        }
        .go_bottom {
          bottom: 0;
        }
      }

      .board_top {
        position: relative;
        //   width: 100%;
        height: 23px;
        font-size: 18px;
        text-align: center;
        font-weight: bolder;
        //   border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        .board_owner {
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 15px;
          width: 21px;
          height: 21px;
          border-radius: 50%;
          overflow: hidden;
          &:hover {
            cursor: pointer;
          }
        }
        .board_top_tips {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50px;
          margin: auto;
          width: 20px;
          height: 20px;
          transition: 0.3s;
          &:hover {
            cursor: pointer;
            background-color: rgba(233, 233, 233, 0.459);
          }
          // font-size: 12px;
          // line-height: 23px;
        }
        .board_sort {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 15px;
          margin: auto;
          width: 20px;
          height: 20px;
          transition: 0.3s;

          &:hover {
            cursor: pointer;
            background-color: rgba(238, 238, 238, 0.342);
          }

          .board_sort_icon {
          }
        }
        .board_select_wrap {
          z-index: 99;
          position: absolute;
          top: 30px;
          width: 200px;
          border-radius: 15px;
          transition: 0.3s;
          // box-shadow: 0 0 5px 1px #eee;
          background-color: rgba(255, 255, 255, 0.5);
          .board_select_ul {
            // background: #c7b6b6;
            margin: 10px;
            max-height: 50vh;
            overflow-x: hidden;
            &::-webkit-scrollbar {
              display: none;
            }

            .board_select_li {
              margin-bottom: 5px;
              padding: 2px 5px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              height: 30px;
              border-radius: 10px;
              background: rgba(237, 237, 237, 0.7);
              transition: 0.3s;
              &:hover {
                cursor: pointer;
                background: rgba(237, 237, 237, 0.918);
              }
              .board_select_avatar {
                position: relative;
                width: 28px;
                height: 28px;
                overflow: hidden;
                border-radius: 50%;
                // background: #eee;
              }
              .board_select_name {
                margin-left: 10px;
                flex: 4;
                height: 28px;
                font-size: 13px;
                font-weight: bolder;
                line-height: 28px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // background: #d1adad;
              }
            }
          }
        }
      }
      .message_ul {
        height: 68vh;
        transition: 0.3;
        overflow-x: hidden;
        scroll-behavior: smooth; //平滑滚动
        &::-webkit-scrollbar {
          /* &符号代表.wrap，此处为less预处理器写法，css写法为.wrap::-webkit-scrollba */
          display: none;
        }

        .message_content {
          position: relative;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 15px;
          transition: 0.3s;
          background-color: rgba(0, 0, 0, 0.08);

          &:hover {
            // cursor: pointer;
            background-color: rgba(0, 0, 0, 0.116);
          }

          .message_line {
            text-indent: 1.5em;
          }
          .message_info {
            // height: 30px;
            // background-color: rgba(245, 222, 179, 0.527);
            .message_writer {
              margin-right: 170px;
              text-align: right;
            }
            .message_time {
              margin-right: 30px;
              text-align: right;
            }
          }
          .message_delete {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            transition: 0.3s;

            &:hover {
              cursor: pointer;
              background-color: rgba(255, 255, 255, 0.274);
            }
            .delete_image {
              position: absolute;
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
    .message_box {
      padding: 5px;
      // height: 13vh;
      border-radius: 20px;
      .message_box_title {
        font-size: 18px;
        text-indent: 1em;
        font-weight: bolder;
      }
      .write_box {
        margin: 0 auto 1vh;
        padding: 2px 10px;
        width: 90%;
        height: 8vh;
        border-radius: 15px;
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 5px 0 #eee;
        box-sizing: border-box;

        .wtite_box_input {
          resize: none; //使textarea不可拖动

          width: 100%;
          background: transparent;
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
      .write_info {
        display: flex;
        justify-content: center;
        height: 25px;
        line-height: 25px;
        //   background-color: rgb(153, 203, 223);
        .write_name {
          .write_input {
            box-shadow: 0 0 5px 1px #eee;
            border-radius: 5px;
            margin-right: 20px;
            text-align: center;
            transition: 0.3s;

            &:hover {
              box-shadow: 0 0 10px 2px #eee;
            }
          }
        }
      }
    }
  }
}
</style>