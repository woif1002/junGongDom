<template>
    <div style="background-color: #F5F5F5;padding:20px; width: auto;text-align: center">
        <el-tabs type="border-card" value="1" style="width: 1600px;margin: auto;">
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
                                <el-button class="settingButton" @click="qianDuanZhuangTaiViewVisible = false">关 闭</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog width="469px" title="衰减控制控制" :visible.sync="shuaiJianKongZhiFormVisible">
                            <div slot="footer" class="dialog-footer">
                                <el-button class="settingButton" @click="shuaiJianKongZhiFormVisible = false">关 闭</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog width="469px" title="射频前端控制" :visible.sync="shePingQianDuanFormVisible">
                            <div slot="footer" class="dialog-footer">
                                <el-button class="settingButton" @click="shePingQianDuanFormVisible = false">关 闭</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog width="469px" title="采集处理设置" :visible.sync="caiJiChuLiFormVisible">
                            <div slot="footer" class="dialog-footer">
                                <el-button class="settingButton" @click="caiJiChuLiFormVisible = false">关 闭</el-button>
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

                    <!--左侧系统查看状态框-->
                    <el-col class="" :span="5" id="leftCard">
                        <el-card class="box-card grid-content cardAndTableMinHeight">
                            <div slot="header" class="clearfix ">
                                <span style="line-height: 35px">卡片名称</span>
                                    <el-button @click="leftCardClose()" class="el-icon-close" style="float: right; padding: 3px 0;font-size: 25px;vertical-align: top;color: rgb(16, 16, 16)" type="text"></el-button>
                            </div>
                            <!--<div v-for="o in 4" :key="o" class="text item">-->
                                <!--{{'列表内容 ' + o }}-->
                            <!--</div>-->
                            <div>

                            </div>
                        </el-card>
                    </el-col>

                    <!--右侧表格及分页-->
                    <el-col :span="19" id="rightTable">
                        <div class="grid-content cardAndTableMinHeight" style="padding: 20px">
                            <el-table
                                    :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                                    border
                                    style="width: 100%">
                                <el-table-column
                                        width="53"
                                        type="index"
                                        :index="indexMethod">
                                </el-table-column>
                                <el-table-column
                                        prop="date"
                                        label="批号">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="频率类型">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="最小频率值（MHz）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="最大频率值（MHz）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="重频类型">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="最小重频值（us）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="最大重频值（us）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="脉宽类型">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="脉宽（us）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="脉内调制类型">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="幅度（dB）">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="到达时间">
                                </el-table-column>
                                <el-table-column
                                        prop="address"
                                        label="截获次数">
                                </el-table-column>
                            </el-table>
                            <div class="tabListPage" style="text-align: right">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        background
                                        layout="prev, pager, next"
                                        :page-size="PageSize"
                                        :total="totalCount"
                                        >
                                </el-pagination>
                                <!--<el-pagination-->

                                               <!--:current-page="currentPage"-->
                                               <!--:page-sizes="pageSizes"-->
                                                <!--layout="total, sizes, prev, pager, next, jumper"-->
                                               <!--&gt;-->
                                <!--</el-pagination>-->
                            </div>
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
                ],
                //--分页
                //总数据
                tableData:[{
                    date: '2016-05-02',
                    name: 'zly',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-03',
                    name: 'ydt',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                // 默认显示第几页
                currentPage:1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount:17,
                // 个数选择器（可修改）
                // pageSizes:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
                // 默认每页显示的条数（可修改）
                PageSize:15,
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
                        document.getElementById("leftCard").style.display="";
                        document.getElementById("rightTable").style.width="79.16667%"
                        break;
                }
                this.leftSettingCurrent=index;
            },
            clickRightSettingButton(index,event){
                this.rightSettingCurrent = index;

            },indexMethod(index) {
                return index+1;
            },getData(){
                // 这里使用axios，使用时请提前引入
                // axios.post(url,{
                //         orgCode:1
                //     },{emulateJSON: true},
                //     {
                //         headers:{"Content-Type": "application/x-www-form-urlencoded;charset=utf-8",}
                //     }
                // ).then(reponse=>{
                //     console.log(reponse)
                //     // 将数据赋值给tableData
                //     this.tableData=data.data.body
                //     // 将数据的长度赋值给totalCount
                //     this.totalCount=data.data.body.length
                // })
            },
            // 分页
            // 每页显示的条数
            handleSizeChange(val) {
                // 改变每页显示的条数
                this.PageSize=val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage=1
            },
            // 显示第几页
            handleCurrentChange(val) {
                // 改变默认的页数
                this.currentPage=val
            },
            //左侧卡片框点击关闭
            leftCardClose(){
                document.getElementById("leftCard").style.display="none";
                document.getElementById("rightTable").style.width="100%"
                if(this.leftSettingCurrent==4){
                    this.leftSettingCurrent = -1;
                }

            }
        },
        created:function(){
            this.getData()
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
        width: 10%;
        height: 119px;
        vertical-align: top
    }
    .leftSettingDiv{
        margin-left: 33px;
    }
    .rightSettingDiv{
        margin-left: 15px;
    }
    /*设置框*/
    .setting{
        margin-top: 10px;
        width: 60px;
        height: 60px;
    }
    .grid-content {
        margin-top: 20px;
        text-align: center;
        border: 1px solid #c3c3c3;
        border-radius: 4px;
        min-height: 207px;
    }
    /*设置框的按钮样式*/
    .settingButton{
        background-color: red;
        color: white;
    }
    /*tab切换框设置*/
    .el-tabs__item{
        width: 200px;
        height: 67px;
        font-size: 16px;
        text-align: center;
        line-height: 67px;
    }
    /*解决Element中表格对不齐的问题*/
    .el-table th.gutter{
        display: table-cell!important;
    }
    .el-table th,.el-table tr td:first-child{
        font-weight: bold;
        background-color: rgb(232, 232, 232);
    }
    /*修改Element中表格的边框线颜色*/
    .el-table td, .el-table th.is-leaf,.el-table--border, .el-table--group{
        border-color: black;
    }
    .el-table--border::after, .el-table--group::after, .el-table::before{
        background-color: black;
    }

    /*ElementUi卡片框样式*/
    .text {
        font-size: 16px;
    }

    .item {
        margin-bottom: 18px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    /*左侧卡片框的样式*/
    .box-card {
        font-size: 16px;
        width: 100%;
        height: 100%;
        text-align: left;
    }
</style>
<style lang="scss" scoped>

</style>