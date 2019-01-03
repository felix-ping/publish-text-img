<template>
  <div id="app">
    <div class="page">
      <header class="page-head">
        <div class="page-head-wrapper">
          <el-row class="cancle">
            <el-button  size="mini">取消</el-button>
          </el-row>
          <div class="title">{{title}}</div>
          <el-row class="publish">
            <el-button type="warning" size="mini">发布</el-button>
          </el-row>
        </div>
      </header>
      <section class="page_title">
        <el-input
          placeholder="请输入内容"
          v-model="titleMessage"
          clearable>
        </el-input>
      </section>
      <section class="page_content">
        <el-input
          type="textarea"
          :rows="24"
          placeholder="请输入内容"
          v-model="contenMessage">
        </el-input>
      </section>
      <footer class="page_input-bar">
        <div class="page_input-bar_wrapper">
          <div class="page_input-bar_wrapper_wrap">
            <el-input
              placeholder="请输入内容"
              v-model="inputMessage"
              clearable>
              </el-input>
          </div>
          <div class="insert-emoji"></div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      title:'发布内容',
      titleMessage:null,
      contenMessage:null,
      inputMessage:null,
    }
  },
  methods:{
    inputTitle(id){
      console.log(id)
    }
  }
}
</script>

<style>
  @import './components/css/main.css';
</style>
