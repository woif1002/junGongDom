<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="系统">
        <systemState/>
      </el-tab-pane>
      <el-tab-pane label="频谱分析">频谱分析</el-tab-pane>
      <el-tab-pane label="信号分选">信号分选</el-tab-pane>
      <el-tab-pane label="脉间分析">脉间分析</el-tab-pane>
      <el-tab-pane label="脉内分析">脉内分析</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import  leftList from './components/leftList'
  import systemState from './components/systemState'
 export default {
    components:{
      systemState
    },
   data(){
     return{

     }
   }
 }
</script>
<style lang="less" scoped>

</style>

