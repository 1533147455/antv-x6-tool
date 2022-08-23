<template>
    <div class="aside-box">
        <a title="Get请求" class="stencil" data-type="getNodeComponent" @mousedown.stop="startDrag">
            <svg width="62" height="62">
                <use href="#getNodeComponent" />
            </svg>
            <div>Get请求</div>
        </a>

        <a title="Post请求" class="stencil" data-type="postNodeComponent" @mousedown.stop="startDrag">
            <svg width="62" height="62">
                <use href="#postNodeComponent" />
            </svg>
            <div>Post请求</div>
        </a>

        <el-button type="primary" @click="request">请求</el-button>
    </div>
    <svg style="display: none;">
        <symbol id="getNodeComponent" viewBox="-1 -1 62 62">
          <rect fill="#EFF4FF" stroke="#5F95FF" stroke-width="1" width="60" height="60" />
        </symbol>
        <symbol id="postNodeComponent" viewBox="-1 -1 62 62">
          <rect fill="#EFF4FF" stroke="#5F95FF" stroke-width="1" width="60" height="60" />
        </symbol>
    </svg>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import BaseGraph from "../config/baseGraph";
import { Addon } from "@antv/x6";

let dnd: Addon.Dnd;
nextTick(() => {
    const { Dnd } = Addon
    dnd = new Dnd({
        target: BaseGraph.graph,
    })
});
const startDrag = (e: any) => {
    let target = e && e.target.closest('.stencil')
    const type = target.getAttribute('data-type')
    let { ...obj }: any = BaseGraph.getComponent()
    const node = obj[type]
    dnd.start(node, e)
}

const request = async () => {
  const graphData = BaseGraph.getGraphData()
  console.log(graphData)
  for (let i = 0; i < graphData.nodes.length; i++) {
    const itemData = graphData.nodes[i]
    BaseGraph.graph.getCellById(itemData.id).setData({
      status: '',
    })
  }
  const generateSequence = async function* () {
    for (let i = 0; i < graphData.nodes.length; i++) {
      const itemData = graphData.nodes[i]
      BaseGraph.graph.getCellById(itemData.id).setData({
        status: 'running',
      })
      const res = await new Promise(((resolve, reject) => {
        setTimeout(() => {
          const randomNum = Math.random()
          console.log(randomNum, itemData.id)
          if (randomNum >= 0.2) {
            BaseGraph.graph.getCellById(itemData.id).setData({
              status: 'success',
            })
            resolve(true)
          } else {
            BaseGraph.graph.getCellById(itemData.id).setData({
              status: 'failed',
            })
            reject(false)
          }
        }, 3000);
      })).catch((err) => err)
      if (!res) return;
      yield res;
    }
  };
  const generator = generateSequence();
  for await (const value of generator) {
  }
}



</script>
<style scoped  lang="scss">
.aside-box {
    padding: 20px 0;
    width: 200px;
    text-align: center;
    color: #999;
    .stencil {
        cursor: move;
        text-align: center;
        display: block;
        margin-bottom: 20px;
    }
    .stencil:hover {
        color: #409eff;
    }
}
</style>
