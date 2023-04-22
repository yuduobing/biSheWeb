<template>
  <div class="basic-data-item">
    <div class="basic-data-item-title">{{label}}
    </div>
    <div class="basic-data-item-value">
      {{ inCrValue }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    config: Object,
    inCrValue: Number
  },
  data() {
    return {
      valueUpClass: 'incremento-up-value',
      valueDownClass: 'incremento-down-value',
      valueClass: 'basic-data-item-incremento-value'
    }
  }
}
</script>
<style scoped>
.basic-data-item {
  background: #0f142b;
  margin: 0 5px 5px 5px;
  padding: 15px 10px 10px 10px;
  border-radius: 5px;
}
.incremento-up-value {
  color: #60FE5E;
}
.incremento-down-value {
  color: #F44182;
}
.basic-data-item-title {
  color: #bcbcbe;
  font-size: 14px;
  padding-bottom: 5px;
}
.basic-data-item-value {
  color: #fff;
  font-size: 40px;
  font-weight: bolder;
}
</style>
