<template>
  <Tutorial/>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      qewdReady: false
    }
  },
  asyncData (ctx) {
    debugger
    console.log(ctx)
    //console.log(process.client?'client':process.server?'server':'unknown mode')
    if (process.server) {
      console.log('asyncData server')
      //console.log($qewd)
    }
    else {
      console.log('asyncData client')
      console.log('asyncData', ctx.$qewd)
    }
  },
  created() {
    let self = this
    /*
      create an event handler invoked when QEWD's connection is registered/ready
    */
    console.log(process.client?'client':process.server?'server':'unknown mode')
    if (process.client) {
      // add request method preserving the Vue component this context
      function _request(messageObj) {
        return new Promise(function(resolve) {
          self.$qewd.send(messageObj, function(responseObj) {
            resolve(responseObj);
          })
        })
      }
      this.$qewd.request = _request.bind(this)

      this.$qewd.on('ewd-registered', function() {
        self.$qewd.setCookie('qewdSession');
        // Your QEWD environment is ready, set the qewdReady data property to true
        self.qewdReady = true
        // optionally turn on logging to the console
        self.$qewd.log = true
      })
      this.$qewd.on('ewd-reregistered', function() {
        self.$qewd.setCookie('qewdSession');
        // Your QEWD environment is ready, set the qewdReady data property to true
        self.qewdReady = true
      })
      this.$qewd.on('socketDisconnected', function() {
        document.cookie = "qewdSession= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        self.qewdReady = false
      })
      
      /*
        start QEWD-Up/QEWD.js client with these required params:
        - application: QEWD's application name
        - io: the imported websocket client module
        - url: the url of your QEWD-Up/QEWD.js server (hardcoded in this example,
          the url can be passed in too using a process.env.QEWD_URL parameter)
      */
    
      this.$qewd.start({
        application: 'vue-qewd-test',
        io,
        url: 'http://localhost:8080'
      })
    }
  }
}
</script>
