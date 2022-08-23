const state = {
    curEditData: {},//当前侧边栏回显的属性
    showDrawer: false, //是否打开右侧抽屉属性面板
    canvasTarget:null,//当前画布选中的目标//线或节点
}

const mutations = {
    setCurEditData(state, { data }) {
        Object.assign(state.curEditData, data)
    },
    setShowDrawer(state, showDrawer) {
      state.showDrawer = showDrawer
    },
    setCanvasTarget(state,data){
        state.canvasTarget=data
    }
}

const getters = {
    status: (state) => {
        return state.showDrawer
    },
}



export default {
    namespaced: true,
    state,
    getters,
    mutations
}
