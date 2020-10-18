<template>
  <div class="main">

    <img src="../images/successful.jpg" >
    <span class="hint">Registration Success!</span>
  </div>
</template>

<script>
export default {
name: "success"
}
</script>

<style scoped>
.main{
  width: 300px;
  height: 350px;
  position:absolute;
  top:50%;
  left: 50%;
  margin: -150px 0 0 -150px;
}
.hint{
  width: 300px;
  height: 50px;
  margin-left: 10px ;
  padding-top: 50px;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  color: #12a731;
}
</style>
