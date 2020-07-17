<template>
    <div style="background-color: #F5F5F5;padding:20px">
        <el-tabs type="border-card" value="1">
            <el-tab-pane label="系统" name = "1" >
                <!--栅格控制页面布局-->
                    <el-row  :gutter=33>
                        <el-col class="" :span="12">
                                <!--齿轮:width77px-->
                                <!--height:99px-->
                            <div class="grid-content">
                                <div class="settingDiv">
                                    <div class="setting el-icon-s-tools"></div>
                                    <span class="settingDiv-span">GPS时间获取</span>
                                </div>
                                <div v-for="(setting, index) in leftSetting" v-on:click="clickLeftSettingButton(index,$event)" v-bind:class="{'settingDiv-color':index==leftSettingCurrent}" class="settingDiv leftSettingDiv">
                                    <div class="setting el-icon-s-tools"></div>
                                    <span class="settingDiv-span">{{setting.text}}</span>
                                </div>
                                <p style="text-align: center;font-size: 14px;margin-top: 25px;">高速数据采集</p>
                            </div>
                            <!--点击设置图标的弹窗-->
                            <el-dialog width="1100px" title="前端状态自检" :visible.sync="qianDuanZhuangTaiViewVisible">
                                <div slot="footer" class="dialog-footer">
                                    <el-button style="background-color: red;color: white;" @click="qianDuanZhuangTaiViewVisible = false">关 闭</el-button>
                                </div>
                            </el-dialog>
                            <el-dialog width="469px" title="衰减控制控制" :visible.sync="shuaiJianKongZhiFormVisible">
                                <div slot="footer" class="dialog-footer">
                                    <el-button style="background-color: red;color: white;" @click="shuaiJianKongZhiFormVisible = false">关 闭</el-button>
                                </div>
                            </el-dialog>
                            <el-dialog width="469px" title="射频前端控制" :visible.sync="shePingQianDuanFormVisible">
                                <div slot="footer" class="dialog-footer">
                                    <el-button style="background-color: red;color: white;" @click="shePingQianDuanFormVisible = false">关 闭</el-button>
                                </div>
                            </el-dialog>
                            <el-dialog width="469px" title="采集处理设置" :visible.sync="caiJiChuLiFormVisible">
                                <div slot="footer" class="dialog-footer">
                                    <el-button style="background-color: red;color: white;" @click="caiJiChuLiFormVisible = false">关 闭</el-button>
                                </div>
                            </el-dialog>
                        </el-col>
                        <el-col  :span="12">
                            <div class="grid-content">
                                <div style="float: left">
                                    <el-button style="width: 87px;height: 110px;text-align: center;margin: 40px 0 0 10px;padding: 0;font-size: 14px;font-weight: bold;display: inline;" type="primary">开始存储</el-button>
                                    <el-button class="" style="width: 87px;height: 110px;text-align: center;margin: 40px 0 0 10px;padding: 0;font-size: 14px;font-weight: bold;background-color: red;color: white;display: inline;">停止存储</el-button>
                                </div>
                                <div v-for="(setting, index) in rightSetting" v-on:click="clickRightSettingButton(index,$event)" v-bind:class="{'settingDiv-color':index==rightSettingCurrent}" class="settingDiv rightSettingDiv">
                                    <div class="setting el-icon-s-tools"></div>
                                    <span class="settingDiv-span">{{setting.text}}</span>
                                </div>
                                <p style="text-align: center;font-size: 14px;margin-top: 25px;">数据存储管理</p>
                            </div>
                        </el-col>
                    </el-row>

            </el-tab-pane>
            <el-tab-pane label="频谱分析" name = "2">

            </el-tab-pane>
            <el-tab-pane label="信号分选" name = "3">

            </el-tab-pane>
            <el-tab-pane label="脉间分析" name = "4">

            </el-tab-pane>
            <el-tab-pane label="脉内分析" name = "5">

            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //控制设置对话窗
                qianDuanZhuangTaiViewVisible: false,
                shuaiJianKongZhiFormVisible:false,
                shePingQianDuanFormVisible:false,
                caiJiChuLiFormVisible:false,

                //默认显示
                leftSettingCurrent:4,
                rightSettingCurrent:-1,
                //两边机器设置按钮的值
                leftSetting: [
                    { text: '前端状态自检' },
                    { text: '衰减控制参数' },
                    { text: '射频前端控制' },
                    { text: '采集处理设置' },
                    { text: '系统查看状态' }
                ],
                rightSetting: [
                    { text: '采集处理索引读取' },
                    { text: '中频数据读取' },
                    { text: 'PDW数据存储设置' },
                    { text: 'PDW数据索引读取' },
                    { text: ' PDW数据读取' }
                ]
            }
        },mounted(){

        },methods:{
            //点击按钮的方法
            clickLeftSettingButton(index,event){
                switch (index) {
                    case 0:
                        this.qianDuanZhuangTaiViewVisible = true;
                        break;
                    case 1:
                        this.shuaiJianKongZhiFormVisible = true;
                        break;
                    case 2:
                        this.shePingQianDuanFormVisible = true;
                        break;
                    case 3:
                        this.caiJiChuLiFormVisible = true;
                        break;
                    case 4:
                        break;
                }
                this.leftSettingCurrent=index;
            },
            clickRightSettingButton(index,event){
                this.rightSettingCurrent = index;

            }
        }
    }
</script>
<style>

    *{
        margin: 0;
        padding: 0;
    }
    .settingDiv-span{
        padding-top:5px ;
        text-align: center;
        margin: auto;
        width: 65px;
        font-size: 14px;
        line-height:21px;
        display:block;
    }
    /*点击时需要切换添加的*/
    .settingDiv-color{
        border: 1px solid #3291F8;
        border-radius: 4px;
        color: #3291F8;
    }
    .settingDiv{
        text-align: center;
        font-size: 60px;
        display: inline-block;
        margin-top: 30px;
        width: 77px;
        height: 119px;
    }
    .leftSettingDiv{
        margin-left: 33px;
    }
    .rightSettingDiv{
        margin-left: 13px;
    }
    /*设置框*/
    .setting{
        margin-top: 10px;
        width: 60px;
        height: 60px;
    }
    .grid-content {
        text-align: center;
        border: 1px solid #c3c3c3;
        border-radius: 4px;
        min-height: 207px;
    }
    /*tab切换框设置*/
    .el-tabs__item{
        width: 200px;
        height: 67px;
        font-size: 16px;
        text-align: center;
        line-height: 67px;
    }
</style>
<style lang="scss" scoped>

</style>