<template>
  <div :class="`node-box ${data.status}`">
    <div class="name-box">
      <span class="type">Post</span>
      <span class="name">{{ data.name }}</span>
    </div>
    <span :class="`${data.status} status`">
      <img v-if="data.status === 'success'" src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*6l60T6h8TTQAAAAAAAAAAAAAARQnAQ" />
      <img v-if="data.status === 'failed'" src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*SEISQ6My-HoAAAAAAAAAAAAAARQnAQ" />
      <img v-if="data.status === 'running'" src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*t8fURKfgSOgAAAAAAAAAAAAAARQnAQ" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject, reactive } from 'vue';
let getNode = inject("getNode")
let getGraph = inject("getGraph")
let data = reactive(getNode().getData())
getNode().on('change:data', ({ current }) => {
  data.name = current.name;
  data.status = current.status;
})
</script>
<style scoped lang="scss">
.node-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 1px solid #c2c8d5;
  border-left: 4px solid #5F95FF;
  border-radius: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  .type {
    flex-shrink: 0;
    margin-left: 8px;
    font-size: 14px;
    line-height: 22px;
    display: inline-block;
    border-radius: 2PX;
    text-align: center;
    width: 36px;
    color: #5086FF;
    background: #EDF2FF;
    border: 0.5PX solid #5086FF;
  }
  .name {
    display: inline-block;
    flex-shrink: 0;
    margin-left: 8px;
    color: #666;
    font-size: 12px;
  }
  .status {
    flex-shrink: 0;
    margin-right: 15px;
  }
  .running img {
    animation: spin 1s linear infinite;
  }
  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    margin-left: 8px;
  }
}
.node-box.success {
  border-left: 4px solid #52c41a;
}
.node-box.failed {
  border-left: 4px solid #ff4d4f;
}
.x6-node-selected .node-box {
  border-color: #1890ff;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #d4e8fe;
}
.x6-node-selected .node-box.success {
  border-color: #52c41a;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #ccecc0;
}
.x6-node-selected .node-box.failed {
  border-color: #ff4d4f;
  border-radius: 2px;
  box-shadow: 0 0 0 4px #fedcdc;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
