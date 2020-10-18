<template>
  <div>
    <!--图片展示-->
    <div style="width: 370px;height: 300px">
        <video ref="video" width="370" height="277" autoplay> </video>
    </div>


    <div >
        <canvas ref="canvas" width="370" height="277"></canvas>
    </div>


    <div class="td_content">
      <button @click="photograph" class="info_button">shot</button>
          <button @click="submit" class="info_button">submit</button>
      </div>
  </div>
</template>

<script>
import {saveUserInfo} from "../axios/axios-api";

export default {
  data () {
    return {
      img : "",
      has_face:""
    }
  },
  methods: {
    photograph () {
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0, 370,277 )
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 1)

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace('data:image/jpeg;base64,', '')
      this.img = str
      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2)
      // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2)
      console.log(size)

      // 上传拍照信息  调用接口上传图片 .........

      // 保存到本地
      let ADOM = document.createElement('a')
      ADOM.download = new Date().getTime() + '.jpeg'
      ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
      if (!this.$refs['video'].srcObject) return
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    },

    submit(){

      var name = this.$route.query.name;
      var address = this.$route.query.address;
      var age = this.$route.query.age;
      var job = this.$route.query.job;
      var sex = this.$route.query.sex;

      let param = {
        name : name,
        address : address,
        age : age,
        job : job,
        sex : sex,
        img : this.img
      }

      let res = saveUserInfo(param)
      res
        .then(res => {
          this.has_face = res.result.has_face
          console.log(this.has_face)
          if(this.has_face===true)
          {
            this.$message({
              message: "Successful",
              type: 'success',
              offset: 300,
            })
          }

          else {
            this.$message({
              message: "Cannot recognize your face",
              type: 'error',
              offset: 300,
            })
          }

        })

    }
  },

  created() {
    navigator.mediaDevices.getUserMedia({
      video: true
    }).then(success => {
      // 摄像头开启成功
      this.$refs['video'].srcObject = success
      // 实时拍照效果
      this.$refs['video'].play()
    }).catch(error => {
      console.error('摄像头开启失败，请检查摄像头是否可用！')
    })

  }
}
</script>

<style scoped>

.info_button{
  width: 120px;
  height: 50px;
  background-color: #1c1d66;
  color: #dedde4 ;
  border-radius: 8px;
  font-family: "Gill Sans";
  font-size: 26px;
  font-weight: 500;
}
.td_content{
  text-align:center;
  width: 375px;
  height: 55px;
}
</style>
