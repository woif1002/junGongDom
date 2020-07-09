<template>
    <div>
       <div id="map" style="width:800px;height:500px;"></div>
       <div id="mapCesium"></div>
    </div>
</template>
<script>
import bj from './assets/js/beijing.json'
export default {
  data() {
    return {
        czml:[{
            id: "document",
            name: "CZML Geometries: Polyline",
            version: "1.0",
        },{
            id: "blueLine",
            name: "Glowing blue line on the surface",
            polyline: {
            positions: {
                cartographicDegrees: [-75, 37, 0, -125, 37, 0],
            },
            material: {
                polylineGlow: {
                color: {
                    rgba: [100, 149, 237, 255],
                },
                // glowPower: 0.2,
                // taperPower: 0.5, //变窄
                },
            },
                width: 5,
                clampToGround: true,
            },
        }]
    };
  },
  mounted() {
    this.mapClick()
    setTimeout(() => {
        this.init();
    }, 500);
  },
  methods: {
    init() {
        const viewer = new Cesium.Viewer('mapCesium',{
            geocoder:false,
            baseLayerPicker:false,
            navigationHelpButton:false,
            sceneMode:Cesium.SceneMode.SCENE2D,
        })
        // var viewer = new Cesium.Viewer("cesiumContainer");
        var dataSourcePromise = Cesium.CzmlDataSource.load(this.czml);
        viewer.dataSources.add(dataSourcePromise);
        viewer.zoomTo(dataSourcePromise);

    },
    // 图表折线图
    mapClick(){
       let myChart = this.$echarts.init(document.getElementById('map'))
       myChart.setOption({
          title: {
              text: 'Beijing AQI'
          },
          tooltip: {
              trigger: 'axis'
          },
          xAxis: {
              data: bj.map(function (item) {
                  return item[0];
              })
          },
          yAxis: {
              splitLine: {
                  show: false
              }
          },
          toolbox: {
              left: 'center',
              feature: {
                  dataZoom: {
                      yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
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
              data: bj.map(function (item) {
                  return item[1];
              }),
              markLine: {
                  silent: true,
                  data: [{
                      yAxis: 50
                  }, {
                      yAxis: 100
                  }, {
                      yAxis: 150
                  }, {
                      yAxis: 200
                  }, {
                      yAxis: 300
                  }]
              }
          }
      });
    }
  }
};
</script>
<style>
body{
    height:100vh;
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