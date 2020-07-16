<template>
  <div>
    <div class="history-box">
      <!-- excel 区域 -->
      <div class="history-excel">
        <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%"
          id="out-table"
          @cell-click="seeClick"
        >
          <el-table-column prop="calling" label="主叫" width="60"></el-table-column>
          <el-table-column prop="called" label="被叫" width="60"></el-table-column>
          <el-table-column prop="call" label="呼入" width="60" height="40"></el-table-column>
          <el-table-column prop="d uration" label="时长" width="60"></el-table-column>
          <el-table-column prop="imei" label="IMEI" width="60"></el-table-column>
          <el-table-column prop="imsi" label="IMSI" width="60"></el-table-column>
          <el-table-column prop="longitude" label="经度" width="60"></el-table-column>
          <el-table-column prop="latitude" label="纬度" width="60"></el-table-column>
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
          <el-pagination
            background
            layout="total , prev, pager, next"
            :total="tableData.length"
            :page-size="10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            class="pages-page"
          ></el-pagination>
          <!-- 导出 exels -->
          <div class="pages-excel-box">
            <div class="pages-see" @click="open1">音频导出</div>
            <div class="pages-excel" @click="exportExcel">导出Excel</div>
          </div>
        </div>

        <!-- 轨迹 通联关系 -->
        <div class="trajectory-box">
          <el-tabs type="border-card">
            <el-tab-pane label="轨迹">
              <el-table
                :data="trajectoryData.slice((trajectoryPage-1)*trajectorySize,trajectoryPage*trajectorySize)"
                border
                style="width:100%"
              >
                <el-table-column prop="riselongitude" label="起点经度" width="180"></el-table-column>
                <el-table-column prop="riselatitude" label="起点纬度" width="180"></el-table-column>
                <el-table-column prop="endlongitude" label="钟点经度"></el-table-column>
                <el-table-column prop="endlatitude" label="终点纬度"></el-table-column>
              </el-table>
              <el-pagination
                @size-change="cardSizeChange"
                @current-change="cardCurrentChange"
                layout="total, prev, pager, next, jumper"
                :total="trajectoryData.length"
              ></el-pagination>
            </el-tab-pane>
            <el-tab-pane label="通联关系">
              <el-table :data="relationData" border style="width:100%">
                <el-table-column prop="calling" label="主叫"></el-table-column>
                <el-table-column prop="called" label="被叫"></el-table-column>
                <el-table-column prop="imei" label="IMEI"></el-table-column>
                <el-table-column prop="imsi" label="IMSI"></el-table-column>
                <el-table-column prop="frequency" label="通讯次数"></el-table-column>
                <el-table-column prop="call" label="最后通信记录时间"></el-table-column>
                <el-table-column prop="details" label="详情"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 地图区域 -->
      <div class="history-map">
        <div id="cesiumContainer" style="width:600px;height:400px;" class="fullSize"></div>
        <!-- 保存地图 -->
        <div class="map-keep">
          <div class="button" @click="savedClick">保存地图</div>
          <div class="button" @click="resetClick">清除地图</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
export default {
  data() {
    return {
      currentPage:1, //初始页
      pagesize:10,   // 每页几条
      trajectoryPage:1, // 轨迹初始页面
      trajectorySize:4, // 默认值  一页几列
      /** 
       * 通联关系 
      **/
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
        details:'详情',}], 
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
      }],
      tableData: [{
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        },
        {
          calling: "",
          called: "",
          call: "2020-07-02",
          duration: "0",
          imei: "",
          imsi: "",
          longitude: "0",
          latitude: "0",
          business: "语音",
          system: "GSP",
          see: "查看",
          details: "详情"
        }
      ],
      czml: [
        {
          id: "document",
          name: "box",
          version: "1.0"
        },
        {
          id: "shape2",
          name: "Red box with black outline",
          position: {
            cartographicDegrees: [116.2, 39.56, 300000.0]
          },
          box: {
            dimensions: {
              cartesian: [40000.0, 30000.0, 50000.0]
            },
            material: {
              solidColor: {
                color: {
                  rgba: [255, 0, 0, 128]
                }
              }
            },
            outline: true,
            outlineColor: {
              rgba: [0, 0, 0, 255]
            }
          }
        }
      ]
    };
  },
  methods: {
    // 音频播放
    seeClick(row, column) {
      if (column.property == "see") {
        this.outerVisible = true;
      }
    },
    /**
     * 语音保存
     **/
    open1() {
      this.$notify({
        title: "成功",
        message: "语音导出成功",
        type: "success"
      });
    },
    // 下载 excel 表格
    exportExcel() {
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* get binary string as output */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([wbout], { type: "application/octet-stream" }),
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSizeChange: function (size) {   
      this.pagesize = size; 
    }, 
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage; 
    },
    /**
     * 查看
    **/
    cardSizeChange(val) {
      this.trajectorySize = val;
    },
    cardCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /**清除软件**/
    resetClick(){
      alert('清除成功')
    },
    /**保存**/
    savedClick(){
      alert('保存成功')
    },
    /**
     * 地图部分
    **/
    ampBox(){
      var viewer = new Cesium.Viewer("cesiumContainer");
      var dataSourcePromise = Cesium.CzmlDataSource.load(this.czml);
      viewer.dataSources.add(dataSourcePromise);
    }
  },
  mounted(){
    this.ampBox()
  }
};
</script>

<style lang="less" scoped>
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
</style>