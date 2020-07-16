<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewer: {},
      czml: [{
          id: "document",
          // name: "CZML Geometries: Polygon",
          version: "1.0"
        },
        {
          id: "checkerboardPolygon",
          name: "Checkerboard polygon on surface",
          polygon: {
            positions: {
              cartographicDegrees: [89.06,22.86,100000,90.38,22.86,100000,91.26,22.1,100000,91.26,22.1,100000,89.06,21.86,100000,90.36,21.13,100000]
            },
            material: {
              solidColor: {
                evenColor: {
                  rgba: [255, 0, 0, 255]
                },
                oddColor: {
                  rgba: [0, 128, 128, 255]
                }
              }
            },
          }
        },{
          id: "checkerboardPolygon 1",
          name: "Checkerboard polygon on surface",
          polygon: {
            positions: {
              cartographicDegrees: [9.06,2.86,100000,9.38,2.86,100000,9.26,2.1,100000,9.26,2.1,100000,9.06,1.86,100000,9.36,1.13,100000]
            },
            material: {
              solidColor: {
                evenColor: {
                  rgba: [255, 0, 0, 255]
                },
                oddColor: {
                  rgba: [0, 128, 128, 255]
                },
              }
            },
          }
        }],
    };
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 500);
    this.mouseMovepoly();
    this.Cartesian3_to84()
  },
  beforeDestroy() {},
  methods: {
    init() {
      const viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false, //是否显示动画控件(左下方那个)
        baseLayerPicker: false, //是否显示图层选择控
        geocoder: false, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: true, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: true ,//是否显示点击要素之后显示的信息
        homeButton: false, // 是否显示Home按钮
        sceneMode: Cesium.SceneMode.SCENE2D, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
        requestRenderMode: false, // 启用请求渲染模式
        // imageryProvider:new Cesium.WebMapServiceImageryProvider({   
        //     url : url,         
        //     layers: 'nurc:Arc_Sample'// Here just give layer name   
        // })
        // imageryProvider : Cesium.createTileMapServiceImageryProvider({
        //   url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        // }),
        // baseLayerPicker : false,
        // geocoder : false,
      });
      // var layers = viewer.imageryLayers;  
        /**
         * 加载本地离线高德地图
         * gaodeTitle为加载的tomcat下面的相对路径
         * 不能使用  2020/7/9
         */
      // layers.addImageryProvider(createGaodeTileMapServiceImageryProvider());
      //   function createGaodeTileMapServiceImageryProvider(){
      //       var gaodeLayer = new Cesium.createTileMapServiceImageryProvider({  
      //        url : 'http://localhost:8087/gaodeTitle',
      //        credit:"gaodeTitle"
      //       }); 
      //       return gaodeLayer;
      //   }
      /**  六边形*/
      var dataSourcePromise = Cesium.CzmlDataSource.load(this.czml);
      viewer.dataSources.add(dataSourcePromise);
      viewer.zoomTo(dataSourcePromise);
    },
      // 笛卡尔转84 经纬坐标
    Cartesian3_to84(array) {
        for (var i = 0; i < array.length; i++) {
            var cartesian = new Cesium.Cartesian3(array[i].x, array[i].y, array[i].z);
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lat = Cesium.Math.toDegress(cartographic.latitude);
            var lon = Cesium.Math.toDegress(cartographic.longitude);
            console.log(lon, lat);
        }
    }
  }
};
</script>
<style>
body {
  height: 100vh;
}
</style>
<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>