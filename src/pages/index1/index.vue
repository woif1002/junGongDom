<template>
  <div>
    <div class="broadband-box">
      <!-- 宽带监听 -->
      <el-tabs type="border-card" class="broadband-left">
        <el-tab-pane label="宽带时频">
          <div class="left-box">
            <p>新信号列表:活11 静 11 语音信号列表：活11 静11 新信号列表:活11 静 11 语音信号列表：活11 静11 新信号列表:活11 静 11 语音信号列表：活11 静11</p>
            <div class="left-list-box">
              <div :class="index == isIndex ?'left-list cur':'left-list'" v-for="(item,index) in 4" :key="index" :border="true" >
                <el-table :data="tableData" style="width: 100%" height="200" @cell-mouse-enter="aaa(index)" :border="true">
                  <el-table-column label="频率" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
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
            <!-- echarts 位置 折线图 -->
            <div id="broadband-two" style="width:800px;height:300px;"></div>

            <div class="start-box">
              <div class="start-list">
                <p>起始频率MHz</p><el-input v-model="input" placeholder="起始频率MHz"></el-input>
              </div>
              <div class="start-list">
                <p>起始频率MHz</p><el-input v-model="input1" placeholder="起始频率MHz"></el-input>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- 信号态势感知 -->
        <el-tab-pane label="信号态势感知">
            <!-- echarts 位置 -->
            <div id="myChart" :style="{width: '900px', height: '300px'}"></div>
            <!-- 起始MHz -->
            <div class="start-box">
              <div class="start-list">
                <p>起始频率MHz</p><el-input v-model="input" placeholder="起始频率MHz"></el-input>
              </div>
              <div class="start-list">
                <p>起始频率MHz</p><el-input v-model="input1" placeholder="起始频率MHz"></el-input>
              </div>
            </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 窄带 -->
      <div class="broadband-right">
        <p class="right-title">窄带监听</p>
        <div class="right-box">
          <div class="right-mhz">
            <!-- mhz top -->
            <div class="mhz-left">
              <div class="left-box">
                3333.33
              </div>
              <p>MHz</p>
            </div>
            <div class="mhz-right">
              <el-checkbox v-model="checked">锁定</el-checkbox>
              <p style="margin:0 auto;width:13px;">
                <i class="el-icon-star-on" style="color:blue;width:100%"></i>
              </p>
              
            </div>
          </div>
          <!-- 录制时长 -->
          <div class="right-tiem">
            <div class="tiem-horn">
              <div class="horn-left">
                <img src="./assets/images/horn.png">
                <el-checkbox v-model="checked1"></el-checkbox>
              </div>
              <div class="horn-right">
                <el-checkbox v-model="checked2"></el-checkbox>
                <img src="./assets/images/horn.png">
              </div>
            </div>
            <!-- 录制时长 -->
            <div class="tiem-length">
              <div class="length-img" @click="tiemClick">
                <img src="./assets/images/sound.png">
              </div>
              <div class="length-text">
                录制时长：{{}}分
              </div>
            </div>
          </div>
          <!-- fm 多选表格 -->
          <div class="right-fm">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="input-length">
              <el-select v-model="formInline.fm" placeholder="Fm">
                <el-option label="FM" value="shanghai"></el-option>
                <el-option label="FM" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            </el-form>
            <!-- 两个多选 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item class="input-length">
              <el-select v-model="formInline.region" placeholder="自动录音">
                <el-option label="FM" value="shanghai"></el-option>
                <el-option label="FM" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input-length">
              <el-select v-model="formInline.user" placeholder="自动控守">
                <el-option label="FM" value="shanghai"></el-option>
                <el-option label="FM" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import brokenJson from './serve/aqi-beijing.json'

export default {
  data() {
    return {
      formInline: {
        user: '',
        region: '',
        fm:'',
      },
      input: '',
      input1:'',
      checked:true,
      checked1:true,
      checked2:true,
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        isIndex:3,
    };
  },
  mounted(){
    this.broadbandTwo();
    this.brokenClick();
  },
  methods:{
    aaa(i){
        this.isIndex = i
    },
    broadbandTwo(){
        let myChart = this.$echarts.init(document.getElementById('broadband-two'));
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun','00','11','22','33']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130,89,520,157,9],
                type: 'line',
                symbol: 'triangle',
                symbolSize: 1,
                lineStyle: {
                    color: 'green',
                    width: 1,
                },
                itemStyle: {
                    borderWidth: 3,
                    borderColor: 'yellow',
                    color: 'transparent'
                }
            },{
                data: [100, 20, 50, 180, 90, 19, 640,548,521,685,58],
                type: 'line',
                symbol: 'triangle',
                symbolSize: 1,
                lineStyle: {
                    color: 'red',
                    width: 1,
                },
                itemStyle: {
                    borderWidth: 3,
                    borderColor: 'red',
                    color: 'transparent'
                }
            }]
        })
    },
    // 窄带第三个图
    brokenClick(){
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption({
            // title: {
            //     text: 'Beijing AQI'
            // },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: brokenJson.map(function (item) {
                    return item[0];
                })
            },
            yAxis: {
                splitLine: {
                    show: false
                }
            },
            dataZoom: [{
                startValue: '2014-06-01'
            }, {
                type: 'inside'
            }],
            visualMap: {
                top: 10,
                right: 10,
                pieces: [{
                    gt: 0,
                    lte: 50,
                    color: '#096'
                }, {
                    gt: 50,
                    lte: 100,
                    color: '#ffde33'
                }, {
                    gt: 100,
                    lte: 150,
                    color: '#ff9933'
                }, {
                    gt: 150,
                    lte: 200,
                    color: '#cc0033'
                }, {
                    gt: 200,
                    lte: 300,
                    color: '#660099'
                }, {
                    gt: 300,
                    color: '#7e0023'
                }],
                outOfRange: {
                    color: '#999'
                }
            },
            series: {
                name: 'Beijing AQI',
                type: 'line',
                data: brokenJson.map(function (item) {
                    return item[1];
                }),
                markLine: {
                    silent: true,
                }
            }
        });
    },
    // 点击开始计时
    tiemClick(){
      
    }
  }
};
</script>
<style lang="less" scoped>
.start-box{
  display: flex ;
  .start-list{
    display: flex;
    align-items: center;
    p{
      width:110px;
      margin-right:20px;
    }
  }
  .start-list:nth-child(2){
    margin-left:20px;
  }
}

.broadband-box {
  display: flex;
  .broadband-left {
    width: 75%;
    background-color: #fff;
    .left-box {
      padding: 10px;
      box-sizing: border-box;
      background-color: #fff;
      p {
        color: #000;
      }
      .left-list-box {
        width: 100%;
        display: flex;
        margin-top:20px;
        .left-list {
            width:158px;
            margin-right:10px;
            &.cur{
                width:410px;
            }
        }
      }
    }
  }

  .broadband-right {
    width: 22%;
    margin-left:auto;
    .right-title{
        color:blue;
        font-size:20px;
        text-align: center;
    }
    .right-box{
        margin-top:10px;
        padding:10px 5px;
        border-radius: 6px;
        border:1px solid #999;
        .right-mhz{
          display: flex;
          .mhz-left{
            display: flex;
            .left-box{
              width:100px;
              height:50px;
              text-align: center;
              line-height: 50px;
              background-color:blue;
              border-radius: 4px;
              color:#fff;
            }
            p{
              font-size: 12px;
              margin-top:30px;
              margin-left:10px;
            }
          }
          .mhz-right{
            padding-left:40px;
            img{
              width:20px;
              height:20px;
              margin-left:5px;
            }
          }
        }
      .right-tiem{
        display: flex;
        margin-top:10px;
        .tiem-horn{
          width:100px;
          height:20px;
          display: flex;
          .horn-left,.horn-right{
            img{
              width:15px;
              height:15px;
              margin:0 2px;
            }
          }
          .horn-left{
            img{
              transform:rotate(180deg)
            }
          }
          .horn-right{
            margin-left:auto;
          }
        }
        .tiem-length{
          width:180px;
          text-align: center;
          margin-left:10px;
          .length-img{
            width:20px;
            height:20px;
            margin:0 auto;
            img{
              width:100%;
            }
          }
          .length-text{
            padding:20px 10px 10px 0;
            box-sizing: border-box;
            font-size: 14px;
          }
        }
      }

      .right-fm{
        margin-top:-33px;
        .demo-form-inline{
          .input-length{
            width:105px;
            height:40px;
          }
        }
      }
    }
  }
}
</style>