<template>
  <div class="tab-box">
    <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick">
      <el-tab-pane label="实时XH" name="realTime">
        <el-table
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          :header-cell-style="{'background':'#e8e8e8'}"
          :cell-style="columnStyle"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column width="55" type="selection"></el-table-column>
          <el-table-column label="中心频率(MHz)">
            <template slot-scope="scope">{{ scope.row.mhz }}</template>
          </el-table-column>
          <el-table-column prop="khz" label="宽带(KHz)"></el-table-column>
          <el-table-column prop="dbm" label="幅度(dBm)" show-overflow-tooltip></el-table-column>
          <el-table-column prop="cnr" label="载噪比" show-overflow-tooltip></el-table-column>
          <el-table-column prop="first" label="首次发现时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="lastTime" label="末次发现时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="frequency" label="发现次数" show-overflow-tooltip></el-table-column>
          <el-table-column prop="remarks" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 分页效果 -->
        <el-pagination
          background
          :page-size="pagesize"
          layout="prev, pager, next"
          :total="tableData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="pages"
        ></el-pagination>
      </el-tab-pane>

      <el-tab-pane label="当前XH" name="current">配置管理</el-tab-pane>
      <el-tab-pane label="新发现XH" name="discoveries">角色管理</el-tab-pane>
      <el-tab-pane label="重要XH" name="important">定时任务补偿</el-tab-pane>
      <el-tab-pane label="一般XH" name="commonly">配置管理</el-tab-pane>
      <el-tab-pane label="已加XH" name="added">角色管理</el-tab-pane>
      <el-tab-pane label="未知XH" name="unknown">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 4, // 每页几条
      activeName: "realTime", // tab的默认值
      tableData: [
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "000",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: ""
        },
        {
          mhz: "300",
          khz: "040",
          dbm: "94",
          cnr: "36.6",
          first: "2020-06-18",
          lastTime: "2020-07-18",
          frequency: "10",
          remarks: "问题"
        }
      ]
    };
  },
  methods: {
    /**表格第一列颜色更改 */
    columnStyle({ columnIndex }) {
      if (columnIndex == 0) {
        return "background:#e8e8e8;";
      }
    },
    /**点击tab */
    handleClick() {},
    /* 获取到当前点击的一列 */
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    /* 页数改变时触发 */
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    /* 初始页数值改变时触发 */
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
  }
};
</script>
<style lang="less" scoped>
.tab-box {
  width: 100%;
  padding: 10px 15px;
  border-radius: 6px;
  margin-top:10px;
  box-sizing: border-box;
  background-color: #fff;
  .pages{
    margin-top:10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>