<template>
  <div>
    <div class="text-top">
      QEWD-Up NuxtJS 2 demo app
      <span v-if="!qewdReady" class="text-red"> (the QEWD-Up server is down!)</span>
    </div>
    <nuxt keep-alive />
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      qewdReady: false
    }
  },
  created() {
    if (process.client) {
      let self = this
      /*
        create an event handler invoked when QEWD's connection is registered/ready
      */
      this.$qewd.on('ready', function(data) {
        self.qewdReady = data.ready
      })
      
      this.$qewd.start({
        application: 'nuxtjs-test',
        io,
        url: this.$config.qewdUrl
      })
      
    }
  }
}
</script>

<style>
 .text-top {
   padding:1em;
   text-align: center;
   font-weight: bold;
 }
 .text-red {
   color: red;
 }
</style>