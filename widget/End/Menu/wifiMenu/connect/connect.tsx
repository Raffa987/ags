import { Astal, Gtk, Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"

let currentNw;

export function getSsid(ssid: string){
    currentNw = ssid
    app.toggle_window("connect")    
}

export function connect(gdkmonitor: Gdk.Monitor) {
    <window
        visible={false}
        name={"connect"}
        namespace={"connect"}
        application={app}
        margin={10}
        gdkmonitor={gdkmonitor}
        layer={Astal.Layer.OVERLAY}>
            <box
            orientation={Gtk.Orientation.HORIZONTAL}>
                <box hexpand={true}/>
                <box
                orientation={Gtk.Orientation.VERTICAL}>
                    <box hexpand={true}/>
                    <box>
                        <button>
                        </button>
                    </box>
                    <box hexpand={true}/>
                </box>
                <box hexpand={true}/>
            </box>

    </window>
}