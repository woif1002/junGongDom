<template>
  <div>
    <el-tree
      :data="data"
      :props="defaultProps"
      accordion
      @node-click="handleNodeClick"
      node-key="id"
      :default-expanded-keys="[1]"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <img :src="data.icon" v-if="data.icon" style="width:15px;height:15px;"/>
        {{ node.label }}
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
        defaultProps: {
            children: "children",
            label: "label"
        },
      data: [
        {
          id: 1,
          label: "卫星  #  GSPS",
          icon: require("../assets/images/satellite.png"),
          children: [
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png"),
              children: [
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                }
              ]
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            }
          ]
        },
        {
          id: 2,
          label: "卫星  #  IRIDIUM91",
          icon: require("../assets/images/satellite.png"),
          children: [
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png"),
              children: [
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                }
              ]
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            }
          ]
        },
        {
          id: 3,
          label: "卫星  #  BGAN",
          icon: require("../assets/images/satellite.png"),
          children: [
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png"),
              children: [
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                },
                {
                  label: "波束  #  xxxx || SRN:13.54",
                  icon: require("../assets/images/wave.png")
                }
              ]
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            },
            {
              label: "波束  #  xxxx || SRN:13.54",
              icon: require("../assets/images/wave.png")
            }
          ]
        }
      ],
      
    };
  },
  mounteds: {
    handleNodeClick(data) {
      console.log(data);
    },
  }
};
</script>
<style>
.expanded.el-icon-caret-right:before{
  content:'-';
  transform: rotate(0deg);
}
.el-icon-caret-right:before{
  content:'+';
}
</style>
<style lang="less" scoped>
.el-icon-caret-right:before{
  content:'-';
}
</style>