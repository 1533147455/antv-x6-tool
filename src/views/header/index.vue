<template>
  <div class="header-container" :style="{ width: status ? 'calc(100% - 400px)' : '100%'}">
    <el-row>
      <el-col :span="8" class="menu-left">
        <span @click="openGithub">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-github-fill" />
          </svg>
          <span class="text">antv-x6-tool</span>
        </span>
      </el-col>
      <el-col :span="16" class="menu-right">
        <span @click="configShow = !configShow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-config" />
          </svg>
          <span class="text">设置</span>
        </span>

        <span @click="shortcutKeyShow = !shortcutKeyShow">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kuaijiejianshezhi" />
          </svg>
          <span class="text">快捷键</span>
        </span>

        <span @click="downloadImg">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-daochu" />
          </svg>
          <span class="text">导出图片</span>
        </span>

        <span @click="save">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-baocun1" />
          </svg>
          <span class="text">保存</span>
        </span>

        <span @click="clear">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-clear1" />
          </svg>
          <span class="text">清空</span>
        </span>
      </el-col>
    </el-row>
  </div>
  <ShortcutKeyDialog v-model="shortcutKeyShow" />
  <ConfigDialog v-model="configShow" />
</template>

<script setup  >
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentInstance, ref, computed } from 'vue'
import { DataUri } from '@antv/x6'
import BaseGraph from "../config/baseGraph";
import { useStore } from "vuex";
const store = useStore()

const shortcutKeyShow = ref(false)
const configShow = ref(false)
const { proxy } = getCurrentInstance();

const showDrawer = computed(() => store.state.editor.showDrawer)

proxy.$EventBus.on("save-canvas-data", () => {
  save()
});
proxy.$EventBus.on("clear-canvas-data", () => {
  clear()
});

const openGithub = () => {
  window.open('https://github.com/1533147455/antv-x6-tool')
}

const clear = () => {
  ElMessageBox.confirm(
    '是否确定清空当前画布和本地缓存的所有内容?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(() => {
    BaseGraph.graph.fromJSON({})
    localStorage.removeItem('graphCacheData')
  })
}
const save = () => {
  localStorage.setItem('graphCacheData', JSON.stringify(BaseGraph.getGraphData()))
  ElMessage({
    message: '保存成功，数据将缓存在浏览器本地！',
    type: 'success',
  })

}

const downloadImg = () => {
  BaseGraph.graph.toPNG((dataUri) => {
    // 下载
    DataUri.downloadDataUri(dataUri, 'chart.png')
  }, {
    padding: {
      top: 20,
      right: 30,
      bottom: 40,
      left: 50,
    },
  })
}
</script>

<style scoped  lang="scss">
.icon {
  margin: 0 5px;
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: #333;
  overflow: hidden;
}

.menu-right {
  text-align: right;
}
.menu-left,
.menu-right {
  & > span {
    display: inline-block;
    margin-right: 10px;
    .icon,
    .text {
      vertical-align: middle;
    }
  }
  & > span:hover {
    cursor: pointer;
  }
}
.menu-right .text {
  color: #666;
}
.menu-left .text {
  color: #333;
}
.header-container {
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 16px 5px;
  margin-bottom: 4px;
}
.btn-wrap {
  text-align: right;
}
</style>
