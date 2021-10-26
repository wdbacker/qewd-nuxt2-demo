import { QEWD } from 'qewd-client'

// anonymous function needed here, no arrow function!
export default function({ app }, inject) {
  QEWD.on('ewd-registered', function() {
    QEWD.setCookie('qewdSession');
    // Your QEWD environment is ready, emit the ready event
    QEWD.emit('ready', {ready: true})
  })
  QEWD.on('ewd-reregistered', function() {
    QEWD.setCookie('qewdSession');
    // Your QEWD environment is ready, emit the ready event
    QEWD.emit('ready', {ready: true})
  })
  QEWD.on('socketDisconnected', function() {
    document.cookie = "qewdSession= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    // Your QEWD environment isn't ready, emit the ready event
    QEWD.emit('ready', {ready: false})
  })
  // add request method wrapper preserving the Vue component this context
  function _request(messageObj) {
    return new Promise(function(resolve) {
      QEWD.send(messageObj, function(responseObj) {
        resolve(responseObj);
      })
    })
  }
  QEWD.request = _request.bind(app)
  // Inject $qewd in Vue, context and store.
  inject('qewd', QEWD)
}