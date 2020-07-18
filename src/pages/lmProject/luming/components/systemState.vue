<template>
    <div>
        <el-row :gutter="20">
            <el-col :xs="10" :sm="10" :md="10" :lg="12" :xl="12">
                <div class="grid-content bg-purple">
                    <ul>
                        <li class="li_list">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                GPS时间获取
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list">
                            <el-button type="text" @click="zijian_btn = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                前端状态自检
                            </el-button>
                            <el-dialog
                                    title="前端状态自检"
                                    :visible.sync="zijian_btn"
                                    width="30%"
                                    :before-close="handleClose">
                                <span><hr/></span>
                                <zijian/>
                                <span slot="footer" class="dialog-footer">
                                    <el-button type="primary" @click="zijian_btn = false" style="color: white">确 定</el-button>
                            </span>
                            </el-dialog>
                        </li>
                        <li class="li_list">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                衰减控制参数
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                射频前端控制
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                采集处理设置
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                系统状态查看
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                    </ul>
                    <div class="li_bottom">高速数据采集</div>
                </div>
            </el-col>
            <el-col :xs="10" :sm="10" :md="10" :lg="12" :xl="12">
                <div class="grid-content bg-purple-light">
                    <ul>
                        <li class="li_list_btn">
                            <button class="zhu">开始存储</button>
                        </li>
                        <li class="li_list_btn">
                            <button class="wei">停止存储</button>
                        </li>
                        <li class="li_list_right">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                采集处理索引读取
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list_right">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                中频数据读取
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list_right">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                PDW数据存储设
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list_right">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                PDW数据索引读
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                        <li class="li_list_right">
                            <el-button type="text" @click="dialogVisible = true">
                                <div class="li_icon">
                                    <i class="el-icon-s-tools"></i>
                                </div>
                                PDW数据读取
                            </el-button>
                            <el-dialog
                                    title="提示"
                                    :visible.sync="dialogVisible"
                                    width="30%"
                                    :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
                            </el-dialog>
                        </li>
                    </ul>
                    <div class="li_bottom">数据存储管理</div>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :xs="21" :sm="21" :md="21" :lg="24" :xl="24">
                <div class="grid-content bg-purple center">
                    <el-table
                            ref="singleTable"
                            :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)"
                            highlight-current-row
                            :header-cell-style="styleObj"
                            :row-key="rowStyle"
                            @current-change="handleCurrentChange"
                            border="true"
                            style="width: 100%">
                        <el-table-column
                                type="index"
                                width="50">
                        </el-table-column>
                        <el-table-column
                                property="date"
                                label="批号"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                property="name"
                                label="频率类型"
                                width="120">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="最小频率值(MHz)">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="最大频率值(MHz)">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="重频类型">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="最小重频值(us)">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="最大重频值(us)">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="脉宽类型">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="脉宽(us)">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="脉内调制类型">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="幅度 (dB)">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="到达时间">
                        </el-table-column>
                        <el-table-column
                                property="address"
                                label="截获次数">
                        </el-table-column>
                    </el-table>
                    <div class="page">
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :page-size="PageSize"
                                :current-page="currentPage"
                                :total="this.tableData.length"
                                @current-change="cc"
                        >
                        </el-pagination>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import zijian from './SystemStateButton/zijianBtn'
    export default {
        components:{
            zijian
        },
     data() {
         return {
             // 默认显示第几页
             currentPage:1,
             // 默认每页显示的条数（可修改）
             PageSize:8,
             styleObj: {
                 'color':'#fff',
                 'background-color':'#666'
             },
             rowStyle:{
                 'color':'#fff',
                 'background-color':'#666'
             },
             dialogVisible: false,
             zijian_btn:false,
             tableData: [{
                 date: '2016-05-02',
                 name: '王小虎',
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
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }, {
                 date: '2016-05-03',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1516 弄'
             }],
             currentRow: null
         };
     },
     methods: {
         handleClose(done) {
             this.$confirm('确认关闭？')
                 .then(_ => {
                     done();
                 })
                 .catch(_ => {});
         },cc:function (currentPage) {
             this.currentPage=currentPage;
         }
     }
 };

</script>

<style>
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        border: 1px solid #7b7b7b;
    }
    .bg-purple-light {
        border: 1px solid #7b7b7b;
        height: 177px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        overflow: hidden;
        padding: 20px 0px;
    }
    .li_list{
        float: left;
        margin:0 2%;
        border: 1px solid white;
        padding: 5px;
    }
    .li_list span{
        color: black;
    }
    .li_list_right{
        float: left;
        border: 1px solid white;
        margin: 0 1%;
    }
    .li_list_btn{
        float: left;
        border: 1px solid white;
        margin-left: 20px;
    }
    .li_list_right span{
        color: black;
    }
    .li_list_btn .zhu,.wei{
        width: 100px;
        height: 150px;
        border-radius: 4px;
        border: 0;
        color: white;
        font-size: 18px;
        font-weight: bold;
        margin-left: 5%;
    }
    .zhu{
        background: #1799e9;
    }
    .wei{
        background: red;
    }
    .li_icon{
        width: 90px;
        height: 90px;
        margin: 0 auto;
        color: black;
    }
    .el-icon-s-tools{
        font-size: 80px;
    }
    .li_list:hover{
        border: 1px solid #1eb2e9;
        border-radius: 4px;
    }
    .li_list:hover>button span{
        color: #1eb2e9;
    }
    .li_list_right:hover{
        border: 1px solid #1eb2e9;
        border-radius: 4px;
    }
    .li_list_right:hover>button span{
        color: #1eb2e9;
    }
    .li_list:hover .li_icon{
        color: #1eb2e9;
    }
    .li_list_right:hover .li_icon{
        color: #1eb2e9;
    }
    .li_bottom{
        clear: left;
        width: 100%;
        line-height: 30px;
        height: 30px;
        text-align: center;
        font-size: 16px;
    }
    /*中间样式*/
    .center{
        margin-top: 20px;
    }
    /*分页样式*/
    .page{
        float: right;
        margin: 30px 0;
    }
    /*按钮内部样式*/
    .el-dialog__title{
        font-size: 20px;
        font-weight: bold;
        color: black;

    }
</style>
