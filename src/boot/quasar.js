import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(({ app }) => {
  app.config.globalProperties.$notify = Notify
})

export { Notify }
