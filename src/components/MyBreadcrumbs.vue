<template>
  <div>
    <v-breadcrumbs class="breadcrumbs" :items="item">

    </v-breadcrumbs>
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
  padding: 10px 20px;
  color: #1976d2 !important;
}

</style>

