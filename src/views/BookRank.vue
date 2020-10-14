<template>
    <div>
        <div class="novel-header">
            <div class="novel-header-back" @click="BackClick">
                <img class="novel-header-go" src="../assets/imges/toolbar_back.png" alt="go"/>
                <span class="novel-header-text">返回</span>
            </div>
            <div class="novel-header-search">排行榜</div>
            <div class="novel-header-person">
                <img class="img" src="../assets/imges/bookshelfPage.png"/>
                <img @click="backHome" class="img" src="../assets/imges/header-home.png"/>
            </div>
        </div>
        <van-tabs v-model="activeName" title-active-color="#b93321">
            <van-tab  title="女频" name="a" >
                <Rank/>
            </van-tab>
            <van-tab title="出版" name="b" ></van-tab>
            <van-tab title="男频" name="c" ></van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import Rank from '../components/Rank'
    export default {
        data(){
            return {
                activeName:''
            }
        },
        methods: {
            BackClick() {
                this.$router.push({name: "WoMan"});
            },
            backHome() {
                this.$router.push({name: "WoMan"});
            },
        },
        components:{
            Rank
        }

    }
</script>

<style lang="scss" scoped>
    $fontcolorTheme : #9a9a9e;
    $borderBottom   : #ececec;

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
</style>