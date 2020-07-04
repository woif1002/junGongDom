<template>
    <div>
        <div id="cesiumContainer"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
        viewer: {}
    };
  },
  mounted() {
      setTimeout(() => {
        this.init();
      }, 500);
    
  },
  beforeDestroy() {},
  methods: {
    init() {
     const viewer = new Cesium.Viewer('cesiumContainer')
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