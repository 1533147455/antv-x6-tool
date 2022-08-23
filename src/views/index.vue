<template>
  <Header></Header>
  <div class="container">
    <Aside />
    <div class="main" :style="{ width: `calc(100% - ${showDrawer ? '600' : '200'}px)` }">
      <Main />
    </div>
  </div>

  <el-drawer
      :append-to-body="true"
      :lock-scroll="false"
      modal-class="el-drawer-modal-box"
      :size="400"
      :modal="false"
      :close-on-click-modal="false"
      :before-close="() => setShowDrawer(false)"
      v-model="showDrawer"
      title="节点属性"
  >
    <Drawer />
  </el-drawer>
</template>
<script setup>
import Main from "./main";
import Header from "./header";
import Aside from "./aside"
import Drawer from "./drawer";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore()
const showDrawer = computed(() => store.state.editor.showDrawer)
const setShowDrawer = (val) => {
  store.commit('editor/setShowDrawer', val)
}

</script>

<style>
.el-drawer-modal-box {
  inset: 0 0 0 calc(100vw - 400px) !important;
}
</style>
<style scoped  lang="scss">
.container {
  display: flex;
}
</style>
