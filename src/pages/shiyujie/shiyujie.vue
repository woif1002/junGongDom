<template>
  <div>
    <div id="map"></div> 
    <div> 555 </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
 mounted(){
   this.mapinit();
 },
 methods:{
  mapinit(){
    const viewer = new Cesium.Viewer('map')
  }
 }
}
</script>

<style lang="less" scoped>

</style>