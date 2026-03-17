import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createRoot } from "gnim"

const seat = this.get_display().get_default_seat()
const pointer = seat.get_pointer()
const box :Gtk.Box = this.get_root().find_by_name('wsBox')




