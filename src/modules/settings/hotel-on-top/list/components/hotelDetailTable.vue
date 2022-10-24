<template>
  <el-table
    :data="data"
  >
    <el-table-column></el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'HotelDeatilsTable',
  props: {
    data: {
      type: [Array, Object],
      default: () => []
    }
  }
}
</script>
<style lang="">

</style>
