<template>
  <div>
    <div class="console" style="padding-left: 20px" id="scroll_pane">
      <div v-for="(info, index) in info_list" :key="index">
        <ConsoleItem :info='info'></ConsoleItem>
      </div>
    </div>
  </div>
</template>

<script>
import ConsoleItem from './ConsoleItem'

export default {
  name: 'Console',
  components: {ConsoleItem},
  props: ['info'],
  watch: {
    info:{
      handler(){
        // var date = new Date();
        // console.log(date.toLocaleString())
        
        // console.log(this.info);
        // this.info.time = date.toLocaleString();
        this.info_list.push(this.info);
        console.log(this.info_list);

        setTimeout(function() {
          let div = document.getElementById("scroll_pane");
          div.scrollTop = div.scrollHeight;
        }, 100)
        
      }
    },
    deep:true,
  },
  data() {
    return {
      info_list: []
    }
  }

}
</script>

<style scoped>
  .console {
    margin-top: 20px;
    width: 550px;
    height: 450px;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
    overflow-y: scroll;
  }
</style>