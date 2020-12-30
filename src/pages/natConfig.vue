<template>
  <div>
    <div style="display: flex">
      <div style="width: 700px">
        <div>
            <div>拓扑图：</div>
            <Diagram @getResultEvent="print_result" @getConfigInfo="config"></Diagram>
        </div>
        <div style="" align="center">
          <el-button @click="config_all">配置</el-button>
          <el-button @click="test_nat">测试</el-button>
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
      buffer_info: 'default',
      can_config: {
        RTA: true,
        RTB: true,
        RTC: true,
      },
      router_list:{

      }
    }
  },
  methods: {
    print_result(result) {
      if(result.info === 'SUCCESS') {
        this.buffer_info = "配置" + result.router + "的IP为：" + result.ip + "成功"
      }else {
        this.buffer_info = "配置" + result.router + "的IP为：" + result.ip + "失败"
      }
    },

    config(can_config) {
      this.can_config = can_config;
    },

    config_all() {
      console.log("config")
      var self = this;
      if(this.can_config.RTA && this.can_config.RTB && this.can_config.RTC) {
        this.$axios.get('/autoConfig').then(
          function (response) {
            console.log(response);
            console.log("配置成功")   
            self.buffer_info = "一键配置成功";
          }
        ).catch(function(error) {
          console.log(error);

        })
      }else {
        console.log("未配置")
      }
      
    },

    test_nat() {
      this.$axios.get('/testResult').then(
          function (response) {
            console.log(response);
            console.log("测试")   
          }
        ).catch(function(error) {
          console.log(error);
        })
    }
  }
  
}
</script>

<style scoped>

</style>