import { Astal, Gtk, Gdk } from "ags/gtk4"
import { BatteryIcon } from "./battery"
import { createPoll } from "ags/time"

const icon = createPoll(BatteryIcon(), 1000, () => BatteryIcon())
export function Bat() {
    return <label class={"icons"}
        name={"mirror"}
        label={icon}>
    </label>
}

