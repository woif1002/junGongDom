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
      czml: [
        {
          id: "document",
          // name: "CZML Geometries: Polygon",
          version: "1.0",
        },
        {
          id: "checkerboardPolygon",
          name: "Checkerboard polygon on surface",
          polygon: {
            positions: {
              cartographicDegrees: [
                89.06,
                22.86,
                100000,
                90.38,
                22.86,
                100000,
                91.26,
                22.1,
                100000,
                91.26,
                22.1,
                100000,
                89.06,
                21.86,
                100000,
                90.36,
                21.13,
                100000,
              ],
            },
            material: {
              solidColor: {
                evenColor: {
                  rgba: [255, 0, 0, 255],
                },
                oddColor: {
                  rgba: [0, 128, 128, 255],
                },
              },
            },
          },
        },
        {
          id: "checkerboardPolygon 1",
          name: "Checkerboard polygon on surface",
          polygon: {
            positions: {
              cartographicDegrees: [
                9.06,
                2.86,
                100000,
                9.38,
                2.86,
                100000,
                9.26,
                2.1,
                100000,
                9.26,
                2.1,
                100000,
                9.06,
                1.86,
                100000,
                9.36,
                1.13,
                100000,
              ],
            },
            material: {
              solidColor: {
                evenColor: {
                  rgba: [255, 0, 0, 255],
                },
                oddColor: {
                  rgba: [0, 128, 128, 255],
                },
              },
            },
          },
        },
      ],
    };
  },
  mounted() {
    // this.init();
    // this.Cartesian3_to84();
    // this.flight();
    // this.$nextTick(()=>{
    // this.rectanglea();
    // })
    this.routerData();
  },
  beforeDestroy() {},
  methods: {
    init() {
      const viewer = new Cesium.Viewer("cesiumContainer", {
        type: 5,
        animation: false, //是否显示动画控件(左下方那个)
        baseLayerPicker: true, //是否显示图层选择控件
        geocoder: false, //是否显示地名查找控件
        timeline: false, //是否显示时间线控件
        sceneModePicker: true, //是否显示投影方式控件
        navigationHelpButton: false, //是否显示帮助信息控件
        infoBox: true, //是否显示点击要素之后显示的信息
        homeButton: false, // 是否显示Home按钮
        sceneMode: Cesium.SceneMode.SCENE2D, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式
        requestRenderMode: true, // 启用请求渲染模式
        // imageryProvider : Cesium.createTileMapServiceImageryProvider({
        //   url : Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        // }),
        fullscreenButton: false,
        navigationInstructionsInitiallyVisible: false,
        shouldAnimate: true,
      });
      var layers = viewer.imageryLayers;
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

      var dataSourcePromise = Cesium.CzmlDataSource.load(this.czml);
      viewer.dataSources.add(dataSourcePromise);
      viewer.zoomTo(dataSourcePromise);
      /**  六边形*/
      // var layers = viewer.scene.imageryLayers;
      // layers.addImageryProvider(
      //   new Cesium.SingleTileImageryProvider({
      //     url: "/public/Cesium/Assets/Textures/NaturalEarthII/0/0/0.jpg",
      //     rectangle: Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75),
      //   })
      // );

      /**插入灯光样式与透明度*/
      var blackMarble = layers.addImageryProvider(
        new Cesium.IonImageryProvider({ assetId: 3812 })
      );
      blackMarble.alpha = 0.5;
      blackMarble.brightness = 2.0;
    },
    // 笛卡尔转84 经纬坐标
    Cartesian3_to84(array) {
      for (var i = 0; i < array.length; i++) {
        var cartesian = new Cesium.Cartesian3(
          array[i].x,
          array[i].y,
          array[i].z
        );
        var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        var lat = Cesium.Math.toDegress(cartographic.latitude);
        var lon = Cesium.Math.toDegress(cartographic.longitude);
        console.log(lon, lat);
      }
    },
    /* 飞机飞行航线 */
    flight() {
      var view = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false,
        timeline: true,
        homeButton: false,
        fullscreenButton: false,
        infoBox: false,
        sceneModePicker: false,
        navigationInstructionsInitiallyVisible: false,
        navigationHelpButton: false,
        // sceneMode: Cesium.SceneMode.SCENE2D,
        // shouldAnimate : true
      });
      view.scene.globe.enableLighting = true;
      let data = [];
      data[0] = [
        { longitude: 116.405419, dimension: 39.918034, height: 0, time: 0 },
        { longitude: 116.2821, dimension: 39.918145, height: 0, time: 40 },
        {
          longitude: 115.497402,
          dimension: 39.344641,
          height: 70000,
          time: 100,
        },
        {
          longitude: 107.942392,
          dimension: 29.559967,
          height: 70000,
          time: 280,
        },
        { longitude: 106.549265, dimension: 29.559967, height: 0, time: 360 },
      ];
      data[1] = [
        { longitude: 116.405419, dimension: 39.918034, height: 0, time: 0 },
        { longitude: 117.034586, dimension: 39.881202, height: 0, time: 40 },
        {
          longitude: 116.340088,
          dimension: 38.842224,
          height: 70000,
          time: 100,
        },
        {
          longitude: 113.489176,
          dimension: 23.464017,
          height: 70000,
          time: 280,
        },
        { longitude: 113.262084, dimension: 23.13901, height: 0, time: 360 },
      ];
      data[2] = [
        { longitude: 118.838979, dimension: 32.073514, height: 0, time: 0 },
        { longitude: 118.438838, dimension: 32.03777, height: 0, time: 40 },
        {
          longitude: 117.802406,
          dimension: 31.91231,
          height: 70000,
          time: 100,
        },
        {
          longitude: 104.043645,
          dimension: 35.993845,
          height: 70000,
          time: 280,
        },
        { longitude: 101.807224, dimension: 36.660972, height: 0, time: 360 },
      ];
      // 起始时间
      let start = Cesium.JulianDate.fromDate(new Date(2017, 7, 11));
      // 结束时间
      let stop = Cesium.JulianDate.addSeconds(
        start,
        360,
        new Cesium.JulianDate()
      );

      // 设置始时钟始时间
      view.clock.startTime = start.clone();
      // 设置时钟当前时间
      view.clock.currentTime = start.clone();
      // 设置始终停止时间
      view.clock.stopTime = stop.clone();
      // 时间速率，数字越大时间过的越快
      view.clock.multiplier = 10;
      // 时间轴
      view.timeline.zoomTo(start, stop);
      // 循环执行,即为2，到达终止时间，重新从起点时间开始
      view.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

      // view.camera.flyTo({
      //     destination:Cesium.Cartesian3.fromDegrees(116.405419,32.073514,20000)
      // })
      for (let j = 0; j < data.length; j++) {
        let property = computeFlight(data[j]);
        //console.log(property)
        // 添加模型
        let planeModel = view.entities.add({
          // 和时间轴关联
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop,
            }),
          ]),
          position: property,
          // 根据所提供的速度计算模型的朝向
          orientation: new Cesium.VelocityOrientationProperty(property),
          // 模型数据
          model: {
            url:
              "../../../public/Cesium/Assets/Textures/maki/circle.png" /* ./Apps/SampleData/models/CesiumAir/Cesium_Air.glb */,
            minimumPixelSize: 128,
          },
        });
      }

      /**
       * 计算飞行
       * @param source 数据坐标
       * @returns {SampledPositionProperty|*}
       */
      function computeFlight(source) {
        // 取样位置 相当于一个集合
        let property = new Cesium.SampledPositionProperty();
        for (let i = 0; i < source.length; i++) {
          let time = Cesium.JulianDate.addSeconds(
            start,
            source[i].time,
            new Cesium.JulianDate()
          );
          let position = Cesium.Cartesian3.fromDegrees(
            source[i].longitude,
            source[i].dimension,
            source[i].height
          );
          // 添加位置，和时间对应
          property.addSample(time, position);
        }
        return property;
      }
    },
    /* 创建范围矩形 */
    rectanglea() {
      var rectangle = new Cesium.Rectangle.fromDegrees(
        west,
        south,
        east,
        north
      );
      viewer.camera.flyTo({
        destination: rectangle,
      });
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //根据笛卡尔坐标获取到弧度
      var lng = Cesium.Math.toDegrees(cartographic.longitude); //根据弧度获取到经度
      var lat = Cesium.Math.toDegrees(cartographic.latitude); //根据弧度获取到纬度

      var viewer = new Cesium.Viewer("cesiumContainer", {
        sceneMode: Cesium.SceneMode.SCENE2D,
      });
      var scene = viewer.scene;
      var clock = viewer.clock;
      var referenceFramePrimitive;
      function viewRectangle() {
        Sandcastle.declare(viewRectangle);
        var west = -77.0;
        var south = 38.0;
        var east = -72.0;
        var north = 42.0;
        var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
        viewer.camera.setView({
          destination: rectangle,
        });
        // Show the rectangle.  Not required; just for show.
        viewer.entities.add({
          rectangle: {
            coordinates: rectangle,
            fill: false,
            outline: true,
            outlineColor: Cesium.Color.WHITE,
          },
        });
      }
      function flyToRectangle() {
        Sandcastle.declare(flyToRectangle);
        //得到当前三维场景
        var scene = viewer.scene;
        //得到当前三维场景的椭球体
        var ellipsoid = scene.globe.ellipsoid;
        var entity = viewer.entities.add({
          label: {
            show: false,
          },
        });
        var longitudeString = null;
        var latitudeString = null;
        var cartesian = null;
        // 定义当前场景的画布元素的事件处理
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
        handler.setInputAction(function (movement) {
          //通过指定的椭球或者地图对应的坐标系，将鼠标的二维坐标转换为对应椭球体三维坐标
          cartesian = viewer.camera.pickEllipsoid(
            movement.endPosition,
            ellipsoid
          );
          if (cartesian) {
            //将笛卡尔坐标转换为地理坐标
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            //将弧度转为度的十进制度表示
            longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            entity.position = cartesian;
            entity.label.show = true;
            entity.label.text =
              "(" + longitudeString + ", " + latitudeString + ")";
          } else {
            entity.label.show = false;
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        var west = -90.0;
        var south = 40.1;
        var east = -87.0;
        var north = 40.2;
        var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
        viewer.camera.flyTo({
          destination: rectangle,
        });
        // Show the rectangle.  Not required; just for show.
        viewer.entities.add({
          rectangle: {
            coordinates: rectangle,
            fill: false,
            outline: true,
            outlineColor: Cesium.Color.WHITE,
          },
        });
      }
      var viewChanged = document.getElementById("viewChanged");
      var removeStart, removeEnd;

      Sandcastle.addToolbarMenu([
        {
          text: "Fly to Rectangle",
          onselect: function () {
            flyToRectangle();
            Sandcastle.highlight(flyToRectangle);
          },
        },
        {
          text: "View a Rectangle",
          onselect: function () {
            viewRectangle();
            Sandcastle.highlight(viewRectangle);
          },
        },
      ]);
      scene.morphComplete.addEventListener(function () {
        Sandcastle.reset();
      });
    },
    routerData() {
      var view = new Cesium.Viewer("cesiumContainer", {
        baseLayerPicker: false,
        timeline: true,
        homeButton: false,
        fullscreenButton: false,
        infoBox: false,
        sceneModePicker: false,
        navigationInstructionsInitiallyVisible: false,
        navigationHelpButton: false,
        shouldAnimate: true,
      });
      view.scene.globe.enableLighting = true;
      let data = [];
      data[0] = [
        { longitude: 116.405419, dimension: 39.918034, height: 0, time: 0 },
        { longitude: 116.2821, dimension: 39.918145, height: 0, time: 40 },
        {longitude: 115.497402,dimension: 39.344641,height: 70000,time: 100,
        },
        {longitude: 107.942392,dimension: 29.559967,height: 70000,time: 280,
        },
        { longitude: 106.549265, dimension: 29.559967, height: 0, time: 360 },
      ];
      data[1] = [
        { longitude: 116.405419, dimension: 39.918034, height: 0, time: 0 },
        { longitude: 117.034586, dimension: 39.881202, height: 0, time: 40 },
        {longitude: 116.340088,dimension: 38.842224,height: 70000,time: 100,
        },
        {longitude: 113.489176,dimension: 23.464017,height: 70000,time: 280,
        },
        { longitude: 113.262084, dimension: 23.13901, height: 0, time: 360 },
      ];
      data[2] = [
        { longitude: 118.838979, dimension: 32.073514, height: 0, time: 0 },
        { longitude: 118.438838, dimension: 32.03777, height: 0, time: 40 },
        {longitude: 117.802406,dimension: 31.91231,height: 70000,time: 100,
        },
        {longitude: 104.043645,dimension: 35.993845,height: 70000,time: 280,
        },
        { longitude: 101.807224, dimension: 36.660972, height: 0, time: 360 },
      ];
      // 起始时间
      let start = Cesium.JulianDate.fromDate(new Date(2017, 7, 11));
      // 结束时间
      let stop = Cesium.JulianDate.addSeconds(
        start,
        360,
        new Cesium.JulianDate()
      );

      // 设置始时钟始时间
      view.clock.startTime = start.clone();
      // 设置时钟当前时间
      view.clock.currentTime = start.clone();
      // 设置始终停止时间
      view.clock.stopTime = stop.clone();
      // 时间速率，数字越大时间过的越快
      view.clock.multiplier = 10;
      // 时间轴
      view.timeline.zoomTo(start, stop);
      // 循环执行,即为2，到达终止时间，重新从起点时间开始
      view.clock.clockRange = Cesium.ClockRange.LOOP_STOP;

      // view.camera.flyTo({
      //     destination:Cesium.Cartesian3.fromDegrees(116.405419,32.073514,20000)
      // })
      for (let j = 0; j < data.length; j++) {
        let property = computeFlight(data[j]);
        //console.log(property)
        // 添加模型
        let planeModel = view.entities.add({
          // 和时间轴关联
          availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: start,
              stop: stop,
            }),
          ]),
          position: property,
          // 根据所提供的速度计算模型的朝向
          orientation: new Cesium.VelocityOrientationProperty(property),
          // 模型数据
          model: {
            uri: "../../../public/Cesium/Assets/Images/google_earth_credit.png",
            minimumPixelSize: 128,
          },
        });
      }
      /**
       * 计算飞行
       * @param source 数据坐标
       * @returns {SampledPositionProperty|*}
       */
      function computeFlight(source) {
        // 取样位置 相当于一个集合
        let property = new Cesium.SampledPositionProperty();
        for (let i = 0; i < source.length; i++) {
          let time = Cesium.JulianDate.addSeconds(
            start,
            source[i].time,
            new Cesium.JulianDate()
          );
          let position = Cesium.Cartesian3.fromDegrees(
            source[i].longitude,
            source[i].dimension,
            source[i].height
          );
          // 添加位置，和时间对应
          property.addSample(time, position);
        }
        return property;
      }
    },
  },
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