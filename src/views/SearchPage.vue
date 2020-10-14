<template>
  <div>
    <div class="novel-header">
      <div class="novel-header-back" @click="BackClick">
        <img class="novel-header-go" src="../assets/imges/toolbar_back.png" alt="go" />
        <span class="novel-header-text">返回</span>
      </div>
      <div class="novel-header-search">搜索</div>
      <div class="novel-header-person">
        <img class="img" src="../assets/imges/bookshelfPage.png" />
        <img @click="backhome" class="img" src="../assets/imges/header-home.png" />
      </div>
    </div>
    <van-search
      class="hot-search"
      v-model.trim="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    <div class="hot-recommendation">
      <div class="hot-recommendation-top">
        <h2 class="top-text">热门推荐</h2>
        <span class="top-fresh" @click="FreshClick">
          换一换
          <img src="../assets/imges/imgs/flax_reader_def_shuaxin_20_20.png" alt="刷新" />
        </span>
      </div>
      <div class="hot-list" :style="{'padding-right':paddingRight+'px'}">
        <ul>
          <li
            class="hot-list-book"
            v-for="(item ,i) in hotbooks"
            :key="i"
            @click="hotbookclick(item.word)"
          >{{item.word}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.axios("http://novel.kele8.cn/hot-books").then((res) => {
      this.hotbooks = res.data.newHotWords;
    });
  },
  data() {
    return {
      hotbooks: null,
      value: "",
      paddingRight: 10,
    };
  },
  methods: {
    onSearch() {
      this.hotbookclick(this.value);
    },

    BackClick() {
      this.$router.push({ name: "WoMan" });
    },
    hotbookclick(bookname) {
      this.$router.push({
        name: "SearchBookList",
        params: { bookname },
      });
    },
    FreshClick() {
      this.paddingRight = parseInt(Math.random() * (80 - 10)) + 10;
      if(this.hotbooks.length>1){
        for(let i = 0,len = this.hotbooks.length; i < len; i++){
          let currentRandom = parseInt(Math.random() * (len - 1));
          let current = this.hotbooks[i];
          this.hotbooks[i] = this.hotbooks[currentRandom];
          this.hotbooks[currentRandom] = current;
        }
        return this.hotbooks;
      }
    },
    backhome() {
      this.$router.push({ name: "WoMan" });
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

.hot-search {
  .van-search__action {
    color: #7c7c7c;
  }
}

.hot-recommendation-top {
  padding: 20px 15px;

  .top-text {
    display: inline-block;
    font-size: 22px;
    color: #7c7c7c;
  }

  .top-fresh {
    float: right;
    font-size: 12px;
    line-height: 22px;
    color: #959599;

    img {
      width: 14px;
      vertical-align: middle;
    }
  }
}

.hot-list {
  padding: 0 10px;

  .hot-list-book {
    float: left;
    padding: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 15px;
    font-size: 12px;
    color: #9b9ba3;
    background-color: #efeff4;
  }
}
</style>