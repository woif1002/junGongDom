<template>
  <div class="home">
    <div class="home-box">
      <!-- 主页左侧 -->
      <div class="home-left">
        <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" node-key="id" :default-expanded-keys="[1]"></el-tree>
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
              <el-table :data="tableData.slice((initPages-1)*pageSize,initPages*pageSize)" border borderstyle="width: 100%">
                <el-table-column prop="date" label="时间" width="180"></el-table-column>
                <el-table-column prop="name" label="日志"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="业务日志" name="second">
               <el-table :data="tableData.slice((initPages-1)*pageSize,initPages*pageSize)" border borderstyle="width: 100%">
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
                <el-table :data="fromData.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" id="out-table">
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
                <el-pagination background layout="total , prev, pager, next" :total="fromData.length" :page-size="10" @size-change="handleSizeChange" @current-change="handleCurrentChange" class="pages-page"></el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="语音播放" name="fourth">

            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      bgan:true,
      gsps:true,
      thuraya:true,
      lridium:true,
      data: [
        {
          id:1,
          label: "卫星  #  GSPS",
          children: [
            {
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
              children: [{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                }]
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            }
          ]
        },
        {
          id:2,
          label: "卫星  #  IRIDIUM91",
           children: [
            {
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
              children: [{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                }]
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            }]
        },
        {
          id:3,
          label: "卫星  #  BGAN",
          children: [
            {
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
              children: [{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                },{
                  label: "波束  #  xxxx || SRN:13.54"
                }]
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            },{
              label: "波束  #  xxxx || SRN:13.54",
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      initPages:1,
      pageSize:10,
      currentPage:1, //初始页
      pagesize:10,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
      }, {
        date: '2016-05-04',
        name: '王小虎',
      }, {
        date: '2016-05-01',
        name: '王小虎',
      }, {
        date: '2016-05-03',
        name: '王小虎',
      },{
        date: '2016-05-02',
        name: '王小虎',
      }, {
        date: '2016-05-04',
        name: '王小虎',
      }, {
        date: '2016-05-01',
        name: '王小虎',
      }, {
        date: '2016-05-03',
        name: '王小虎',
      },{
        date: '2016-05-02',
        name: '王小虎',
      }, {
        date: '2016-05-04',
        name: '王小虎',
      }, {
        date: '2016-05-01',
        name: '王小虎',
      }, {
        date: '2016-05-03',
        name: '王小虎',
      }],
      fromData: [{
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
        details:'详情',
        }],
    };
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
     const viewer = new Cesium.Viewer('map')
    },
    handleSizeChange: function (size) {   
      this.pagesize = size; 
    }, 
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage; 
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less" scoped>
.home-box{
  display: flex;
  margin-top:20px;
  .home-left{
    width:25%;
  }

  .home-right{
    width:70%;
    margin-left:auto;
  }
}
.form-table{
  margin-top:20px;
}

.real-box{
  display: flex;
  align-items: center;
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
.home-tab{
  margin-top:20px;
}
</style>