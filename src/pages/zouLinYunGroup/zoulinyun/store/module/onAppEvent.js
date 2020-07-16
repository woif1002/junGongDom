const state ={
    onShow:0,
}
const mutations={
    setOnShow:(state,data)=>{
        state.onShow=data
    }
}
const actions={
    setOnShow({ commit },data) {
        commit("setOnShow",data)
    }
}
export default {
    state,
    actions,
    mutations,
    namespaced: true
}