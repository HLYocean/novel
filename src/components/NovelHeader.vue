<template>
  <div>
    <div class="novel-header">
      <img
        class="novel-header-logo"
        src="../assets/imges/imgs/home_ab_logo.png"
        alt="logo"
      />
      <div class="novel-header-sex">
          <router-link  @click="manclick"  class="man sex" tag="span" to="/man">男生</router-link>
          <router-link class="woman sex" @click="womanclick" tag="span" to="/">女生</router-link>
      </div>
      <div class="novel-header-person">
        <img @click="bookshelfPage" class="img" src="../assets/imges/bookshelfPage.png" />
        <img class="img" src="../assets/imges/imgs/bbs_icon_personal.png" />
      </div>
    </div>
    <div class="novel-header-search" @click="goSearchList">
      <van-search v-model="value" input-align="center" />
      <transition-group name="slider" tag="ul" class="hot-word">
        <li
          v-show="currentIndex === i"
          class="hot-text"
          v-for="(v, i) in hotbooks"
          :key="v+'_'+i"
        >
          {{ v.word }}
        </li>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sex: false,
      value: null,
      hotbooks: null,
      currentIndex: 0,
      show: true,
    };
  },
  created() {
    this.axios("http://novel.kele8.cn/hot-books").then((res) => {
      this.hotbooks = res.data.newHotWords;
    });
  },
  mounted() {
    this.$nextTick(() => {
      if (this.timer) {
        clearInterval(this.timer);
        this.currentIndex = 0;
      }
      this.timer = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.hotbooks.length;
      }, 3000);
    });
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    manclick() {
      this.sex = true;
    },
    womanclick() {
      this.sex = false;
    },
    goSearchList() {
      this.$router.push({
        name: "SearchPage",
        params: { hotbooks: this.hotbooks },
      });
    },
    bookshelfPage(){
      this.$router.push({
        name:"BookShelf"
      })
    }

  },
};
</script>
<style lang="scss" scope>
.novel-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 62px;
  width: 100vw;
  background-color: #b93321;

  .novel-header-logo {
    padding-left: 18px;
    width: 30vw;
  }

  .novel-header-sex {
    position: relative;
    overflow: hidden;
    border: 1px solid #fff;
    border-radius: 18px;
    width: 30vw;
    height: 36px;

    .sex {
      position: absolute;
      height: 100%;
      width: 50%;
      font-size: 16px;
      text-align: center;
      line-height: 34px;
      color: #000;
    }
    .man {
      left: 0;
    }
    .woman {
      right: 0;
    }

    .router-link-exact-active {
      color: #a4a4a4;
      background-color: #fff;
    }
  }

  .novel-header-person {
    .img {
      width: 8vw;
      margin-right: 10px;
    }
  }
}
.novel-header-search {
  position: relative;
  overflow: hidden;
  margin-bottom: 5px;
  height: 40px;


  .hot-text {
    position: absolute;
    left: 35%;
    top: 15px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    color: #a4a4a4;

    &.slider-enter {
      transform: translateY(-100%);
    }

    &.slider-enter-active,
    &.slider-leave-active {
      transition: all 0.5s linear;
    }

    &.slider-enter-to,
    &.slider-leave {
      transform: translateY(0);
    }

    &.slider-leave-to {
      transform: translateY(100%);
    }
  }
}
</style>