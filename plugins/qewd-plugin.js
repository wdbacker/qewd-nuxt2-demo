//import Vue from 'vue'
import { QEWD } from 'qewd-client'

export default ({ app }, inject) => {
  // Inject $qewd in Vue, context and store.
  inject('qewd', QEWD)
}