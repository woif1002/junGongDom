<template>
  <div class="history">
    <!-- 电话号码 开始时间  input -->
    <my-from></my-from>
    <!-- excel 与地图组块 -->
    <my-excel></my-excel>
    <!-- 语音播放部分 -->
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <div class="audio-box">
        <p>简单使用</p>
        <m-audio :src="src" text="点击这里播放"></m-audio>
      </div>
      <!-- 取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 另一个播放  方法-->
    <!-- <div>
      <p @click="audioClick" style="margin:10px">点击展示波形图</p>
      <audio-wave style="width:1080px" ref="AudioWave" :tagChooseList="tagChooseList"></audio-wave>
    </div> -->

    <el-row>
      <el-card class="box-card" style="text-align:left">
        <div slot="header" class="clearfix title">
          <!-- <span>Vue框架中嵌入使用wavesurfer.js插件</span> -->
        </div>
        <div id="waveform" ref="waveform">
          <!-- Here be the waveform -->
        </div>
        <div id="wave-timeline" ref="wave-timeline">
          <!--时间轴 -->
        </div>
        <div>
          <!-- 播放暂停 -->
          <el-button type="primary" @click="playMusic">
            <i class="el-icon-video-play"></i>
            播放 /
            <i class="el-icon-video-pausee"></i>
            暂停
          </el-button>
          <!-- 快进 -->
          <el-popover trigger="hover" placement="top" style="margin-left: 10px" width="220">
            <el-input-number v-model="fast" width="180" :precision="2" :step="0.01" />
            <el-button slot="reference" size="mini" @click="speek">快进 <i class="el-icon-d-arrow-right" /></el-button>
        </el-popover>
        <el-button size="mini" style="margin-left: 10px" @click="DoubleSpeed(index)"> {{ speed[index] +' X' }}</el-button>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import myExcel from "./components/excelAmp";
import myFrom from "./components/myFrom";
import WaveSurfer from "wavesurfer.js"; //导入wavesurfer.js
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js";

export default {
  data() {
    return {
      index:0,
      fast:3,   // 快进默认值
      speed: [1.0, 1.5, 2.0, 0.5],   // 倍数
      wavesurfer: null,
      tagChooseList: ["偏高", "正常", "偏低"], // 音量波段代码
      sectionList: [
        {
          startTime: "0:00.00", //音频段开始时间，分:秒.毫秒
          endTime: "0:01.57", //音频段结束时间，分:秒.毫秒
          tag: 1, //当前标记内容
          startLeft: "8.67%",
          endLeft: "24.33%",
          isPlaySection: true, //音频段播放按钮
          chevronType: true, //音频段是否展开
          chooseTag: true //音频段展开框中选择框是否展开
        }
      ],
      audioUrl: "http://kolber.github.io/audiojs/demos/mp3/juicy.mp3",
      src: require("./assets/js/transaction.mp3"),
      outerVisible: false,
      innerVisible: false,
      activeIndex: "1" //tabs 默认值
    };
  },
  components: {
    myExcel,
    myFrom
  },
  mounted() {
    // this.map();
    // this.$refs.AudioWave._initAudio(this.src, []);
    this.$nextTick(() => {
      console.log(WaveSurfer);
      this.wavesurfer = WaveSurfer.create({
        container: this.$refs.waveform,
        waveColor: "#409EFF",
        progressColor: "blue",
        backend: "MediaElement",
        mediaControls: false,
        audioRate: "1",
        //使用时间轴插件
        plugins: [
          Timeline.create({
            container: "#wave-timeline"
          })
        ]
      });
      // 特别提醒：此处需要使用require(相对路径)，否则会报错
      this.wavesurfer.load(require("./assets/js/02.mp3"));
    });
  },
  methods: {
    audioClick() {
      console.log(this.$refs.AudioWave);
      this.$refs.AudioWave._initAudio(this.src, this.sectionList);
      var tagList = this.$refs.AudioWave.tagList;
      console.log(tagList, "-----------");
      console.log(this.$refs.AudioWave.checkTagList(), "===============");
    },
    playMusic() {
      //"播放/暂停"按钮的单击触发事件，暂停的话单击则播放，正在播放的话单击则暂停播放
      this.wavesurfer.playPause.bind(this.wavesurfer)();
    },
    /**
     快进
    **/
    speek() {
      this.wavesurfer.skip(this.fast)
    },
    /* 倍速 */
    DoubleSpeed(index) {
      console.log(index)
      if (index === 3) {
        this.index = 0
        this.wavesurfer.setPlaybackRate(this.speed[this.index])
      } else {
        this.index = index + 1
        this.wavesurfer.setPlaybackRate(this.speed[this.index])
      }
    },
  }
};
</script>
<style lang="less" scoped>
.mixin-components-container {
  background-color: #f0f2f5;
  padding: 30px;
  min-height: calc(100vh - 84px);
}
#waveform{
 background-color:red; 
}
</style>