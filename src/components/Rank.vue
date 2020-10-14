<template>
    <div class="box">
        <div class="borderTop"></div>
        <div class="list">
            <div>
                <van-sidebar v-model="activeKey">
                    <van-sidebar-item @click="indexClick" title="畅销榜"/>
                    <van-sidebar-item @click="indexClick" title="最热榜"/>
                    <van-sidebar-item @click="indexClick" title="潜力榜"/>
                    <van-sidebar-item @click="indexClick" title="免费榜"/>
                    <van-sidebar-item @click="indexClick" title="热搜榜"/>
                    <van-sidebar-item @click="indexClick" title="完结榜"/>
                    <van-sidebar-item @click="indexClick" title="好评榜"/>
                    <van-sidebar-item @click="indexClick" title="VIP榜"/>
                    <van-sidebar-item @click="indexClick" title="留存榜"/>
                </van-sidebar>
            </div>
            <div class="nav_list_text" ref="RankBook">
                <div class="w">
                    <ul v-show="currentIndex===0">
                        <li
                                class="book-list"
                                v-for="(book,i) in salableRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate" v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===1">
                        <li
                                class="book-list"
                                v-for="(book,i) in hotRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===2">
                        <li
                                class="book-list"
                                v-for="(book,i) in potentialRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===3">
                        <li
                                class="book-list"
                                v-for="(book,i) in freeRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===4">
                        <li
                                class="book-list"
                                v-for="(book,i) in hotSearchRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===5">
                        <li
                                class="book-list"
                                v-for="(book,i) in endRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===6">
                        <li
                                class="book-list"
                                v-for="(book,i) in favourableRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===7">
                        <li
                                class="book-list"
                                v-for="(book,i) in vipRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                    <ul v-show="currentIndex===8">
                        <li
                                class="book-list"
                                v-for="(book,i) in remainRankBook"
                                :key="i"
                                @click="BookDetails(book.title,book._id)"
                        >
                            <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                            <div class="book-list-content">
                                <h2>{{i+1}}.{{book.title}}</h2>
                                <p class="book-list-shortIntro">{{book.shortIntro}}</p>
                                <div class="book-list-information">
                                    <span class="info-color">{{book.author}}</span>
                                    <span class="info-color minorCate"  v-if="book.minorCate">{{book.minorCate}}</span>
                                </div>
                            </div>
                        </li>
                        <div class="book-list-footer">没有更多书籍</div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                salableRankBook: {},
                hotRankBook: {},
                potentialRankBook: {},
                freeRankBook:{},
                hotSearchRankBook:{},
                favourableRankBook:{},
                vipRankBook:{},
                endRankBook:{},
                remainRankBook:{},
                activeKey: '',
                currentIndex: 0
            }
        },
        methods: {
            indexClick(i) {
                this.currentIndex = i;
            },
            BookDetails(book, id) {
                this.$router.push({
                    name: "BookDetails",
                    params: { id, bookname: book },
                    query: {
                        keyword: '排行',
                    },
                });
            },
            initBScroll() {
                this.$nextTick(() => {
                    if (this.booklist) {
                        this.booklist.refresh();
                        this.booklist.scrollTo(0, 0);
                    } else {
                        this.booklist = new BScroll(this.$refs.RankBook, {
                            click: true,
                            bounce: false,
                        });
                    }
                });
            }
        },
        mounted() {
            //畅销榜
            // http://api.zhuishushenqi.com/ranking/5a39d435fc84c2b8ef884798
            fetch('/ranking/5a39d435fc84c2b8ef884798').then(res => res.json()).then(({ranking}) => {
                this.salableRankBook = ranking.books
            });
            // 最热榜
            // http://api.zhuishushenqi.com/ranking/54d43437d47d13ff21cad58b
            fetch('/ranking/54d43437d47d13ff21cad58b').then(res => res.json()).then(({ranking}) => {
                this.hotRankBook = ranking.books
            });
            // 潜力榜
            // http://api.zhuishushenqi.com/ranking/54d43709fd6ec9ae04184aa5
            fetch('/ranking/54d43709fd6ec9ae04184aa5').then(res => res.json()).then(({ranking}) => {
                this.potentialRankBook = ranking.books
            });
            // 免费榜
            // http://api.zhuishushenqi.com/ranking/5a39ca7dfc84c2b8ef82ff4f
            fetch('/ranking/5a39ca7dfc84c2b8ef82ff4f').then(res => res.json()).then(({ranking}) => {
                this.freeRankBook = ranking.books
            });
            // 热搜榜
            // http://api.zhuishushenqi.com/ranking/5a6844f8fc84c2b8efaa8bc5
            fetch('/ranking/5a6844f8fc84c2b8efaa8bc5').then(res => res.json()).then(({ranking}) => {
                this.hotSearchRankBook = ranking.books
            });
            // 完结榜
            // http://api.zhuishushenqi.com/ranking/5a39ca59fc84c2b8ef82e96c
            fetch('/ranking/5a39ca59fc84c2b8ef82e96c').then(res => res.json()).then(({ranking}) => {
                this.endRankBook = ranking.books
            });
            // 好评榜
            // http://api.zhuishushenqi.com/ranking/5a684551fc84c2b8efaab179
            fetch('/ranking/5a684551fc84c2b8efaab179').then(res => res.json()).then(({ranking}) => {
                this.favourableRankBook = ranking.books
            });
            // vip榜
            // http://api.zhuishushenqi.com/ranking/5a683b68fc84c2b8efa68fc2
            fetch('/ranking/5a683b68fc84c2b8efa68fc2').then(res => res.json()).then(({ranking}) => {
                this.vipRankBook = ranking.books
            });
            // 留存榜
            // http://api.zhuishushenqi.com/ranking/5645482405b052fe70aeb1b5
            fetch('/ranking/5645482405b052fe70aeb1b5').then(res => res.json()).then(({ranking}) => {
                this.remainRankBook = ranking.books
            });
        },
        watch: {
            currentIndex(newShow, oldShow) {
                if (newShow !== oldShow && newShow) {
                    this.initBScroll();
                }
                if(this.currentIndex===0){
                    this.salableRankBook= [...this.salableRankBook,""];
                    this.salableRankBook.pop();
                }
            },
            salableRankBook(newShow, oldShow) {
                if (newShow !== oldShow && newShow) {
                    this.initBScroll();
                }
            },
        },
        beforeDestory() {
            // BScroll不属于vue,他是一个有副作用的DOM操作,所以当前组件被卸载时请回收该实例
            if (this.booklist) {
                this.booklist.destroy();
            }
        },
    }
</script>

<style lang="scss" scoped>
    $borderBottom: #ececec;
    $fontcolorTheme: #9a9a9e;

    .box {
        width: 100vw;

        .borderTop {
            margin: 0 10px;
            border-top: 1px solid $borderBottom;
        }

        .nav_list_text {
            height: 85vh;
            overflow: hidden;
        }

        .list {
            display: flex;
            justify-content: space-between;

            .book-list {
                overflow: hidden;
                display: flex;
                padding: 20px 0;
                height: 110px;

                img {
                    margin-right: 10px;
                    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
                    width: 60px;
                    height: 80px;
                }

                h2 {
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 54vw;
                    font-size: 16px;
                    padding-bottom: 5px;
                }

                .book-list-shortIntro {
                    display: -webkit-box;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    width: 54vw;
                    font-size: 12px;
                    line-height: 20px;
                    color: #919191;
                }

                .book-list-information {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 6px;
                    width: 57vw;

                    .info-color {
                        padding: 4px 8px;
                        font-size: 12px;
                        color: $fontcolorTheme;
                    }

                    .minorCate {
                        display: inline-block;
                        margin-right: 10px;
                        padding: 4px 8px;
                        border-radius: 10px;
                        color: #868687;
                        background-color: #efeff4;
                    }

                }

            }
            .book-list-footer {
                padding: 20px;
                font-size: 14px;
                text-align: center;
                color: $fontcolorTheme;
            }
        }


        .van-sidebar-item {
            line-height: 23px;
        }

    }
</style>