<template>
<div class="page-padding width100">
  <div class="my-content">
    <img src="../../static/ipoly.png" alt="">
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {}
  },

  mounted () {
  }
}
</script>
<style lang="less" scoped>
.width100 {
  width: 100%;
  height: 100%;
}
.my-content {
  width: 100%;
  height: 100%;
  background: url(../../static/bg.png) no-repeat center;
  background-size: cover;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-size: 28px;
  img {
    position: absolute;
    bottom: 62px;
    right: 98px;
  }
}
</style>
