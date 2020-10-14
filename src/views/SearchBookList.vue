<template>
  <div class="header">
    <div class="novel-header">
      <div class="novel-header-back" @click="BackClick">
        <img class="novel-header-go" src="../assets/imges/toolbar_back.png" alt="go" />
        <span class="novel-header-text">返回</span>
      </div>
      <div class="novel-header-search">{{bookname}}</div>
      <div class="novel-header-person">
        <img class="img" src="../assets/imges/bookshelfPage.png" />
        <img @click="backhome" class="img" src="../assets/imges/header-home.png" />
      </div>
    </div>
    <div class="novel-books-list" ref="wrapper">
      <ul>
        <li
          class="book-list"
          v-for="(book,i) in booklist"
          :key="i"
          @click="BookDetails(book.title,book._id)"
        >
          <img :src="`https://statics.zhuishushenqi.com${book.cover}`" />
          <div class="book-list-content">
            <h2>{{book.title}}</h2>
            <div class="book-list-author">{{book.author}} | {{book.cat}}</div>
            <p class="book-list-shortIntro">{{book.shortIntro}}</p>
            <div class="book-list-information">
              <span class="info-color">{{book.latelyFollower}}</span>人气 |
              <span class="info-color">{{book.retentionRatio}}%</span>读者留存
            </div>
          </div>
        </li>
        <div class="book-list-footer">没有更多书籍</div>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    bookname: {
      type: String,
    },
  },
  data() {
    return {
      booklist: null,
    };
  },
  methods: {
    BackClick() {
      this.$router.push({ name: "SearchPage" });
    },
    BookDetails(book, id) {
      // http://novel.kele8.cn/book-info/53115e30173bfacb4904897e
      this.$router.push({
        name: "BookDetails",
        params: { id, bookname: this.bookname },
        query: {
          keyword: book,
        },
      });
    },
    backhome() {
      this.$router.push({ name: "NovelHeader" });
    },
  },
  beforeRouteEnter(to, from, next) {
    // http://novel.kele8.cn/search?keyword=斗罗大陆
    next((vm) => {
      vm.axios(`http://novel.kele8.cn/search?keyword=${vm.bookname}`).then(
        (res) => {
          vm.booklist = res.data.books;
        }
      );
    });
  },
  watch: {
    booklist(newShow, oldShow) {
      if (newShow !== oldShow && newShow) {
        this.$nextTick(() => {
          if (this.shopbooklist) {
            this.shopbooklist.refresh();
          } else {
            this.shopbooklist = new BScroll(this.$refs.wrapper, {
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
    if (this.shopbooklist) {
      this.shopbooklist.destroy();
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 100vh;
}

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
    font-size: 12px;
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
      width: 8vw;
    }
  }
}

.novel-books-list {
  overflow: hidden;
  width: 100vw;
  height: 92vh;
  padding: 17px;
  background-color: #f5f2ed;

  .book-list {
    display: flex;
    justify-content: space-between;
    padding: 17px 0;
    border-bottom: 1px solid #dddddd;

    img {
      width: 60px;
    }

    .book-list-content {
      width: 90%;
      padding-left: 17px;
      padding-right: 17px;

      h2 {
        font-size: 14px;
        margin: 8px 0;
      }

      .book-list-author,
      .book-list-shortIntro {
        overflow: hidden;
        margin: 8px 0;
        width: 100%;
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #999999;
      }
    }

    .book-list-information {
      font-size: 12px;
      color: #666666;

      .info-color {
        color: #b93321;
      }
    }
  }

  .book-list-footer {
    padding: 20px;
    font-size: 12px;
    text-align: center;
    color: #999999;
  }
}
</style>