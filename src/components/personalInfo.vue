<template>
  <div>
    <div class="selection_header">
      <h1 style="color:#f7f7fd; font-size:28px;margin-top:50px;margin-left:30px">Basic Infomation</h1>
    </div>
    <div class="input_wrap">
      <div>
        <form id="info_form">
          <table>
            <tr>
              <td><span style="width: 100px;font-size: 20px;height: 50px"> Name*</span></td>
              <td><input width="150px" class="input2" type="text"  ref="name" ></td>
            </tr>

            <tr>
              <td><span style="width: 100px;font-size: 20px;height: 50px"> Address*</span></td>
              <td><input width="150px" class="input2" type="text"  ref="address" ></td>
            </tr>

            <tr>

              <td><span style="width: 100px;font-size: 20px;height: 50px"> Male*</span>
                <input type="radio" value="Male"  name="lg" v-model="sex" checked></td>
              <td><span style="width: 100px;font-size: 20px;height: 50px"> Female*</span>
                <input type="radio" value="Female"  name="lg" v-model="sex"></td>
            </tr>

            <tr>
              <td><span style="width: 100px;font-size: 20px;height: 50px"> Age*</span></td>
              <td><input width="150px" class="input2" type="text"  ref="age" ></td>
            </tr>

            <tr>
              <td><span style="width: 100px;font-size: 20px;height: 50px"> Job*</span></td>
              <td><input width="150px" class="input2" type="text"  ref="job" ></td>
            </tr>

          </table>
        </form>
      </div>
    </div>
    <div class="td_content">
      <button @click="info_submit" id="info_button">Next ></button>
    </div>
  </div>
</template>


<script>
import {registerCheck, saveUserInfo} from "../axios/axios-api";

export default {
  name: "personalInfo",

  data(){
    return{
      name :"",
      address :"",
      age : "",
      job : "",
      sex : "Male",
    }
  },
  created(){

  },

  methods: {

    info_submit: function (event) {
      this.name = this.$refs.name.value;
      this.address = this.$refs.address.value;
      this.job = this.$refs.job.value;
      this.age = this.$refs.age.value;


      let param = {
        name : this.name,
      }

      // check if this name has been used
      let res = registerCheck(param)
      res
        .then(res => {
          let name_exist = res.result.user_exist

          // if already has this name in our database
          if(name_exist===true)
          {
            this.$message({
              message: "Please choose another name, this one has been used by others",
              type: 'error',
              offset: 300,
            })
          }

          // if has filled each cell and the name is available, send to next page
          if(this.checkEmpty()&& !name_exist){
            return this.$router.push({
              name: "camera",
              query: {
                name: this.name,
                address: this.address,
                age: this.age,
                job: this.job,
                sex: this.sex,

                }
              });
            }
        })
      },

    // check whether has filled each cell
    checkEmpty:function () {

      if (this.name === "") {
        this.$message({
          message: "Please enter your name",
          type: 'error',
          offset: 300,
        })
        return false
      }


      if (this.address === "") {
        this.$message({
          message: "Please enter your adress",
          type: 'error',
          offset: 300,
        })
        return false
      }

      if (this.age === "") {
        this.$message({
          message: "Please enter your age",
          type: 'error',
          offset: 300,
        })
        return false
      }

      if (this.job === "") {
        this.$message({
          message: "Please enter your job",
          type: 'error',
          offset: 300,
        })
        return false
      }

      return true
    },

  }
}


</script>

<style scoped>
*{
  font-size: 14px;
  color: #1c1d66;
  font-family: "Gill Sans";
  font-weight: 700;
  text-align: left;
}

#info_button{
  width: 120px;
  height: 50px;
  background: none;
  color: #232223 !important;
  border-radius: 8px;
  font-family: "Gill Sans";
  font-size: 26px;
  font-weight: 500;
}
.selection_header{
  height: 300px;
  width: 375px;
  background-image: url(../images/background4.png);
  background-repeat:no-repeat;
  border-width: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 60px;
  border-bottom-left-radius: 60px;
  border-color: #000 #000 #000 #000;
  position: absolute;
}
.input_wrap{
  height: 500px;
  width: 330px;
  margin-top:150px;
  margin-left:20px;
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
tr{
  height: 80px;
  width: 375px;
}
td{
  height: 80px;
  width: 183px;
}
dt{
  width: 170px;
}
dd{
  width: 170px;
}
span {
  display:block;
  float:left;
  width:100px;
}
.input1,.select1{
  border: 1px solid #ccc;
  background-color: #f7f7fd ;
  border-radius: 5px;
  width: 300px;
  height: 30px;
  margin-bottom: 15px;
}
.input2,.select2{
  border: 1px solid #ccc;
  background-color: #f7f7fd ;
  border-radius: 5px;
  width: 120px;
  height: 30px;
  margin-bottom: 15px;
}
.td_content{
  text-align:center;
  margin-top:670px;
  margin-left: 120px;
  position: absolute;
}
</style>
