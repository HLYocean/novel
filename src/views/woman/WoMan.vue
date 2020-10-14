<template>
    <div>
        <NovelHeader/>
        <div class="box" ref="w">
            <div>
                <van-swipe :autoplay="3000">
                    <van-swipe-item v-for="(image, index) in images" :key="index">
                        <img :data_Id="image.id" @click.stop="swipeClick(image.id,image.title)" class="swipe_img"
                             v-lazy="image.src"/>
                    </van-swipe-item>
                </van-swipe>
                <div class="nav">
            <span class="nav_item">
                <img src="../../assets/imges/nav_book.png">
                <span>书架</span>
            </span>
                    <span @click="bookRanking" class="nav_item">
                <img src="../../assets/imges/nav_rank.png">
                <span>排行</span>
            </span>
                    <span class="nav_item">
                <img src="../../assets/imges/nav_vip.png">
                <span>VIP</span>
            </span>
                    <span class="nav_item">
                <img src="../../assets/imges/nav_pay.png">
                <span>充值</span>
            </span>
                </div>
                <div class="banner" ref="banner">
                    <div class="banner_book_list">
                        <img
                                :key="index"
                                :src="`https://statics.zhuishushenqi.com${img.cover}`"
                                @click.stop="imgClick(img)"
                                class="banner-img"
                                v-for="(img, index) in bookList"
                        />
                    </div>
                </div>
                <div class="city_item">
                    <h2 class="city_title">都市小说</h2>
                    <BookListDetails :citylist="cityList"/>
                </div>
                <div class="city_item">
                    <h2 class="city_title">玄幻小说</h2>
                    <BookListDetails :citylist="magicList"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import NovelHeader from "../../components/NovelHeader";
    import BScroll from "better-scroll";
    import BookListDetails from '../../components/BookListDetails'

    export default {
        props: ["book"],
        data() {
            return {
                bookList: [],
                cityList: [],
                magicList: [],
                images: [
                    {
                        src: 'https://plf-new.zhuishushenqi.com/management/images/20200731/127cb019685a4683b90e1f8abcce1808.jpg',
                        id: '582f32b0f7e0d7252f482bd8',
                        title: '恶魔的独宠甜妻'
                    },
                    {
                        src: 'https://plf-new.zhuishushenqi.com/management/images/20200814/a5ec038eb5a1470fbfe8ced8b928a0a1.jpg',
                        id: '5c735e5bc8414654382308df',
                        title: '一胎俩宝，老婆大人别想逃'
                    },
                    {
                        src: 'https://plf-new.zhuishushenqi.com/management/images/20200821/5723b0dc9d9543d58c1ccce9a3417d8b.jpg',
                        id: '59007364d8fb1629519ac37d',
                        title: '吃货世子俏厨娘'
                    },
                    {
                        src: 'https://plf-new.zhuishushenqi.com/management/images/20200821/ee5d7ad15dc44954b69d12d484d7e1c6.jpg',
                        id: '5ae2ec1b20c88e36a16c72eb',
                        title: '重生九零，学霸小富妞'
                    }
                ],
            };
        },
        methods: {
            getBooks() {
                this.axios(
                    `http://novel.kele8.cn/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=6`
                ).then((res) => {
                    this.bookList = res.data.books;
                });
                this.axios("http://novel.kele8.cn/category-info?gender=male&type=hot&major=都市&minor=&start=0&limit=3")
                    .then((res) => {
                        this.cityList = res.data.books
                    });
                this.axios("http://novel.kele8.cn/category-info?gender=male&type=hot&major=玄幻&minor=&start=0&limit=3")
                    .then((res) => {
                        this.magicList = res.data.books;
                    })
            },
            swipeClick(id, title) {
                this.$router.push({
                    name: "BookDetails",
                    params: {id, bookname: title, arrBook: this.arrBook},
                });
            },
            imgClick({_id, title}) {
                this.swipeClick(_id, title)
            },
            bookRanking() {
                this.$router.push({
                    name: "BookRank"
                })

            }
        },
        created() {
            this.getBooks();
            this.$nextTick(() => {
                if (this.showbooklist) {
                    this.showbooklist.refresh();
                } else {
                    this.showbooklist = new BScroll(this.$refs.banner, {
                        startX: 0,
                        click: true,
                        scrollX: true,
                        scrollY: false,
                    });
                }
            });
        },
        watch: {
            magicList(newShow, oldShow) {
                if (newShow !== oldShow && newShow) {
                    this.$nextTick(() => {
                        if (this.showw) {
                            this.showw.refresh();
                        } else {
                            this.showw = new BScroll(this.$refs.w, {
                                click: false,
                                scrollX: false,
                                scrollY: true,
                                preventDefault: false
                            });
                        }
                    });
                }
            },
        },
        beforeDestory() {
            // BScroll不属于vue,他是一个有副作用的DOM操作,所以当前组件被卸载时请回收该实例
            if (this.showbooklist) {
                this.showbooklist.destroy();
            }
            if (this.showw) {
                this.showw.destroy();
            }
        },
        components: {
            NovelHeader,
            BookListDetails
        },
    };
</script>
<style lang="scss" scoped>
    .box {
        overflow: hidden;
        height: 84vh;
    }

    .swipe_img {
        margin: 0 2vw;
        width: 96vw;
        height: 150px;
        border-radius: 10px;
        background-color: #fff;
    }

    .nav {
        display: flex;
        justify-content: space-between;
        padding: 15px 33px;
        border-bottom: 1px solid #e1e1e1;
        width: 100vw;

        .nav_item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            img {
                margin-bottom: 10px;
                width: 46px;
            }

            span {
                display: inline-block;
                font-size: 14px;
            }

        }
    }

    .banner {
        overflow: hidden;
        width: 100vw;

        .banner_book_list {
            height: 120px;
            width: 570px;

            .banner-img {
                display: inline-block;
                border-radius: 10px;
                margin: 10px;
                width: 20vw;
                height: 100px;
            }
        }
    }

    .city_item {
        padding: 5px 0;
        border-top: 15px solid #f4f4f4;

        .city_title {
            margin: 16px 0;
            font-size: 14px;
            font-weight: 700;
            text-indent: 14px;
            border-left: 2px solid #b93321;
        }
    }
</style>