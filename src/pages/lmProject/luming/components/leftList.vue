<template>
    <div>
        <div class="timeList">
            <div class="block">
                <el-timeline>
                    <el-timeline-item
                            v-for="(activity, index) in activities"
                            :key="index"
                            :type="activity.type"
                            :timestamp="activity.timestamp"
                            :placement="activity.placement">
                        {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div>
            <el-button type="text" @click="open">信号屏蔽

            </el-button>

            <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%;border: 1px solid #333">
                <el-table-column
                        type="index"
                        width="50">
                </el-table-column>
                <el-table-column
                        property="date"
                        label="频率值(MHz)"
                        width="120">
                </el-table-column>
            </el-table>
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activities: [{
                    content: '打开xxxxxxxxxxxxxxxxxxx软件',
                    timestamp: '2020-11-11 20:46',
                    type: 'primary',
                    placement: 'top'
                }, {
                    content: '设置xxxxxxxxxxxxxxxxxxx参数',
                    timestamp: '2020-11-11 20:46',
                    type: 'primary',
                    placement: 'top'
                }, {
                    content: '关闭xxxxxxxxxxxxxxxxxxx软件',
                    timestamp: '2020-11-11 20:46',
                    type: 'primary',
                    placement: 'top'
                }, {
                    content: '关闭xxxxxxxxxxxxxxxxxxx软件',
                    timestamp: '2020-11-11 20:46',
                    type: 'primary',
                    placement: 'top'
                }],
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
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
                }],
                currentRow: null


            };
        },
        methods: {
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            open() {
                const h = this.$createElement;
                this.$msgbox({
                    title: '消息',
                    message: h('p', null, [
                        h('span', null, '内容可以是 '),
                        h('i', { style: 'color: teal' }, 'VNode')
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });
            }
        }
    };
</script>

<style lang="less" scoped>
.timeList{
    margin: 10px;
    margin-left: 50px;
}
</style>
