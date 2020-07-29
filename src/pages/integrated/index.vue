<template>
  <div class="integ">
    <!-- 头部 -->
    <div class="integ-tab">
      <div class="tab-box">
        <div
          :class="isEvents == 1 ?'tab-list':'tab-list cur'"
          v-for="(item,index) in editableTabs"
          :key="index"
          @click="listClick(item)"
        >
          <i class="el-icon-s-tools icon"></i>
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
    <!-- 下方划分 -->
    <div class="integ-box">
      <!-- 左侧 -->
      <div class="integ-left">
        <div class="left-echart">
          <div id="spectrum"></div>
        </div>
        <div class="left-echart">
          <div id="waterfall"></div>
        </div>
        <my-tab></my-tab>
      </div>
      <!-- 右侧 -->
      <div class="integ-right"></div>
    </div>
  </div>
</template>

<script>
import myTab from "./cnmponents/tab";
export default {
  data() {
    return {
      editableTabsValue: "2",
      isEvents: "1",
      editableTabs: [
        {
          title: "扫频侦查",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "定频简册",
          name: "2",
          content: "Tab 2 content"
        },
        {
          title: "DDC通道",
          name: "3",
          content: "Tab 2 content"
        },
        {
          title: "调解通道",
          name: "4",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  components: {
    myTab
  },
  mounted(){
    this.spectrum()
  },
  methods: {
    listClick(i) {
      if (i.name > 1) {
        this.isEvents == 2;
      }
    },
    spectrum() {
      var dataCount = 5e5;
      var data = generateData(dataCount);
      let spectrum = this.$echarts.init(document.getElementById('spectrum'));
      let cehartsinit = this.$echarts;
      var option = {
        title: {
          text: cehartsinit.format.addCommas(dataCount) + " Data",
          left: 10
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [
          {
            type: "inside"
          },
          {
            type: "slider"
          }
        ],
        xAxis: {
          data: data.categoryData,
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: "bar",
            data: data.valueData,
            // Set `large` for large data amount
            large: true
          }
        ]
      };

      function generateData(count) {
        var baseValue = Math.random() * 1000;
        var time = +new Date(2011, 0, 1);
        var smallBaseValue;

        function next(idx) {
          smallBaseValue =
            idx % 30 === 0
              ? Math.random() * 700
              : smallBaseValue + Math.random() * 500 - 250;
          baseValue += Math.random() * 20 - 10;
          return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
        }

        var categoryData = [];
        var valueData = [];

        for (var i = 0; i < count; i++) {
          categoryData.push(
            cehartsinit.format.formatTime("yyyy-MM-dd\nhh:mm:ss", time)
          );
          valueData.push(next(i).toFixed(2));
          time += 1000;
        }

        return {
          categoryData: categoryData,
          valueData: valueData
        };
      }
      spectrum.setOption('spectrum')
    }
  }
};
</script>
<style>
body {
  background-color: #f1f1f1;
}
</style>
<style lang="less" scoped>
.integ {
  width: 1200px;
  margin: 0 auto;
  .integ-tab {
    width: 100%;
    border-radius: 6px;
    .el-icon-date {
      display: flex;
      margin: 0 auto;
    }
    .tab-box {
      display: flex;
      width: 100%;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 6px;
      .tab-list {
        width: 60px;
        padding: 0 15px;
        text-align: center;
        .icon::before {
          font-size: 36px;
        }
        p {
          margin-top: 10px;
        }
        &.cur {
          pointer-events: none;
        }
      }
    }
  }
}

.integ-box {
  width: 100%;
  margin-top: 10px;
  display: flex;
  .integ-left {
    width: 95%;
  }
  .integ-right {
    width: 3%;
    background-color: #fff;
    margin-left: auto;
  }
}
</style>