<template>
  <div>
    <my-left></my-left>
  </div>
</template>
<script>
import myLeft from "./components/leftlist";

export default {
  components: {
    myLeft
  },
  data() {
    return {
      datslist: []
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
</style>