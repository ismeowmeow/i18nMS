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
    <nuxt-content :document="page"/>
  </div>
</template>

<script>
import env from '../env.js'
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
  async asyncData({app, $axios, $content}){
    const page = await $content('hello').fetch()
    
    return {
      page
    }
  },
  watchQuery: ['title'],
  methods: {
    handleClick() {
      this.a += 1
      this.title += 1
    },
    async handleChangeLanguage(lang) {
      this.$i18n.locale = lang

      const res = await this.$api.testapi()
      console.log('res:', res)
    }
  }
}
</script>