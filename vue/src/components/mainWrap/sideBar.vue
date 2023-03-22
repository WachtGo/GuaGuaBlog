<template>
  <div>
    <div class="side_top">
      <!-- <div class="side_down">
        <img src="@/assets/icon/guanbi.png" alt=" " />
      </div> -->
      <div class="side_top_one">
        <img class="side_img" :src="userInfo.avatar" alt=" " />
        <!-- <img
          class="side_img"
          src="http://localhost:3000/userImg/default6666666.png"
          alt=" "
        /> -->
      </div>
      <div class="word_show">{{ userInfo.signature }}</div>
    </div>
    <div class="side_body">
      <ul class="side_tags_box">
        <li
          class="side_tag"
          v-for="(item, index) in userInfo.tags"
          :key="index"
        >
          <i>{{ item }}</i>
        </li>
      </ul>
    </div>
    <div class="side_body">
      <!-- <div class="side_title"></div> -->
      <div class="side_favorite_box">
        <ul class="side_favorite">
          <li
            class="side_favorite_li"
            v-for="(item, index) in favoriteArr"
            :key="index"
            @click="goUrl(item.url)"
          >
            <div class="side_favorite_left">
              <img
                class="side_favorite_image"
                :src="item.favoriteImg"
                alt=" "
              />
            </div>

            <div class="side_favorite_right">
              <p class="side_favorite_title">
                {{ item.favoriteTitle }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="side_body">
      <div class="side_title"></div>
      <div class="blog_infos_box">
        <!-- <div class="blog_infos">
          <div class="icon_box">
            <img class="iconImage" src="@/assets/icon/favorite.png" alt="" />
          </div>
          <div class="blog_info">收藏</div>
          <div class="info_count">0</div>
        </div> -->
        <div class="blog_infos">
          <div class="icon_box">
            <img class="iconImage" src="@/assets/icon/pinglun.png" alt="" />
          </div>
          <div class="blog_info">留言</div>
          <div class="info_count">{{ userInfo.messageCount }}</div>
        </div>
        <!-- <div class="blog_infos">
          <div class="icon_box">
            <img class="iconImage" src="@/assets/icon/shijian.png" alt="" />
          </div>
          <div class="blog_info">运行天数</div>
          <div class="info_count">0</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteArr: [
        {
          favoriteImg: require("@/assets/img/guagua.png"),
          favoriteTitle: "GuaGua music",
          url: "https:wacht.xyz",
        },
        {
          favoriteImg: require("@/assets/img/4399.jpg"),
          favoriteTitle: "好玩好玩！",
          url: "https://www.4399.com/",
        },

        {
          favoriteImg: require("@/assets/img/bilibili.jpg"),
          favoriteTitle: "劳逸结合，放松一下也是必要的...",
          url: "https://www.bilibili.com/",
        },
        {
          favoriteImg: require("@/assets/img/huya.jpg"),
          favoriteTitle: "继续学习咯，咬咬牙坚持坚持",
          url: "https://www.huya.com/",
        },
        {
          favoriteImg: require("@/assets/img/moyu.jpg"),
          favoriteTitle: "偶尔摸摸鱼，修心养性",
          url: "https://www.douyu.com/",
        },
        {
          favoriteImg: require("@/assets/img/aiqiyi.jpg"),
          favoriteTitle: "爱情是奇迹，还是艺术...",
          url: "https://www.iqiyi.com/",
        },
        {
          favoriteImg: require("@/assets/img/douyin.jpg"),
          favoriteTitle: "w我被酒色所伤，竟然如此憔悴，自今日起，戒酒！",
          url: "https://www.douyin.com/",
        },
        {
          favoriteImg: require("@/assets/img/book.jpg"),
          favoriteTitle: "书山有路勤为径，学海无涯苦作舟",
          url: "https://www.qidian.com/",
        },
      ],
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
  methods: {
    goUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="less" scoped>
// @import "@/assets/iconfont/iconfont.css";
// .icon {
//   //iconfont
//   width: 1em;
//   height: 1em;
//   vertical-align: -0.15em;
//   fill: currentColor;
//   overflow: hidden;
// }
@media (max-width: 450px) {
}
@media (min-width: 451px) {
}
.side_top {
  margin: 10px 0px;
  width: 100%;
  // height: 250px;
  // background-color: rgb(185, 132, 63);

  .side_top_one {
    position: relative;
    margin: 0 auto;
    width: 180px;
    height: 180px;
  }
  .side_img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .word_show {
    margin: 10px 10px;
    height: 40px;
    font-size: 13px;
    text-indent: 1.5em;
    display: -webkit-box;
    overflow: hidden; /*overflow只能用在块级元素*/
    text-overflow: ellipsis; /*溢出显示为...*/
    -webkit-box-orient: vertical; /*设置对齐模式*/
    -webkit-line-clamp: 2; /*设置多行的行数，此处为2行*/
  }
}
.side_body {
  margin: 1vh 0;
  width: 100%;
  //使文字不可选中
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  .side_title {
    text-indent: 0.5em;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    font-weight: bolder;

    // border-bottom: 1px solid #eee;
  }
}
.side_body {
  .side_favorite_box {
    padding: 0 0 5px 0;
    border-radius: 5px;
    box-shadow: 0 0 5px 1px #eee;
  }
  .side_favorite {
    height: 30vh;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      // background: #dfdfdf;
      // width: 2px;
      /* &符号代表.wrap，此处为less预处理器写法，css写法为.wrap::-webkit-scrollba */
      display: none;
    }

    .side_favorite_li {
      display: flex;
      justify-content: space-between;
      margin: 5px;
      height: 50px;
      box-shadow: 5px 5px 5px -5px #eee;
      border-radius: 13px;
      // box-shadow: 0 0 5px 0 #eee;
      transition: 0.3s;

      &:hover {
        cursor: pointer;
        background-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 5px 0 #eee;
      }

      .side_favorite_left {
        position: relative;
        width: 50px;
        height: 50px;
        // background-color: rgb(250, 242, 232);
        .side_favorite_image {
          width: 90%;
          height: 90%;
          border-radius: 15%;
        }
      }
      .side_favorite_right {
        display: flex;
        align-items: center;
        padding: 9px 2px 9px 0;
        width: 150px;

        .side_favorite_title {
          font-size: 13px;
          text-indent: 1.2em;
          // line-height: 50px;
          // background-color: antiquewhite;
          display: -webkit-box;
          overflow: hidden; /*overflow只能用在块级元素*/
          -webkit-line-clamp: 2; /*设置多行的行数，此处为2行*/
          text-overflow: ellipsis; /*溢出显示为...*/
          -webkit-box-orient: vertical; /*设置对齐模式*/
        }
      }
    }
  }
}
.side_body {
  .blog_infos_box {
    // height: 150px;
    // overflow-x: hidden;

    // &::-webkit-scrollbar {
    //   /* &符号代表.wrap，此处为less预处理器写法，css写法为.wrap::-webkit-scrollba */
    //   display: none;
    // }
    .blog_infos {
      display: flex;
      height: 30px;
      line-height: 30px;
      // background-color: antiquewhite;
      .icon_box {
        position: relative;
        width: 30px;
        height: 30px;
      }
      .blog_info {
        margin: 0 10px 0 5px;
      }
      .info_count {
        width: 30px;
        text-align: center;
        color: #353535;

        transition: 0.3s;

        &:hover {
          cursor: pointer;
          color: #dd6504;
          // background-color: #eee;
        }
      }
    }
  }
}
.side_body {
  .side_tags_box {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    // height: 200px;
    margin: 0 5px;
    padding: 5px;
    border-radius: 50px;
    box-shadow: 5px 5px 5px -5px #eee;

    &::-webkit-scrollbar {
      /* &符号代表.wrap，此处为less预处理器写法，css写法为.wrap::-webkit-scrollba */
      display: none;
    }
    .side_tag {
      margin: 2px;
      padding: 2px;
      height: 14px;
      font-weight: bolder;
      font-size: 12px;
      text-align: center;
      border-radius: 5px;
      background-color: #eeeeee5d;
    }
  }
}
</style>
