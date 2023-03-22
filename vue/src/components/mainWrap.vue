<template>
  <div class="main">
    <div id="sidebar">
      <sideBar></sideBar>
    </div>
    <div id="main_view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideBar from "./mainWrap/sideBar.vue";
export default {
  components: {
    sideBar,
  },
};
</script>

<style lang="less" scoped>
@media (max-width: 450px) {
  .main {
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 92vh;
    margin: 6vh auto 2vh;
    // width: 1200px;

    #sidebar {
      z-index: 100;
      display: none;
      margin: 0 auto;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      width: 65%;
      height: 80vh;
      border-radius: 20px;
      transition: 0.3s;
      // background: #f7f7f7d0;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    #main_view {
      // padding: 0 5px;
      // position: absolute;
      // top: 0;
      // left: 250px;
      // width: 950px;
      // border-radius: 20px;
    }
  }
}
@media (min-width: 451px) {
  .main {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 60px auto;
    width: 1200px;

    #sidebar {
      position: fixed;
      width: 220px;
      height: 85vh;
      border-radius: 20px;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    #main_view {
      position: absolute;
      top: 0;
      left: 250px;
      width: 950px;
      border-radius: 20px;
    }
  }
}
</style>