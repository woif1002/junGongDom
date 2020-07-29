<template>
    <div>
            <div class="sjian_h">
                <div class="top_ft">衰减模块选择</div>
                <div>
                    <el-select v-model="value_s" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in option_s"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="sjian_h">
                <div class="top_ft">频段选择</div>
                <div>
                    <el-select v-model="value_p" placeholder="请选择" size="mini">
                        <el-option
                                v-for="item in option_p"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="sjian_h">
                <div class="top_ft">衰减值</div>
                <div class="sj_inp">
                    <el-input v-model="input" size="mini"></el-input>
                </div>
                <span>dB</span>
            </div>
    </div>
</template>

<script>
 export default {
     data(){
         return{
             value_s: '侦查处理模块',
             option_s: [{
                 value: '选项1',
                 label: '侦查处理模块'
             }, {
                 value: '选项2',
                 label: '侦查处理模块'
             }, {
                 value: '选项3',
                 label: '侦查处理模块'
             }, {
                 value: '选项4',
                 label: '侦查处理模块'
             }, {
                 value: '选项5',
                 label: '侦查处理模块'
             }],
             value_p:'0.38-0.9G',
             option_p: [{
                 value: '选项1',
                 label: '0.38-0.9G'
             }, {
                 value: '选项2',
                 label: '0.38-0.9G'
             }, {
                 value: '选项3',
                 label: '0.38-0.9G'
             }, {
                 value: '选项4',
                 label: '0.38-0.9G'
             }, {
                 value: '选项5',
                 label: '0.38-0.9G'
             }]
         }
     }
 }
</script>

<style lang="less" scoped>
    .top_ft{
        width: 130px;
        height: 27px;
        line-height: 27px;
        float: left;
    }
    .sjian_h{
        margin: 25px 0;
    }
    .sj_inp{
        float: left;
        width: 160px;
    }
    .sjian_h>span{
        clear: left;
        line-height: 27px;
    }
</style>
