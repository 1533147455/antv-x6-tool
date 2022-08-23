<template>
  <div v-loading="loading" class="main-box">
    <div class="mini-map-container" ref="miniMapContainerRef"></div>
    <div class="container" ref="containerRef"></div>
  </div>
</template>

<script setup>
import {ref, onMounted, getCurrentInstance, nextTick, computed, reactive} from "vue";
import { useStore } from 'vuex'

import { FunctionExt } from '@antv/x6'
import BaseGraph from "../config/baseGraph";
import hotkeys from 'hotkeys-js';

const store = useStore()
const { proxy } = getCurrentInstance();
const loading = ref(false)
const containerRef = ref();
const miniMapContainerRef = ref();
const graphCacheData = JSON.parse(localStorage.getItem('graphCacheData'))
if (graphCacheData) {
  loading.value = true
  setTimeout(() => {
    BaseGraph.graph.fromJSON(graphCacheData)
    loading.value = false
  }, 800);
}
const registrationShortcuts = () => {
  const graph = BaseGraph.graph
  graph.bindKey('ctrl+c', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey('ctrl+v', () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })

  const history = graph.history
  graph.bindKey('ctrl+z', () => {
    history.undo()
  })
  graph.bindKey('ctrl+y', () => {
    history.redo()
  })

  hotkeys('ctrl+s', (e) => {
    e.preventDefault()
    proxy.$EventBus.emit("save-canvas-data");
  });
  hotkeys('ctrl+d', (e) => {
    e.preventDefault()
    proxy.$EventBus.emit("clear-canvas-data");
  });
}
onMounted(() => {
  const graph = BaseGraph.init({
    // 画布的容器
    container: containerRef.value,
    // Scroller 后可开启小地图
    minimap: {
      enabled: true,
      container: miniMapContainerRef.value,
    },
  });
  // 设置节点属性
  const setCurEditData = (node) => {
    const nodeData = node.getData()
    store.commit({
      type: 'editor/setCurEditData',
      data: {...nodeData}
    })
  }
  graph.on("node:click", ({ node, e }) => {
    window.n = node
    store.commit('editor/setCanvasTarget', node)
    store.commit('editor/setShowDrawer', true)
    setCurEditData(node)
    nextTick(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    })
  });
  graph.on("node:added", ({ node, e }) => {
    store.commit('editor/setCanvasTarget', node)
    store.commit('editor/setShowDrawer', true)
    setCurEditData(node)
    nextTick(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    })
  });
  graph.on("node:resizing", ({ node }) => {
    setCurEditData(node)
    store.commit('editor/setCanvasTarget', node)
    nextTick(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    })
  });
  graph.on('edge:click', ({ edge }) => {
    window.e = edge
    store.commit('editor/setCanvasTarget', edge)
    nextTick(() => {
      proxy.$EventBus.emit("click-canvas-target", node);
    })
  })
  graph.on('edge:mouseenter', ({ edge }) => {
    edge.addTools({
      name: 'button-remove',
    })
  })
  graph.on('edge:mouseleave', ({ edge }) => {
    edge.removeTools()
  })
  graph.on("blank:click", () => {
    store.commit('editor/setShowDrawer', false)
    store.commit({
      type: 'editor/setCurEditData',
      data: {}
    })
  });


  graph.on('node:mouseenter', FunctionExt.debounce(({ node }) => {
    // 添加连接点
    const ports = containerRef.value.querySelectorAll('.x6-port-body')
    showPorts(ports, true)
  }), 500)
  graph.on('node:mouseleave', ({ node }) => {
    const ports = containerRef.value.querySelectorAll('.x6-port-body')
    // 添加连接点
    showPorts(ports, false)
  })

  // 显示连线节点
  const showPorts = (ports, show) => {
    for (let i = 0, len = ports.length; i < len; i = i + 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }

  registrationShortcuts()
});
</script>


<style scoped>
.main-box {
  position: relative;
}
.container {
  height: calc(100vh - 60px);
}
.mini-map-container {
  position: absolute;
  z-index: 999;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.x6-graph-scroller::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  /**/
}
.x6-graph-scroller::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}
.x6-graph-scroller::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 10px;
}
.x6-graph-scroller::-webkit-scrollbar-thumb:hover {
  background: #999;
}
.x6-graph-scroller::-webkit-scrollbar-corner {
  background: rgb(239, 239, 239);
}
</style>
