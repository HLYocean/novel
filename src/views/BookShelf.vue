<template>
    <div>
        <div class="novel-header">
            <div class="novel-header-back" @click="BackClick">
                <img class="novel-header-go" src="../assets/imges/toolbar_back.png" alt="go"/>
                <span class="novel-header-text">返回</span>
            </div>
            <div class="novel-header-search">我的书架</div>
            <div class="novel-header-person">
                <img class="img" src="../assets/imges/bookshelfPage.png"/>
                <img @click="backHome" class="img" src="../assets/imges/header-home.png"/>
            </div>
        </div>
        <van-tabs v-model="active">
            <van-tab title="我的书架">
                <ul class="box">
                    <li class="book_shelf" v-for="book in arr">
                        <img @click="toBookContent(book)" class="bookimg" :src="book.img"/>
                        <div @click="toBookContent(book)"  class="text">
                            <h2>{{book.bookname}}</h2>
                            <span>阅读到第一章</span>
                        </div>
                        <img @click="tobookdetail(book)" class="toBookDetail" src="../assets/imges/toBookDetail.png"/>
                    </li>
                </ul>
            </van-tab>
            <van-tab title="阅读历史">内容 2</van-tab>
        </van-tabs>
    </div>
</template>

<script>
    export default {
        computed: {
            arr() {
                let arr = [];
                let obj = {};
                this.arrBook.map((book) => {
                    if (obj[book.id] === undefined) {
                        obj[book.id] = 1;
                        arr.push(book);
                    }
                });
                this.arrBook = arr;
                return this.arrBook;
            }
        },
        data() {
            return {
                active: "",
            }
        },
        methods: {
            BackClick() {
                this.$router.push({name: "WoMan"});
            },
            backHome() {
                this.$router.push({name: "WoMan"});
            },
            tobookdetail(m) {
                this.$router.push({
                    name: "BookDetails",
                    params: {id: m.id, bookname: m.bookname},
                    query:{
                        keyword: "书架",
                    }
                });
            },
            toBookContent(m){
                this.$router.push({
                    name: "BookContents",
                    params: {id: m.id, bookname: m.bookname},
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .novel-header {
        position: relative;
        height: 7vh;
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

    .box {
        padding: 0 20px;

        .book_shelf {
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 15px;
            border-bottom: 1px solid #c6c6c6;

            .bookimg {
                width: 60px;
            }

            .text {
                width: 60%;
                height: 75px;

                h2 {
                    font-weight: 700;
                    font-size: 18px;
                }

                span {
                    font-size: 12px;
                    line-height: 30px;
                    color: #a59f9a;
                }
            }

            .toBookDetail {
                width: 30px;
                height: 30px;
            }

        }

    }


</style>