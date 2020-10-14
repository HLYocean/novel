<template>
  <div id="app">
    <router-link to="/man" />
    <router-link to="/" />
    <router-view  />
  </div>
</template>
<script>
export default {
  data() {
    return {
      arrBook: [1,2],
    };
  },
  computed:{
      add(arr){
        this.arrBook=arr;
      }

  },
  created() {
    this.getbooks();
  },
  methods: {
    getbooks() {
      this.axios("http://novel.kele8.cn/hot-books").then((res) => {
        this.book = res.data.hotWords;
      });
    },
  },
};
</script>
