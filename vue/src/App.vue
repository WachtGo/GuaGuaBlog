<template>
  <div id="app">
    <headerNav></headerNav>
    <mainWrap></mainWrap>
    <!-- <maskCanvas></maskCanvas> -->
  </div>
</template>
<script>
import headerNav from "./components/headerNav.vue";
import mainWrap from "./components/mainWrap.vue";
import maskCanvas from "./components/background/maskCanvas.vue";

export default {
  components: {
    headerNav,
    mainWrap,
    maskCanvas,
  },
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
a {
  color: rgb(0, 0, 0);
  text-decoration: none;
  // color: black;
}
img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
pre {
  white-space: pre-wrap; /* CSS-3 /
white-space: -moz-pre-wrap; / Mozilla, since 1999 /
white-space: -pre-wrap; / Opera 4-6 /
white-space: -o-pre-wrap; / Opera 7 /
Word-wrap: break-word; / Internet Explorer 5.5+ */
}
html {
}
@media (max-width: 450px) {
  body {
    // background-image: url(@/assets/img/backPhone.jpg);
    background-image: url(@/assets/img/background.jpg);
    // background: #eee;
    background-attachment: fixed;
    background-size: cover;
    // height: 3000px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
@media (min-width: 450px) {
  body {
    background-image: url(@/assets/img/background.jpg);
    // background: #eee;
    background-attachment: fixed;
    background-size: cover;
    // height: 3000px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

pre {
  font-family: "仓耳渔阳体 W03";
}
@font-face {
  font-family: "仓耳渔阳体 W03";
  font-weight: 400;
  src: url("@/assets/font/TsangerYuYangT_W03_W03.ttf");
  font-display: swap;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
//图标的统一样式
.iconImage {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  width: 1.2em;
  height: 1.2em;
}
//按钮样式初始化
.my_button {
  font-family: "仓耳渔阳体 W03";
  border: none;
  border-radius: 5px;
  padding: 2px 5px;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  // background-color: rgba(255, 255, 255, 0.6);
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
}
//点击后弹出的窗口盒子
.loginWrap,
.loginWrap2 {
  border-radius: 10px;
  transition: 0.3s;
  box-shadow: 0 0 5px 1px #eee;
  background-color: rgba(255, 255, 255, 0.8);

  &:hover {
    // cursor: pointer;
    box-shadow: 0 0 10px 1px #ffffff;
  }
}

#app {
  font-family: "仓耳渔阳体 W03";
}
//输入框的公用样式
.wtite_box_input,
.write_input,
.link_input {
  font-family: "仓耳渔阳体 W03";
  height: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  &:focus {
    outline: none;
    //   background-color: antiquewhite;
  }
}

.headWrap,
#sidebar,
// .about,
.linkAddBox,
.link_box,
.message_board,
.message_box,
.modify,
.my_button,
.go_top,
.go_bottom {
  transition: 0.3s;
  box-shadow: 0 0 5px 1px #eee;
  background-color: rgba(255, 255, 255, 0.5);
  // background-color: rgba(255, 255, 255, 0.8);

  &:hover {
    // cursor: pointer;
    box-shadow: 0 0 10px 1px #eee;
  }
}

// .el-message,
.el-message--success,
.el-message--info,
.el-message--warning,
.el-message--error {
  position: fixed;
  left: 50%;
  top: 5vh !important;
  min-width: 200px !important;
  box-sizing: border-box;
  border-radius: 10px !important;
  border-width: 0 !important;
  // border-style: solid;

  transform: translateX(-50%);
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  // overflow: hidden;
  padding: 15px 15px 15px 10px !important;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 0px #eee !important;
  background-color: rgba(255, 255, 255, 0.795) !important;
  // border-color: rgb(55, 85, 125) !important;
}
</style>
