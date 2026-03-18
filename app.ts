import app from "ags/gtk4/app"
import style from "./styles/style.scss"
import Bar from "./widget/Bar" 
import { close } from "./widget/End/Menu/close"
import { controlCenter } from "./widget/End/Menu/menu"
import { connect } from "./widget/End/Menu/wifiMenu/connect/connect"

app.start({
  css: style,
  main() {
    app.get_monitors().map(connect)
    app.get_monitors().map(controlCenter)
    app.get_monitors().map(Bar)
  },
})
