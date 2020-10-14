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
                <img @click="toBookShelf" class="img" src="../assets/imges/bookshelfPage.png"/>
                <img
                        @click="backhome"
                        class="img"
                        src="../assets/imges/header-home.png"
                />
            </div>
        </div>
        <div class="novel-title">
            <div class="top">
                <img
                        class="novel-cover"
                        :src="`https://statics.zhuishushenqi.com${bookdetail.cover}`"
                />
                <div class="text">
                    <h2>{{ bookdetail.title }}</h2>
                    <p class="text-detail">
                        <span class="author">{{ bookdetail.author }}</span>
                        | {{ bookdetail.minorCate }} |
                        {{
                        bookdetail.wordCount > 1000
                        ? Math.floor(bookdetail.wordCount / 10000) + "万"
                        : bookdetail.wordCount
                        }}字
                    </p>
                    <p class="time">最近一次更新时间{{ time }}</p>
                </div>
            </div>
            <span @click="addBookShelf" class="add-book btn">加入书架</span>
            <router-link class="read-book btn" tag="span" :to="'/matter/'+id+'/'+bookname+'/123/1'">开始阅读</router-link>
        </div>
        <div class="novel-popular">
      <span class="popular survey">
        追人气
        <br/>
        <span class="text-black">{{
          bookdetail.latelyFollower > 10000
            ? (bookdetail.latelyFollower / 10000).toFixed(1) + "万"
            : bookdetail.latelyFollower
        }}</span>
      </span>
            <span class="reader survey">
        读者留存率
        <br/>
        <span class="text-black">{{ bookdetail.retentionRatio }}%</span>
      </span>
            <span class="dayupdated survey">
        日更字数/天
        <br/>
        <span class="day">{{ bookdetail.serializeWordCount }}</span>
      </span>
        </div>
        <div class="novel-longIntro" :style="{ display: dispaly }">
            {{ bookdetail.longIntro }}
            <img
                    class="down"
                    @click="textdown"
                    src="../assets/imges/imgs/rank_arrow_down.png"
            />
        </div>
        <div class="novel-contents">
            <h3>目录</h3>
            <span>{{ bookdetail.lastChapter }}</span>
            <img
                    class="right-cotents"
                    src="../assets/imges/imgs/community_more_icon.png"
                    @click="rightcotents"
            />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: null,
                bookname: null,
                book: null,
                bookdetail: {},
                time: String,
                dispaly: "-webkit-box",
                value: 2.5,
            };
        },
        methods: {
            toBookShelf(){
                this.$router.push({
                    name: "BookShelf",
                });
            },
            BackClick() {
                if (this.$route.query) {
                    if (this.$route.query.keyword === "排行") {
                        this.$router.push({
                            name: "BookRank",
                        });
                        return;
                    }else if(this.$route.query.keyword === "书架"){
                        this.$router.push({
                            name: "BookShelf",
                        });
                        return;
                    }

                    this.backhome();
                    return;
                }

                this.$router.push({
                    name: "SearchBookList",
                    params: {bookname: this.bookname},
                });
            },
            textdown() {
                if (this.dispaly === "-webkit-box") {
                    this.dispaly = "block";
                } else {
                    this.dispaly = "-webkit-box";
                }
            },
            rightcotents() {
                this.$router.push({
                    name: "BookContents",
                    params: {id: this.id, bookname: this.bookname},
                });
            },
            backhome() {
                this.$router.push({name: "WoMan", params: {arr: this.arr}});
            },
            addBookShelf() {
                this.arrBook.push({id: this.id, bookname: this.bookname,img:`https://statics.zhuishushenqi.com${this.bookdetail.cover}`});
            }
        },
        created() {
            // http://novel.kele8.cn/book-info/53115e30173bfacb4904897e
            this.id = this.$route.params.id;
            this.bookname = this.$route.params.bookname;
            this.book = this.$route.query.keyword;
            this.axios(`http://novel.kele8.cn/book-info/${this.id}`).then((res) => {
                this.bookdetail = res.data;
                this.time = this.bookdetail.updated.slice(0, 10);
            });
        }
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

    .novel-title {
        padding: 20px;
        border-bottom: 1px solid #efefef;

        .top {
            display: flex;

            .novel-cover {
                width: 60px;
            }

            .text {
                padding-left: 14px;
            }

            .time {
                font-size: 12px;
                color: #999;
            }

            h2 {
                font-size: 14px;
            }

            .text-detail {
                padding: 12px 0;
                font-size: 12px;
                color: #999;
            }

            .author {
                color: #b93321;
            }
        }

        .btn {
            display: inline-block;
            margin: 10px;
            padding: 16px 42px;
            border: 1px solid #b93321;
            font-size: 14px;
            color: #b93321;

            &.read-book {
                color: #fff;
                background-color: #b93321;
            }
        }
    }

    .novel-popular {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22px 42px;
        font-size: 12px;
        text-align: left;
        color: #999;
        border-bottom: 1px solid #efefef;

        .survey {
            text-align: center;

            .text-black {
                display: inline-block;
                margin-top: 14px;
                font-size: 14px;
                color: #000;
            }

            .day {
                display: inline-block;
                margin-top: 14px;
            }
        }
    }

    .novel-longIntro {
        position: relative;
        display: -webkit-box;
        overflow: hidden;
        margin: 22px;
        font-size: 14px;
        line-height: 25px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;

        .down {
            position: absolute;
            right: 0;
            bottom: -6px;
            width: 23px;
        }
    }

    .novel-contents {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 22px;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
        font-size: 12px;
        color: #999;

        h3 {
            font-size: 14px;
            color: #000;
        }

        span {
            overflow: hidden;
            width: 70%;
            text-align: right;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .right-cotents {
            width: 6px;
        }
    }
</style>