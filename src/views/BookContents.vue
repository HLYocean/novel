<template>
  <div>
    <div class="novel-header">
      <div class="novel-header-back" @click="BackClick(bookname)">
        <img
          class="novel-header-go"
          src="../assets/imges/toolbar_back.png"
          alt="go"
        />
        <span class="novel-header-text">返回</span>
      </div>
      <div class="novel-header-search">{{ bookname }}</div>
      <div class="novel-header-person">
        <img
          @click="backhome"
          class="img"
          src="../assets/imges/header-home.png"
        />
      </div>
    </div>
    <div class="novel-text">
      <div class="novel-title">
        <span class="novel-catalogue">
          目录
          <i>共{{ bookdetails.length }}章</i>
        </span>
        <span @click="reverse">倒序</span>
      </div>
      <div class="novel-list" ref="novellist">
        <ul>
          <li
            class="novel-text-list"
            v-for="(nov, i) in bookdetails"
            :key="i"
            ref="novelmatter"
          >
            <router-link
              tag="span"
              :to="
                '/matter/' +
                id +
                '/' +
                bookname +
                '/' +
                bookdetails.length +
                '/' +
                nov.title.substr(1).substring(0, nov.title.length - 2)
              "
              >{{ nov.title.substr(1).substring(0, nov.title.length - 2) }}
              {{ nov.title }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: ["id", "bookname"],
  data() {
    return {
      bookdetails: "",
    };
  },
  created() {
    this.getbookdetails();
  },
  methods: {
    getbookdetails() {
      this.$http("/book/details").then((res) => {
        this.bookdetails = res.data.data.chapters;
      });
    },
    BackClick() {
      this.$router.push({
        name: "BookDetails",
        params: { id: this.id, bookname: this.bookname },
      });
    },
    reverse() {
      this.bookdetails = this.bookdetails.reverse();
    },
    backhome() {
      this.$router.push({ name: "NovelHeader" });
    },
  },
  watch: {
    bookdetails(newShow, oldShow) {
      if (newShow !== oldShow && newShow) {
        this.$nextTick(() => {
          if (this.showbookdetails) {
            this.showbookdetails.refresh();
          } else {
            this.showbookdetails = new BScroll(this.$refs.novellist, {
              click: true,
              bounce: false, // 不允许弹簧效果
            });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.novel-header {
  position: relative;
  height: 8vh;
  width: 100vw;
  background-color: #b93321;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .novel-header-go {
    display: inline-block;
    width: 40px;
  }

  .novel-header-text {
    margin-left: -11px;
    font-size: 14px;
    vertical-align: 11px;
    color: #fff;
  }
  .novel-header-search {
    font-size: 14px;
    font-weight: 700;
    line-height: 40px;
    color: #fff;
  }

  .novel-header-person {
    .img {
      width: 7vw;
    }
  }
}

.novel-text {
  margin: 16px 20px;

  .novel-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid #f8f8f8;
    // #f8f8f8
    font-size: 14px;

    i {
      font-size: 12px;
      color: #999;
    }
  }
}
.novel-list {
  overflow: hidden;
  width: 100%;
  height: 82vh;

  .novel-text-list {
    padding: 20px 0;
    font-size: 12px;
    color: #999;
  }
}
</style>