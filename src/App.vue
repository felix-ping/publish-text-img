<template>
  <div id="app">
    <div class="page">
      <header class="page-head">
        <div class="page-head-wrapper">
          <el-row class="cancle">
            <el-button size="mini">取消</el-button>
          </el-row>
          <div class="title">{{title}}</div>
          <el-row class="publish">
            <el-button type="warning" size="mini">发布</el-button>
          </el-row>
        </div>
      </header>
      <section class="page_title" @click='listenTouch(1)' @touch='listenTouch(1)'>
        <el-input
          placeholder="请输入内容"
          v-model="titleMessage"
          clearable
        ></el-input>
      </section>

      <section class="page_content" @click='listenTouch(2)' @touch='listenTouch(1)'>
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          v-model="contenMessage"
          class="preview"
        ></el-input>
      </section>



<el-upload
  class="upload-demo"
  action="#"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList2"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>


      <footer class="page_input-bar"  >
        <div class="page_input-bar_wrapper">
          <div class="page_input-bar_wrapper_wrap">
            <el-input
              placeholder="请输入内容"
              v-model="inputMessage"
              clearable
              autofocus
            ></el-input>
          </div>
          <div class="insert-emoji"></div>
          <div class="insert-img" ></div>
          <button @click="confirm">confirm</button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

import { uploadImgToBase64 } from './utils' 
export default {
  name: 'App',
  data: function () {
    return {
      title: '发布内容',
      titleMessage: '',
      contenMessage: '',
      inputMessage: '',
      listenMsg: 1,
      show3: true,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList2: [{name: 'food.jpeg', 
      url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
       {name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
    }
  },
  created(){
  },
  methods: {
    listenTouch:function (e) {
      this.listenMsg = e
      console.log()
    },
    confirm(){
      if (this.listenMsg === 1) {
        this.titleMessage +=this.inputMessage
        this.inputMessage = ''
      } else if (this.listenMsg === 2) {
        this.contenMessage +=this.inputMessage
        this.inputMessage = ''
      } 
    },
     handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
   
    
  },
  // computed: {
  //   writeMessage: function(e) {
  //     console.log(this.listenMsg)  
  //     console.log(1,e)
  //     console.log(2,this.inputMessage)
  //     return this.inputMessage
  //   }
  // },
  // watch: {
  //   inputMessage: function (val) {
  //     if (this.listenMsg === 1) {
  //       let xxx = this.titleMessage
  //       this.titleMessage =xxx+ this.inputMessage
       
  //     } else if (this.listenMsg === 2) {
  //       this.contenMessage = this.inputMessage
       
  //     }
  //   }
  // }
}
</script>

<style>
  @import "./components/css/main.css";
</style>
