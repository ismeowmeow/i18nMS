<template>
  <div>
    <div>窝窝头，一块钱四个，嘿嘿</div>
    <el-divider></el-divider>
    <div>这是一个变量：{{a}}</div>
    <el-button @click="handleClick">+1</el-button>
    <el-divider></el-divider>
    <nuxt-link :to="{name: 'secend'}">跳啊跳啊</nuxt-link>
    <el-divider></el-divider>
    <el-button @click="handleChangeLanguage('zh')">zh</el-button>
    <el-button @click="handleChangeLanguage('en')">en</el-button>
    <el-button @click="handleChangeLanguage('th')">th</el-button>
    {{$t('test.test')}}
    <el-divider></el-divider>
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
    // console.log('因为监听，所以我变化了1')
    return {}
  },
  watchQuery: ['title'],
  methods: {
    handleClick() {
      this.a += 1
      this.title += 1
    },
    handleChangeLanguage(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>