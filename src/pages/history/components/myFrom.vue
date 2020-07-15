<template>
  <div class="from-box">
    <!-- 电话号码部分 -->
    <div class="from-phone">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select v-model="formInline.region" placeholder="电话号码">
            <el-option label="电话号码" value="phone"></el-option>
            <el-option label="波段" value="band"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label>
          <el-input v-model="formInline.user" placeholder></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 起始状态 -->
    <div class="from-start">
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </div>
    <!-- 查询按钮 -->
    <div class="from-query">
      <div class="button">轨迹查询</div>
      <div class="button">通讯关系查询</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: "",
      value2: "",
      formInline: {
        user: "",
        region: ""
      } //查询
    };
  }
};

</script>
<style lang="less" scoped>
/* 头部from单位置*/
.from-box {
  display: flex;
  margin: 10px 0;
}
// 按钮公用部分
.from-query,
.map-keep {
  display: flex;
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
</style>