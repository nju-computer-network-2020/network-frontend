<template>
  <div>
    <div style="display: flex">
      <div style="width: 700px">
        <div>
            <div>拓扑图：</div>
            <Diagram @getResultEvent="print_result" @getConfigInfo="config"></Diagram>
        </div>
        <div style="" align="center">
          <el-button @click="config_all" v-loading.fullscreen.lock="fullscreenLoading">配置</el-button>
          <el-button @click="show_ping" v-loading.fullscreen.lock="fullscreenLoading">测试</el-button>
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
      fullscreenLoading: false,
      buffer_info: {
        time: '',
        data: '',
        type: 'string'
      },
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
      let data = "";
      if(result.info === 'SUCCESS') {
        data = "配置" + result.router + "的IP为：" + result.ip + "成功"
      }else {
        data = "配置" + result.router + "的IP为：" + result.ip + "失败"
      }
      this.set_console_data(data, "string");
    },

    config(can_config) {
      this.can_config = can_config;
    },

    async config_all() {
      console.log("config")
      let data = "";
      if(this.can_config.RTA && this.can_config.RTB && this.can_config.RTC) {
        this.fullscreenLoading = true;
        await this.$axios.get('/autoConfig').then(
          function (response) {
            console.log(response);
            console.log("配置成功")   
            data = "一键配置成功";
          }
        ).catch(function(error) {
          
          data = "一键配置失败";
          console.log(error);
        })
        this.fullscreenLoading = false;

        var self = this;
        this.set_console_data(data, "string");
      }else {
        console.log("未配置")
      }
      
    },

    async test_nat() {
      this.fullscreenLoading = true;
      await this.$axios.get('/testResult').then(
          function (response) {
            console.log(response.data);
            var data = response.data;
            console.log("测试")   
          }
        ).catch(function(error) {
          console.log(error);
      });
      this.fullscreenLoading = false;
    },

    show_nat(data) {

      data = ": \r\nRTB#show ip nat translations\r\nPro Inside global      Inside local       Outside local      Outside global\r\n--- 192.168.1.34       10.0.0.2           ---                ---\r\n--- 192.168.1.35       10.0.0.11          ---            ";
      var list1 = data.split('\r\n');
      console.log(list1);

      let list2 = [];
      for(let i = 3; i < list1.length; i++) {
        var tmpList = list1[i].split(" ");

        var tmpList2 = [];
        for(let j = 0; j < tmpList.length; j++) {
          if(tmpList[j].length !== 0) {
            tmpList2.push(tmpList[j]);
          }
        }
        list2.push(tmpList2);
      }

      let list3 = [] 
      for(let i = 0; i < list2.length; i++) {
        let tmp = {
          pro: list2[i][0] || "",
          in_global: list2[i][1] || "",
          in_local: list2[i][2] || "",
          out_global: list2[i][3] || "",
          out_local: list2[i][4] || ""
        }
        list3.push(tmp);
      }

      console.log(list3);
      this.set_console_data(list3, "table");

    },

    show_ping() {
      let data = "ping 192.168.3.2\r\n\r\n正在 Ping 192.168.3.2 具有 32 字节的数据:\r\n来自 192.168.3.2 的回复: 字节=32 时间=9ms TTL=126\r\n来自 192.168.3.2 的回复: 字节=32 时间=9ms TTL=126\r\n来自 192.168.3.2 的回复: 字节=32 时间=9ms TTL=126\r\n来自 192.168.3.2 的回复: 字节=32 时间=9ms TTL=126\r\n\r\n192.168.3.2 的 Ping 统计信息:\r\n    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，\r\n往返行程";
      let list = data.split("\r\n");
      console.log(list);
      let list2 = [];
      for(let i = 0; i < list.length; i++) {
        if(list[i].length !== 0) {
          list2.push(list[i]);
        }
      }

      this.set_console_data(list2, "list");
    },

    set_console_data(data, type) {
      let date = new Date();
      let time = date.toLocaleString(); 
      let info = {
        time: time,
        data: data,
        type: type
      }
      console.log(info);
      this.buffer_info = info;
    }
  }
  
}
</script>

<style scoped>

</style>