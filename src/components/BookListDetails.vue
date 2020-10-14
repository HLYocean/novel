<template>
    <div class="book_list">
        <ul>
            <li @click="bookClick(book)" class="book_list_details" :key="i" v-for="(book,i) in citylist">
                <img :src="`https://statics.zhuishushenqi.com${book.cover}`"/>
                <div class="book-list-content">
                    <h2>{{book.title}} <span class="book_list_icon" :class="{active:book.allowMonthly}">{{book.allowMonthly?"完结":"连载"}}</span>
                    </h2>
                    <span class="book-list-shortIntro">{{book.shortIntro}}</span>
                    <span class="info">{{book.minorCate}}</span>
                    |
                    <span class="info-color info">{{book.latelyFollower}}</span>人气
                    <span class="majorCate">{{book.majorCate}}</span>
                </div>
            </li>
        </ul>
        <div @click="bookDetails(citylist[0].majorCate)" class="more">
            查看更多 >
        </div>
    </div>
</template>

<script>
    export default {
        props: ["citylist"],
        methods:{
            bookClick(m) {
                this.$router.push({
                    name: "BookDetails",
                    params: {id: m._id, bookname: m.title},
                    query: {
                        keyword: m.title,
                    },
                });
            },
            bookDetails(bookname){
                this.$router.push({
                    name: "SearchBookList",
                    params: { bookname },
                });
            }

        }
    }
</script>

<style lang="scss" scoped>
    .book_list_details {
        display: flex;
        height: 96px;

        &:last-child .book-list-content{
            border: none;
        }

        img {
            margin-left: 10px;
            width: 64px;
            height: 85px;
        }

        .book-list-content {
            position: relative;
            margin: 14px;
            margin-bottom: 5px;
            margin-top: 2px;
            border-bottom: 1px solid #dddddd;
            width: 100%;
            font-size: 12px;
            line-height: 22px;
            color: #a0a2a4;




            h2 {
                font-size: 14px;
                color: #000;
            }

            .book_list_icon {
                padding: 1px;
                font-size: 10px;
                color: #fff;
                border-radius: 4px;
                background-color: #008000;
            }

            .active {
                background-color: #b93385;
            }


            .book-list-shortIntro {
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                font-size: 12px;
                color: #a0a2a4;
            }

            .info {
                font-size: 12px;
                color: #a0a2a4;
            }

            .info-color {
                color: #c93321;
            }

            .majorCate {
                position: absolute;
                right: 0;
                bottom: 3px;
                font-size: 10px;
                line-height: 12px;
                border: 1px solid #ff8400;
                color: #ff8400;
                background-color: #fff;
            }
        }

    }

    .more{
        padding: 10px 0;
        margin: 0 10px;
        border-top: 1px solid #dddddd;
        font-size: 14px;
        text-align: center;
        color: #b83320;
    }

</style>