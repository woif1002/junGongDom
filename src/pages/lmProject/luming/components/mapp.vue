<template>
<div>
    <div id="map">
        <div id="cesiumContainer" class="fullSize"></div>
    </div>
</div>
</template>

<script>
    export default {
        data(){

        },mounted(){
            this.mapinit();
        },methods:{
            mapinit(){
                //const viewer=new Cesium.Viewer('map');
                var czml = [
                    {
                        id: "document",
                        name: "CZML Geometries: Polyline",
                        version: "1.0",
                    },
                    {
                        id: "blueLine",
                        name: "Glowing blue line on the surface",
                        polyline: {
                            positions: {
                                cartographicDegrees: [116.4, 39.9, 0, 88, 22, 0],
                            },
                            material: {
                                polylineGlow: {
                                    color: {
                                        rgba: [100, 149, 237, 255],
                                    },
                                    glowPower: 0.2,
                                    taperPower: 1,
                                },
                            },
                            width: 10,
                        },
                    }
                ];

                var viewer = new Cesium.Viewer("cesiumContainer");
                var dataSourcePromise = Cesium.CzmlDataSource.load(czml);
                viewer.dataSources.add(dataSourcePromise);
                viewer.zoomTo(dataSourcePromise);
                // viewer.sceneModePicker=morphTo2D;
                viewer.scene.morphTo2D(1);

            }
        }
    }
</script>

<style>

</style>
