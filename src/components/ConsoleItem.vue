<template>
  <div class="item">
    <div class="time">
      {{info.time}}
    </div>
    <div v-if="info.type === 'string'">
      {{info.data}}
    </div>
    <div v-else-if="info.type === 'table'">
      RTB# show ip nat translations
      <el-table
        :data="info.data"
      >
        <el-table-column
          prop="pro"
          label="Pro"
          width="50px"
        ></el-table-column>
        <el-table-column
          prop="in_global"
          label="Inside global"
        ></el-table-column>
        <el-table-column
          prop="in_local"
          label="Inside local"
        ></el-table-column>
        <el-table-column
          prop="out_global"
          label="Outside global"
        ></el-table-column>
        <el-table-column
          prop="out_local"
          label="Outside local"
        ></el-table-column>
      </el-table>
    </div>
    <div v-else>
      <p v-for="line in info.data" :key="line">
        {{line}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsoleItem',
  props:['info'],

}
</script>

<style scoped>
  .item {
    /* border: 1px solid black; */
    margin: 15px 5px;
  }
  .time {
    color: #4682B4;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
  }

</style>