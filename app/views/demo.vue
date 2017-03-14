<template>
  <div class="demo">
    This is a demo page!<br>
    mydata: {{mydata}}<br>
    count: {{count}}{{showText}}<br>
    <button @click='add'>count + 1</button>
  </div>
</template>
<script>
  export default {
    data: ()=>({
      mydata: '我是一个data',
      count: 0
    }),
    computed:{
      showText(){
        return this.count
      }
    },
    methods:{
      add(){
        this.count += 1
      }
    },
    mounted(){
      console.log('mounted now')
    }
  }
</script>

<style lang="scss" scoped>
  .demo{
    color: coral;
    font-size: 24px;
  }
</style>