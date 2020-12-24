<template>
  <div>
    <div class="console" style="padding-left: 20px">
      <p v-for="info in info_list" :key="info">
        {{info}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Console',
  props: ['info'],
  watch: {
    'info':{
      handler(){
        console.log(this.info);
        this.info_list.push(this.info);
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
    width: 500px;
    height: 450px;
    border: 1px solid #c1c1c1;
    border-radius: 10px;
  }
</style>