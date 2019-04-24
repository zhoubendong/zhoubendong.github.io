<template>
    <div class="lottery">
        <!-- <Footer></Footer> -->
        <div class="tiao" :style="{background,color}" @click="selecet">
          调色板
        </div>
        <input type="range" max="255" min="0" v-model="r">
        <input type="range" max="255" min="0" v-model="g">
        <input type="range" max="255" min="0" v-model="b">
        <div>
          rgb为：{{`r:${r},g:${g},b:${b}`}}
        </div>
        <div>
        </div>
    </div>
</template>

<script>
// import { MXSelectUsers } from '../core/mxApi'
export default {
  name: 'lottery',
  data(){
    return {
      r:0,
      g:0,
      b:0
    }
  },
  mounted(){
  },
  computed:{
    background(){
      return `rgb(${this.r},${this.g},${this.b})`
    },
    color(){
      return `rgb(${this.g},${this.r},${this.b})`
    },
  },
  methods: {
    selecet(){
      MXSelectUsers()
        .then(res => {
          console.log('select--->'+JSON.stringify(res))
        })
    },
    dispatch(){
      this.$store.dispatch('JIA')
    }
  },

}
</script>


<style scoped lang="less">
  .tiao{
    border-radius: 100%;width: 50vw;height: 50vw;border: 1px solid #aaa;margin: 0 auto;display: flex;justify-content: center;align-items: center
  }
  input[type='range']{
    width: 100vw;
  }
</style>