<template>
    <div>
        <div id="main" style="width: 600px;height:400px;"></div>
    </div>
</template>

<script>
    import js from '../assets/json/DemoJson'
    export default {
        data(){
            return{

            }
        },mounted(){
            this.initZhe();
        },
        methods:{
            initZhe(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("main"));
                    myChart.setOption({
                        title: {
                            text: 'Beijing AQI'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        xAxis: {
                            data: js.map(function (item) {
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
                            data: js.map(function (item) {
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
    }
</script>

<style>

</style>
