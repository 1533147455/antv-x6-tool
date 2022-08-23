<template>
  <el-form label-width="70px" :model="form">
    <el-form-item label="接口名">
      <el-input v-model="form.name" @input="setNodeData" />
    </el-form-item>
    <el-form-item label="接口地址">
      <el-input v-model="form.url" @input="setNodeData"/>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { useStore } from "vuex";
import { getCurrentInstance, reactive, computed } from "vue";
const store = useStore()
const selectNode = computed(() => store.state.editor.canvasTarget)
const form = reactive({})
const curEditData = computed(() => store.state.editor.curEditData)
const { proxy } = getCurrentInstance();
/**
 * 节点回显值
 */
proxy.$EventBus.on("click-canvas-target", () => {
  Object.assign(form, curEditData.value)
});

/**
 * 节点设置值
 */
const setNodeData = () => {
  selectNode.value.setData({...form})

  store.commit({
    type: 'editor/setCurEditData',
    data: {...form}
  })
}
</script>
