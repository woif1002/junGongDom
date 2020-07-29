<template>
  <div>
    <el-tabs type="border-card">
      <!-- tabl 表格 -->
      <el-tab-pane label="宽带时频">
        <div class="tab-left-box">
          <div
            v-for="(item,index) in 4"
            :key="index"
            :class=" index == selectIndex ? 'tab-left cur':'tab-left'"
          >
            <el-table
              :data="tableData"
              style="width: 100%"
              height="200"
              :border="true"
              @cell-mouse-enter="hoverClick(index)"
              @cell-mouse-leave="hover"
            >
              <el-table-column label="频率" width="150">
                <template slot-scope="scope">
                  <!-- <template slot-scope="scope"> -->
                    <!-- {{scope.row.url}} -->
                    <img :src="scope.row.url == 1?'https://pic.rmb.bdstatic.com/46051605ba7d2ec4a5878f3a98d94451.jpeg':''" style="width:10px;height:10px;">
                  <!-- </template> -->
                  
                  <!-- <i class="el-icon-time"></i> -->
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="宽带" width="80"></el-table-column>
              <el-table-column prop="province" label="峰值" width="80"></el-table-column>
              <el-table-column prop="city" label="音噪比" width="80"></el-table-column>
              <el-table-column prop="address" label="出现次数" width="80"></el-table-column>
              <el-table-column prop="zip" label="时间" width="80"></el-table-column>
              <el-table-column prop="zip" label="解调方法" width="80"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <!-- echarts  折线图 -->
      <el-tab-pane label="信号态势感知">
        <div id="shiyujie"></div>
        <div id="myEcharts"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      urlData:require('../assets/images/logo.png'),
      selectIndex: 2,
      tableData: [
        {
          url:1,
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          url:2,
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ]
    };
  },
  mounted() {
    this.initZhexian();
    this.initMy();
  },
  methods: {
    hoverClick(index) {
      this.selectIndex = index;
    },
    hover() {
      this.selectIndex = 3;
    },
    /**折线图**/
    initZhexian() {
      let initZhexian = this.$echarts.init(document.getElementById("shiyujie"));

      initZhexian.setOption({
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    },
    // 动态数据 + 时间坐标轴
    initMy() {
      var data = [];
      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }

      option = {
        title: {
          text: "动态数据 + 时间坐标轴"
        },
        tooltip: {
          trigger: "axis",
          formatter: function(params) {
            params = params[0];
            var date = new Date(params.name);
            return (
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear() +
              " : " +
              params.value[1]
            );
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false
          }
        },
        series: [
          {
            name: "模拟数据",
            type: "line",
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }
        ]
      };

      setInterval(function() {
        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }

        myChart.setOption({
          series: [
            {
              data: data
            }
          ]
        });
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.tab-left-box {
  width: 100%;
  display: flex;
  .tab-left {
    width: 150px;
    margin-right: 10px;
    &.cur {
      width: 410px;
    }
  }
}
#shiyujie,
#myEcharts {
  width: 500px;
  height: 400px;
}
</style>