<template>
  <div class="headWrap">
    <div class="head">
      <div class="logo">
        <div class="logoname">{{ userInfo.nickname }}</div>
        <!-- <div class="logoImg_box"> -->
        <img
          class="logoImg"
          @click="sidebarShow(true)"
          :src="userInfo.avatar"
          alt=" "
        />
        <!-- </div> -->

        <!-- <img class="logoImage" src="@/assets/img/logo.png" alt="" /> -->
      </div>
      <div class="header_center">
        <ul class="header_nav">
          <li
            class="nav_item"
            v-for="(item, index) in navList"
            :key="index"
            @click="sidebarShow"
          >
            <router-link :to="item.path">{{ item.title }}</router-link>
          </li>
        </ul>
      </div>
      <login></login>
    </div>
  </div>
</template>

<script>
import login from "@/components/headerNav/login.vue";
export default {
  components: {
    login,
  },
  data() {
    return {
      navList: [
        {
          path: "/",
          title: "留言",
        },
        {
          path: "/friendLink",
          title: "链接",
        },
        {
          path: "/about",
          title: "关于",
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
    sidebarShow(bool) {
      let sidebar = document.getElementById("sidebar");
      let mainview = document.getElementById("main_view");
      if (bool) {
        sidebar.style.display === "block"
          ? ((sidebar.style.display = "none"),
            (mainview.style.display = "block"))
          : ((sidebar.style.display = "block"),
            (mainview.style.display = "none"));
      }
    },
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 450px) {
  .headWrap {
    z-index: 99;
    position: fixed;
    top: 0;
    width: 100%;
    height: 5vh;
    line-height: 5vh;

    .head {
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      // min-width: 500px;
      height: 5vh;
      text-align: center;
      //使文字不可选中
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .logo {
        position: relative;
        width: 50px;
        .logoname {
          display: none;
        }

        .logoImg {
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }
      }
      .header_center {
        flex-grow: 1;
        display: flex;
        // margin: 0 auto;
        height: 5vh;
        line-height: 5vh;
        //   background-color: rgb(236, 236, 236);
        .header_nav {
          display: flex;
          width: 100%;
          margin: 0 auto;
          justify-content: space-around;
          // font-family: "仓耳渔阳体";
          .nav_item {
            width: 50px;
            transition: 0.3s;

            &:hover {
              cursor: pointer;
              background-color: rgba(255, 255, 255, 0.3);
            }

            a {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
@media (min-width: 451px) {
  .headWrap {
    z-index: 99;
    position: fixed;
    top: 0;
    width: 100%;
    height: 5vh;
    line-height: 5vh;

    .head {
      display: flex;
      margin: 0 auto;
      justify-content: space-between;
      max-width: 1200px;
      // min-width: 500px;
      height: 5vh;
      text-align: center;
      //使文字不可选中
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .logo {
        width: 220px;

        //   display: -webkit-box;
        .logoname {
          font-size: 20px;
          overflow: hidden; /*overflow只能用在块级元素*/
          max-width: 220px;
          white-space: nowrap;
          text-overflow: ellipsis; /*溢出显示为...*/
          //   -webkit-box-orient: vertical; /*设置对齐模式*/
          //   -webkit-line-clamp: 1; /*设置多行的行数，此处为2行*/
          //   background-color: rgba(255, 255, 255, 0.055);
        }

        .logoImg {
          display: none;
        }
      }
      .header_center {
        flex-grow: 1;
        display: flex;

        height: 5vh;
        //   background-color: rgb(236, 236, 236);
        .header_nav {
          display: flex;
          margin: 0 auto;
          justify-content: space-around;
          // font-family: "仓耳渔阳体";
          .nav_item {
            width: 60px;
            transition: 0.3s;

            &:hover {
              cursor: pointer;
              background-color: rgba(255, 255, 255, 0.3);
            }

            a {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}
</style>