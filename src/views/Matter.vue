<template>
  <div class="box">
    <div
      class="matter"
      @click="masking"
      :style="{ 'background-color': background }"
      ref="matter"
    >
      <div class="w" ref="w">
        <div
          ref="contents"
          class="w-list"
          v-for="x in length - chapter + 1"
          :key="x"
        >
          <h2>第{{ parseInt(chapter) + x - 1 }}章</h2>
          <p
            :style="{ color: fontcolor, fontSize: fontSize }"
            v-for="(m, i) in bookcontents"
            :key="i"
          >
            {{ m.link }}
          </p>
        </div>
      </div>
    </div>
    <div class="mask" v-if="show">
      <div class="header">
        <div class="header-back" @click="BackClick(bookname)">
          <img
            class="header-go"
            src="../assets/imges/toolbar_back.png"
            alt="go"
          />
          <span class="header-text">返回</span>
        </div>
        <div class="header-search">{{ bookname }}</div>
        <div class="header-nav">
          <img class="img" src="../assets/imges/book_nav.png" />
          <div class="nav-list">
            <ul>
              <li @click="backhome">
                <img src="../assets/imges/list_home.png" />首页
              </li>
              <li><img src="../assets/imges/list_meun.png" />书架</li>
              <li @click="backdetails">
                <img src="../assets/imges/list_icon.png" />详情
              </li>
            </ul>
          </div>
        </div>
        <div class="header_foot">
          <div class="font_size">
            <span>Aa-</span>
            <div class="stroke">
              <van-slider
                v-model="value"
                @input="inputfrench"
                bar-height="4px"
                active-color="#ee0a24"
              />
            </div>
            <span>Aa+</span>
          </div>
          <div class="model">
            <span class="btn" @click="defaultstyle">默认</span>
            <span class="btn" @click="darkstyle">夜间</span>
            <span class="btn" @click="eyeshield">护眼</span>
          </div>
          <div class="skip">
            <span @click="prev" :class="{ active: currentIndex > 0 }"
              >上一章</span
            >
            <span style="color: #828281">目录</span>
            <span @click="next" class="active">下一章</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      value: 0,
      bookcontents: "",
      id: "",
      chapter: "",
      show: false,
      bookname: "",
      length: "",
      background: "",
      fontcolor: "",
      fontSize: 12,
      currentIndex: 0,
      showlist: true,
    };
  },
  created() {
    this.$http("/book/contents").then((res) => {
      this.bookcontents = res.data.data;
      this.chapter = this.$route.params.index;
      this.bookname = this.$route.params.bookname;
      this.length = this.$route.params.length;
      this.id = this.$route.params.id;
      console.log(this.$route);
    });
  },
  methods: {
    inputfrench() {
      if (this.value < 20) {
        this.fontSize = "14px";
      } else if (this.value < 40) {
        this.fontSize = "16px";
      } else if (this.value < 60) {
        this.fontSize = "18px";
      } else if (this.value < 80) {
        this.fontSize = "20px";
      } else if (this.value < 100) {
        this.fontSize = "22px";
      }
    },
    masking() {
      this.show = !this.show;
    },
    backhome() {
      this.$router.push({ name: "WoMan" });
    },
    defaultstyle() {
      this.background = "#eee6dd";
      this.fontcolor = "#5c5d58";
    },
    darkstyle() {
      this.background = "#0c0c0c";
      this.fontcolor = "#666666";
    },
    eyeshield() {
      this.background = "#b8cd8d";
      this.fontcolor = "#0c2e30";
    },
    BackClick(bookname) {
      this.$router.push({
        name: "BookDetails",
        params: { id: this.id, bookname },
      });
    },
    backdetails() {
      this.$router.push({
        name: "BookDetails",
        params: { id: this.id, bookname: this.bookname },
      });
    },
    next() {
      this.currentIndex++;
      this.showbookcontents.scrollToElement(
        this.$refs.contents[this.currentIndex],
        300
      );
    },
    prev() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.showbookcontents.scrollToElement(
          this.$refs.contents[this.currentIndex],
          300
        );
      }
    },
  },
  watch: {
    bookcontents(newShow, oldShow) {
      if (newShow !== oldShow && newShow) {
        this.$nextTick(() => {
          if (this.showbookcontents) {
            this.showbookcontents.refresh();
          } else {
            this.showbookcontents = new BScroll(this.$refs.matter, {
              click: true,
              bounce: false, // 不允许弹簧效果
            });
          }
        });
      }
    },
  },
  beforeDestory() {
    // BScroll不属于vue,他是一个有副作用的DOM操作,所以当前组件被卸载时请回收该实例
    if (this.showbookcontents) {
      this.showbookcontents.destroy();
    }

    if (this.showbookcontents) {
      this.showbookcontents.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
}

.matter {
  position: absolute;
  z-index: 10;
  overflow: hidden;
  height: 100vh;
  background-color: #eee6dd;

  .w {
    padding: 30px 22px;
    font-size: 22px;

    .w-list {
      margin-bottom: 22px;
    }

    h2 {
      margin-bottom: 25px;
    }

    p {
      font-size: 18px;
      text-indent: 2em;
      line-height: 32px;
      color: #5c5d58;
    }
  }
}

.mask {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.7);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 6vh;

    .header-go {
      display: inline-block;
      width: 10vw;
    }

    .header-text {
      margin-left: -10px;
      font-size: 14px;
      vertical-align: 10px;
      color: #f7f6f6;
    }

    .header-search {
      font-size: 14px;
      font-weight: 700;
      color: #f7f6f6;
    }

    .img {
      width: 4vw;
      margin-right: 18px;
    }
  }

  .nav-list {
    position: absolute;
    right: 6px;
    top: 8vh;
    background-color: rgba(0, 0, 0, 0.8);
    color: #f7f6f6;

    li {
      padding: 10px 20px;
      font-size: 14px;

      img {
        width: 8vw;
        padding-right: 15px;
      }
    }

    &:before {
      content: "";
      position: absolute;
      left: 65px;
      top: -12px;
      border: 6px solid;
      transform: translateX(-50%);
      color: #000;
      border-color: transparent transparent rgba(0, 0, 0, 0.8) transparent;
    }
  }

  .header_foot {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: rgba($color: #000000, $alpha: 0.8);
    color: #fff;

    .model {
      display: flex;
      justify-content: space-around;
      padding: 30px 5px;

      .btn {
        display: inline-block;
        padding: 8px 35px;
        font-size: 12px;
        border: 1px solid #fff;
        background-color: transparent;
      }
    }

    .font_size {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 30px 20px 0 20px;

      .stroke {
        width: 80%;
        margin: 0 10px;
      }
    }

    .skip {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      padding-bottom: 30px;
      font-size: 14px;
      color: #828281;

      .active {
        color: #fff;
      }
    }
  }
}
</style>