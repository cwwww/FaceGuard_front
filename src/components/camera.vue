<template>
  <div>
    <!--图片展示-->
    <div style="width: 370px">
      <div class="selection_header">
        <h1 class="photo">Photo Registration</h1>
      </div>
      <div class="input_wrap">
        <video ref="video" width="300" height="180" autoplay style="margin-top:10px"></video>
        <canvas ref="canvas" width="300" height="180"></canvas>
      </div>
    </div>

    <div class="td_content">
      <button @click="closeCamera" class="info_button">reshot</button>
      <button @click="photograph" class="info_button">shot</button>
      <button @click="submit" class="info_button">submit</button>
    </div>
  </div>
</template>

<script>
import { saveUserInfo } from "../axios/axios-api";

export default {
  data() {
    return {
      img: "",
      shotsuccess: false,
      submited:false
    };
  },
  methods: {
    photograph() {
      let ctx = this.$refs["canvas"].getContext("2d");
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs["video"], 0, 0, 300, 180);
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 1);

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace("data:image/jpeg;base64,", "");
      this.img = str;
      let strLength = str.length;
      let fileLength = parseInt(strLength - (strLength / 8) * 2);
      // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2);
      console.log(size);

      // 上传拍照信息  调用接口上传图片 .........

      // 保存到本地
      let ADOM = document.createElement("a");
      ADOM.download = new Date().getTime() + ".jpeg";
      ADOM.click();
      
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs["video"].srcObject) return;
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach(track => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
    },

    submit() {
      var name = this.$route.query.name;
      var address = this.$route.query.address;
      var age = this.$route.query.age;
      var job = this.$route.query.job;
      var sex = this.$route.query.sex;

      let param = {
        name: name,
        address: address,
        age: age,
        job: job,
        sex: sex,
        img: this.img
      };
      saveUserInfo(param);
    }
  },

  created() {
    navigator.mediaDevices
      .getUserMedia({
        video: true
      })
      .then(success => {
        // 摄像头开启成功
        this.$refs["video"].srcObject = success;
        // 实时拍照效果
        this.$refs["video"].play();
      })
      .catch(error => {
        console.error("摄像头开启失败，请检查摄像头是否可用！");
      });
  }
};
</script>

<style scoped>
.info_button {
  width: 120px;
  height: 50px;
  background-color: #1c1d66;
  color: #dedde4;
  border-radius: 8px;
  font-family: "Gill Sans";
  font-size: 26px;
  font-weight: 500;
}
.td_content {
  text-align: center;
  margin-top:680px;
  width: 375px;
  height: 55px;
  position:absolute;

}
.selection_header {
  height: 300px;
  width: 375px;
  background-image: url(../images/face_recognition.jpg);
  background-repeat: no-repeat;
  background-size: 375px;
  border-width: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-color: #000 #000 #000 #000;
  position: absolute;
}
.input_wrap {
  height: 500px;
  width: 330px;
  margin-top: 150px;
  margin-left: 20px;
  padding: 15px;
  border: 0;
  background: #ffffff;
  border-width: 0px;
  border-style: solid;
  border-radius: 28px;
  border-color: #000 #000 #000 #000;
  box-shadow: 0 4px 10px 1px #dedde4;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
}
.photo{
  color:#1c1d66; 
  font-size:28px;
  margin-top:50px;
  margin-left:30px;
  font-family:'Gill Sans';
  font-weight: 700;

}
</style>
