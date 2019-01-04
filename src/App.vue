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



    <div>
      <el-upload
        ref="imgBroadcastUpload"
        :auto-upload="false" multiple
        :file-list="diaLogForm.imgBroadcastList"
        list-type="picture-card"
        :on-change="imgBroadcastChange"
        :on-remove="imgBroadcastRemove"
        accept="image/jpg,image/png,image/jpeg"
        action="">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
      </el-upload>
      <el-button>submitData</el-button> 
    </div>


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
      diaLogForm: {
        goodsName:'',  // 商品名称字段
        imgBroadcastList:[],  // 储存选中的图片列表
        imgsStr:''     // 后端需要的多张图base64字符串 , 分割
      }
    }
  },
  created(){
    this.getGoodsData()
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
    imgBroadcastChange (file, fileList) {
        const isLt2M = file.size / 1024 / 1024 < 2  // 上传头像图片大小不能超过 2MB
        if (!isLt2M) {
          this.diaLogForm.imgBroadcastList = fileList.filter(v => v.uid !== file.uid)
          this.$message.error('图片选择失败，每张图片大小不能超过 2MB,请重新选择!')
        } else {
          this.diaLogForm.imgBroadcastList.push(file)
        }
      },
      // 有图片移除后 触发
      imgBroadcastRemove (file, fileList) {
        this.diaLogForm.imgBroadcastList = fileList
      },
      // 获取商品原有信息
      getGoodsData () {
        getCommodityById({ cid: this.diaLogForm.id }).then(res => {
          if (res.status) {
            Object.assign(this.diaLogForm, res.data)
            // 把 '1.jpg,2.jpg,3.jpg' 转成[{url:'http://xxx.xxx.xx/j.jpg',...}] 这种格式在upload组件内展示。 imgBroadcastList 展示原有的图片
            this.diaLogForm.imgBroadcastList = this.diaLogForm.imgsStr.split(',').map(v => ({ url: this.BASE_URL + '/' + v })) 
          }
        }).catch(err => {
          console.log(err.data)
        })
      },
      // 提交弹窗数据
      async submitDialogData () {
        const imgBroadcastListBase64 = []
        console.log('图片转base64开始...')
        this.dialogFormLoading = true
        // 并发 转码轮播图片list => base64
        const filePromises = this.diaLogForm.imgBroadcastList.map(async file => {
          if (file.raw) {  // 如果是本地文件
            const response = await uploadImgToBase64(file.raw)
            return response.result.replace(/.*;base64,/, '')
          } else { // 如果是在线文件
            const response = await URLImgToBase64(file.url)
            return response.replace(/.*;base64,/, '')
          }
        })
        // 按次序输出 base64图片
        for (const textPromise of filePromises) {
          imgBroadcastListBase64.push(await textPromise)
        }
        console.log('图片转base64结束...')
        this.diaLogForm.imgs = imgBroadcastListBase64.join()
        console.log(this.diaLogForm)
        if (!this.isEdit) {  //  新增编辑 公用一个组件。区分接口调用
          const res = await addCommodity(this.diaLogForm)              // 提交表单
          if (res.status) {
            this.$message.success('添加成功')
          }
        } else {
          const res = await modifyCommodity(this.diaLogForm)            // 提交表单
          if (res.status) {
            this.$router.push('/goods/goods-list')
            this.$message.success('编辑成功')
          }
        }
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
