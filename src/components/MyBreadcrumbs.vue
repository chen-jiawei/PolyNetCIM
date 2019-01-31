<template>
  <div>
    <div class="my-shadow">
      <v-breadcrumbs class="breadcrumbs" :items="item">

      </v-breadcrumbs>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Array
  }
}
</script>
<style lang="less" scoped>

.breadcrumbs {
  background: #fff;
  line-height: 28px;
  padding: 10px 12px;
}

</style>

