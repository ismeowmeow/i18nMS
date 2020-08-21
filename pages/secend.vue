<template>
  <div>
    <div>
    我是第二个页面
    </div>
    <nuxt-link :to="{name: 'first'}">跳啊跳啊</nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  layout: 'new',
  data() {
    return {
      a: 1,
      title: 1
    }
  },
  head() {
    return {
      title: this.title,
      }    
  },
  asyncData(context){
    // console.log('执行asyncData')
    // return {
    //   a: '我不是一个变量了'
    // }
    // console.log('因为监听，所以我变化了2')
    return {}
  },
  watchQuery: ['title'],
  methods: {
    handleClick() {
      this.a += 1
      this.title += 1
      this.$route.path('secend')
    }
  }
}
</script>