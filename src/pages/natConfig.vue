<template>
  <div>
    <div style="display: flex">
      <div style="width: 700px">
        <div>
            <div>拓扑图：</div>
            <Diagram @getResultEvent="print_result"></Diagram>
        </div>
        <div style="" align="center">
          <el-button>配置</el-button>
        </div>
      </div>
      <div>
        <div>结果：</div>
        <div>
          <Console :info="buffer_info"></Console>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Diagram from '../components/Diagram'
import Console from '../components/Console'

export default {
  name: 'nat-config',
  components: {Diagram, Console},
  mounted() {
    console.log("index");
  },
  data() {
    return {
      buffer_info: 'default'
    }
  },
  methods: {
    print_result(result) {
      if(result.info === 'SUCCESS') {
        this.buffer_info = "配置" + result.router + "的IP为：" + result.ip + "成功"
      }else {
        this.buffer_info = "配置" + result.router + "的IP为：" + result.ip + "失败"
      }
    }
  }
  
}
</script>

<style scoped>

</style>