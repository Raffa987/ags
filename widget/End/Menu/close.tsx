import { Astal, Gtk, Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"
import { toggle } from "../iconTray"

export function close(gdkmonitor: Gdk.Monitor) {
    return <window
        name="close"
        visible={false}
        application={app}
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        margin={10}
        gdkmonitor={gdkmonitor}
        css={"background: transparent;"}
        layer={Astal.Layer.OVERLAY}>
            <button
            class={"button"}
            widthRequest={4000}
            heightRequest={4000}
            onClicked={toggle}
            hasFrame={false}></button>
        </window>
}