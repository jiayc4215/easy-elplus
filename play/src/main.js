import { createApp } from "vue"
import ElementPlus from "element-plus"
import EasyElementPlus from "easy-elplus"
import "element-plus/dist/index.css"
import App from "./App.vue"

const app = createApp(App)

app.use(ElementPlus)
app.use(EasyElementPlus)
app.mount("#app")
