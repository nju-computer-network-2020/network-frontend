<template>
  <div>
    <div style="display: flex">
      <div style="width: 700px">
        <div>
           <Diagram></Diagram>
        </div>
        <div style="" align="center">
          <el-button>配置</el-button>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Diagram from '../components/Diagram'

export default {
  name: 'nat-config',
  components: {Diagram},
  mounted() {
    console.log("index");
  },
  data() {
    return {
    }
  },
  methods: {

  }
  
}
</script>

<style scoped>

</style>