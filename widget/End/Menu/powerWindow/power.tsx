import { Astal, Gtk, Gdk } from "ags/gtk4"
import { execAsync } from "ags/process"

export function Power() {
    return <menubutton
        vexpand={false}
        name={"powerButton"}
        alwaysShowArrow={false}
        hasFrame={false}>
        <label label={"\u{f0425}"}
        css={"color: white; font-size: 16px;"}></label>
        <popover
        class={"powerContainer"}
            hasArrow={false}
            halign={Gtk.Align.END}>
            <box orientation={Gtk.Orientation.VERTICAL}>
                <button 
                    onClicked={() => execAsync("shutdown 0")}>
                    <label label={"\u{f0425} Shut down"}
                        halign={Gtk.Align.START}
                        class={"powerButtonsText"}></label>
                </button>
                <button 
                    onClicked={() => execAsync("reboot")}>
                    <label label={"\u{f0709} Restart"}
                        halign={Gtk.Align.START}
                        class={"powerButtonsText"}></label>
                </button>

            </box>
        </popover>
    </menubutton>
}



