import app from "ags/gtk4/app"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { Apps } from "./Start/shortcuts"
import { Workspace } from "./Center/wS"
import { Icons } from "./End/iconTray"


export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="bar"
      class="Bar"
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <box>
        <Apps />
        <box hexpand={true} />
        <box
          class="buttons"
          name={"wsBox"}>
          <box orientation={Gtk.Orientation.VERTICAL}>
            <Workspace />
          </box>
        </box>
        <box hexpand={true}></box>

        <revealer
        revealChild={true}>
          <box widthRequest={200}>
            <box hexpand={true}></box>
            <Icons />
          </box>
        </revealer>
      </box>
    </window>
  )
}

/*

        */