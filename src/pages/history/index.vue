<template>
  <div class="history">
    <!-- 电话号码 开始时间  input -->
    <div class="from-box">
      <!-- 电话号码部分 -->
      <div class="from-phone">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item >
            <el-select v-model="formInline.region" placeholder="电话号码">
              <el-option label="电话号码" value="phone"></el-option>
              <el-option label="波段" value="band"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="formInline.user" placeholder=""></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 起始状态 -->
      <div class="from-start">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <!-- 查询按钮 -->
      <div class="from-query">
        <div class="button">轨迹查询</div>
        <div class="button">通讯关系查询</div>
      </div>
    </div>


    <!-- excel 与地图组块 -->
    <div class="history-box">
      <!-- excel 区域 -->
      <div class="history-excel">
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" id="out-table"  @cell-click="seeClick">
          <el-table-column prop="calling" label="主叫" width="60"></el-table-column>
          <el-table-column prop="called" label="被叫" width="60"></el-table-column>
          <el-table-column prop="call" label="呼入" width="60" height="40"></el-table-column>
          <el-table-column prop="d uration" label="时长" width="60"></el-table-column>
          <el-table-column prop="imei" label="IMEI" width="60"></el-table-column>
          <el-table-column prop="imsi" label="IMSI" width="60"></el-table-column>
          <el-table-column prop="longitude" label="经度" width="60"></el-table-column>
          <el-table-column prop="latitude"  label="纬度" width="60"></el-table-column>
          <el-table-column prop="business" label="业务" width="60"></el-table-column>
          <el-table-column prop="system" label="体制" width="60"></el-table-column>
          <el-table-column prop="see" label="查看" width="60">
            <template>
              <i class="el-icon-time"></i>
            </template>
          </el-table-column>
          <el-table-column prop="details" label="详情" width="60">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.details }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pages-box">
          <el-pagination background layout="total , prev, pager, next" :total="tableData.length" :page-size="10" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" class="pages-page"></el-pagination>
          <!-- 导出 exels -->
          <div class="pages-excel-box">
            <div class="pages-see" @click="open1">
              音频导出
            </div>
            <div class="pages-excel" @click="exportExcel">
              导出Excel
            </div>
          </div>
        </div>
        
          <!-- 轨迹 通联关系 -->
      <div class="trajectory-box">
        <el-tabs type="border-card">
          <el-tab-pane label="轨迹">
            <el-table :data="trajectoryData.slice((trajectoryPage-1)*trajectorySize,trajectoryPage*trajectorySize)" border style="width:100%">
            <el-table-column prop="riselongitude" label="起点经度" width="180"></el-table-column>
              <el-table-column prop="riselatitude" label="起点纬度" width="180"></el-table-column>
              <el-table-column prop="endlongitude" label="钟点经度">
              </el-table-column>
              <el-table-column prop="endlatitude" label="终点纬度">
              </el-table-column>
            </el-table>
            <el-pagination @size-change="cardSizeChange" @current-change="cardCurrentChange" layout="total, prev, pager, next, jumper" :total="trajectoryData.length">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="通联关系">
            <el-table :data="relationData" border style="width:100%">
              <el-table-column prop="calling" label="主叫"></el-table-column>
              <el-table-column prop="called" label="被叫"></el-table-column>
              <el-table-column prop="imei" label="IMEI">
              </el-table-column>
              <el-table-column prop="imsi" label="IMSI">
              </el-table-column>
              <el-table-column prop="frequency" label="通讯次数">
              </el-table-column>
              <el-table-column prop="call" label="最后通信记录时间"></el-table-column>
              <el-table-column prop="details" label="详情">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>

      </div>
      <!-- 地图区域 -->
      <div class="history-map"> 
        <div id="map1" style="width:600px;height:400px;"></div>
        <!-- 保存地图 -->
        <div class="map-keep">
          <div class="button">保存地图</div>
          <div class="button">清除地图</div>
        </div>
      </div>
    </div>

    <!-- 语音播放部分 -->
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <div class="audio-box">
        <p>简单使用</p>
        <m-audio :src="src" text="点击这里播放"></m-audio>
      </div>
      <!-- 另一个播放  方法-->
      <div>
        <audio-wave style="width:1080px" ref="AudioWave" :tagChooseList="tagChooseList"></audio-wave>
      </div>
      <!-- 取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 提示保存成功 -->
    <!-- <div id="map1" style="width:800px;height:400px;"></div> -->
  </div>
  
</template>

<script>
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
// import optionMap from './assets/js/echarts.js'

export default {
  data(){
    return{
      tagChooseList:["偏高","正常","偏低"], // 音量波段代码
      sectionList:[{
        startTime: "0:00.00",//音频段开始时间，分:秒.毫秒
        endTime: "0:01.57",//音频段结束时间，分:秒.毫秒
        tag: 1,//当前标记内容
        startLeft: "8.67%",
        endLeft: "24.33%",
        isPlaySection: true,//音频段播放按钮
        chevronType: true,//音频段是否展开
        chooseTag: true//音频段展开框中选择框是否展开
      }],
      src:require('./assets/js/transaction.mp3'),
      currentPage:1, //初始页
      pagesize:10,
      outerVisible: false,
      innerVisible: false,
      value1: '',
      value2: '',
      formInline: {
        user: '',
        region: ''
      },   //查询
      activeIndex:'1', //tabs 默认值
      trajectorySize:4, // 默认值  一页几列
      trajectoryPage:1, // 轨迹初始页面
      trajectoryData: [{
        riselongitude:'0',
        riselatitude:'0', 
        endlongitude:'0',
        endlatitude:'0', 
        },{
        riselongitude:'0',
        riselatitude:'0', 
        endlongitude:'0',
        endlatitude:'0', 
        },{
        riselongitude:'0',
        riselatitude:'0', 
        endlongitude:'0',
        endlatitude:'0', 
        },{
        riselongitude:'0',
        riselatitude:'0', 
        endlongitude:'0',
        endlatitude:'0', 
        },{
        riselongitude:'0',
        riselatitude:'0', 
        endlongitude:'0',
        endlatitude:'0', 
        },{
        riselongitude:'0',
        riselatitude:'0', 
        endlongitude:'0',
        endlatitude:'0', 
        }], //轨迹
      relationData:[{
        calling: '',
        called: '',
        imei:'',  
        imsi:'',
        frequency:'',
        call:'2020-07-02',
        details:'详情',
        },{
        calling: '',
        called: '',
        imei:'',  
        imsi:'',
        frequency:'',
        call:'2020-07-02',
        details:'详情',}], //通联关系
      tableData: [{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情',
        },{
        calling: '',
        called: '',
        call:'2020-07-02',
        duration:'0',  
        imei:'',  
        imsi:'',
        longitude:'0',
        latitude:'0', 
        business:'语音',  
        system:'GSP',  
        see:'查看',  
        details:'详情'}],
        czml:[{
          "id" : "document",
          "name" : "box",
          "version" : "1.0"
         },{
          "id" : "shape2",
          "name" : "Red box with black outline",
          "position" : {
            "cartographicDegrees" : [116.20, 39.56, 300000.0]
          },
          "box" : {
              "dimensions" : {
                "cartesian": [40000.0, 30000.0, 50000.0]
              },
              "material" : {
                "solidColor" : {
                  "color" : {
                    "rgba" : [255, 0, 0, 128]
                  }
                }
              },
              "outline" : true,
              "outlineColor" : {
                "rgba" : [0, 0, 0, 255]
              }
          }
      }]
    } 
  },
  mounted(){
    this.map();
    // this.$refs.AudioWave._initAudio(this.src, this.sectionList);
    // tagList = this.$refs.AudioWave.tagList;
    console.log(this.$refs.AudioWave.tagList,'----------');
  },
  methods:{
      handleSizeChange: function (size) {   
        this.pagesize = size; 
      }, 
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage; 
      }, 
      // 下载 excel 表格 
      exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
      } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
      return wbout
    },
    // 音频播放
    seeClick(row,column){
      if(column.property == 'see'){
        this.outerVisible = true
      }
    },
    // 语音保存
    open1() {
      this.$notify({
        title: '成功',
        message: '语音导出成功',
        type: 'success'
      });
    },
    // 百度地图
    map(){
      // let mymap = this.$echarts.init(document.getElementById('map'));
      // var mapchart = this.$echarts.init(document.getElementById('map1'));
      // mapchart.setOption(optionMap);
      // window.onresize=function(){
      //   // resizeMyChartContainer(); 
      //   mapchart.resize();
      // }
      const viewer = new Cesium.Viewer('map1');
      var dataSourcePromise = Cesium.CzmlDataSource.load(this.czml);
      viewer.dataSources.add(dataSourcePromise);
      viewer.zoomTo(dataSourcePromise)
    },
    
    
    cardSizeChange(val) {
      this.trajectorySize = val;
    },
    cardCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>
<style lang="less" scoped>
/* 头部from单位置*/
.from-box{
  display:flex;
  margin:10px 0;
 
}
// 按钮公用部分
.from-query,.map-keep{
  display: flex;
  .button{
    width:100px;
    height:40px;
    margin:0 10px;
    font-size: 14px;
    border-radius: 6px;
    background-color:#3291F8;
    text-align: center;
    color:#fff;
    line-height: 40px;
  }
}
// 保存清除地图
.map-keep{
  margin-top:10px;
  margin-left:auto;
}


.history-box{
  display: flex;
  .history-map{
    margin-left:auto;
  }
}

.pages-box{
  display: flex;
  margin-top:20px;
  .pages-page{
    width:300px;
  }
  .pages-excel-box{
    display: flex;
    margin-left:auto;
    div{
      width:80px;
      padding:10px;
      border-radius: 4px;
      background-color:#3291F8;
      text-align: center;
      color:#fff;
    }
    .pages-see{
      margin-right:15px;
    }
  }
}

// 轨迹 通联关系
.trajectory-box{
  margin-top:20px;
}
.audio-box{
  width:100px;
  margin:0 auto;
  p{
    padding-bottom:10px;
    text-align: center;
  }
}
</style>