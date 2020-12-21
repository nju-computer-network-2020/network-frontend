<template>
    <div class="modal-backdrop" @click="close" v-show="show">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <slot name="header">
            <h2>标题</h2>
          </slot>
          <button type="button" class="btn-close" @click="close">x</button>
        </div>
        <div class="modal-body">
          <slot name="body">
            主体
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            脚部
            <el-button @click="close">关闭</el-button>
          </slot>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
      name: "modal",
      props:["show"],
      methods: {
        close() {
          this.$emit('close');
        }
      }
    }
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;
  }
  .modal {
    background-color: #fff;
    box-shadow: 2px 2px 20px 1px;
    overflow-x:auto;
    display: flex;
    flex-direction: column;
  }
  .modal-header, .modal-footer { padding: 15px; display: flex; }
  .modal-header {
    border-bottom: 1px solid #eee;
    color: #409EFF;
    justify-content: space-between;
  }
  .modal-footer {
    border-top: 1px solid #eee;
    justify-content: flex-end;
  }
  .modal-body {
    position: relative;
    padding: 20px 20px;
  }

  .btn-close {
    border: none 0; font-size: 20px; padding: 5px; cursor: pointer;
    font-weight: bold; color: #409EFF; background-color: transparent; }

  .btn-green { color: #fff; background-color: #4aae9b; border: 1px solid #4aae9b; border-radius: 2px; }
</style>
