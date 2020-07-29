<template>
  <div class="home">
    <div class="home-box">
      <!-- 主页左侧 -->
      <div class="home-left">
        <my-left></my-left>
      </div>
      <!-- 主页右侧 -->
      <div class="home-right">
        <!-- 地图位置 -->
        <div class="home-map">
          <div id="map"></div>
        </div>
        <!-- tabs 切换位置 -->
        <div class="home-tab">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="操作日志" name="first">
              <el-table
                :data="tableData.slice((initPages-1)*pageSize,initPages*pageSize)"
                border
                borderstyle="width: 100%"
              >
                <el-table-column prop="date" label="时间" width="180"></el-table-column>
                <el-table-column prop="name" label="日志"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="业务日志" name="second">
              <el-table
                :data="tableData.slice((initPages-1)*pageSize,initPages*pageSize)"
                border
                borderstyle="width: 100%"
              >
                <el-table-column prop="date" label="时间" width="180"></el-table-column>
                <el-table-column prop="name" label="日志"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="实时数据" name="third">
              <div class="real-box">
                <el-checkbox v-model="bgan">BGAN</el-checkbox>
                <el-checkbox v-model="gsps">GSPS</el-checkbox>
                <el-checkbox v-model="thuraya">Thuraya</el-checkbox>
                <el-checkbox v-model="lridium">lridium</el-checkbox>
                <div class="button">清除业务</div>
              </div>
              <!-- 表格 -->
              <div class="form-table">
                <el-table
                  :data="fromData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  border
                  style="width: 100%"
                  id="out-table"
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
                <el-pagination
                  background
                  layout="total , prev, pager, next"
                  :total="fromData.length"
                  :page-size="10"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  class="pages-page"
                ></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="语音播放" name="fourth"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myLeft from './components/left'
export default {
  components:{
    myLeft,
  },
  data() {
    return {
      activeName: "first",
      bgan: true,
      gsps: true,
      thuraya: true,
      lridium: true,
      initPages: 1,
      pageSize: 10,
      currentPage: 1, //初始页
      pagesize: 10,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        },
        {
          date: "2016-05-02",
          name: "王小虎"
        },
        {
          date: "2016-05-04",
          name: "王小虎"
        },
        {
          date: "2016-05-01",
          name: "王小虎"
        },
        {
          date: "2016-05-03",
          name: "王小虎"
        }
      ],
      fromData: [
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
      ]};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const viewer = new Cesium.Viewer("map",{
        selectionIndicator: false,
        infoBox: false,
        // 注释时相当于使用默认地形，解开注释相当于使用全球地形
        terrainProvider: Cesium.createWorldTerrain(),
        sceneMode: Cesium.SceneMode.SCENE2D,
      });
      //几何绘制
      var gemeotryDraw = {
        //绘制长方体
        cuboidDraw: function() {
          //难点在于回环的理解,画回环,需要先画出这个多边形,然后在这个多边形里,挖出一块来
          //通过经纬度,笛卡尔坐标系,定义多边形的四个顶点
          var positions = Cesium.Cartesian3.fromDegreesArray([
            105,
            20,
            117,
            20,
            122,
            30,
            105,
            30
          ]);
          //同理,定义需要挖的形状的四个顶点
          var hole = Cesium.Cartesian3.fromDegreesArray([
            110,
            23,
            112,
            23,
            115,
            27,
            110,
            27
          ]);
          //定义需要传给hierrchy的参数
          var x = {
            positions: positions,
            //由于挖的这个洞,是x本身的一种数组集合,所以每一个对象里,又是一个x的形式
            holes: [{ positions: hole }]
          };
          var cuboid = viewer.entities.add({
            name: "长方体",
            polygon: {
              hierarchy: x,
              height: 10000,
              //extrudedHeight: 21000,
              outline: true,
              outlineWidth: 100,
              //fill: false,
              arcType: Cesium.ArcType.RHUMB,
              material: Cesium.Color.RED
            }
          });
          viewer.zoomTo(cuboid);
        },
        clear: function() {}
        //绘制圆形
      };
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    map() {}
  }
};
</script>
<style>
body{
  background-color:#f1f1f1;
}
</style>
<style lang="less" scoped>
.home-box {
  display: flex;
  width:1200px;
  margin:0 auto;
  margin-top: 20px;
  .home-left {
    width: 25%;
    padding:10px;
    background-color: #fff;
    border-radius:10px;
  }

  .home-right {
    width: 70%;
    margin-left: auto;
  }
}
.form-table {
  margin-top: 20px;
}

.real-box {
  display: flex;
  align-items: center;
  .button {
    width: 100px;
    height: 40px;
    margin: 0 10px;
    font-size: 14px;
    border-radius: 6px;
    background-color: #3291f8;
    text-align: center;
    color: #fff;
    line-height: 40px;
  }
}
.home-tab {
  margin-top: 20px;
}
</style>