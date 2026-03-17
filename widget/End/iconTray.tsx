import { execAsync } from "ags/process"
import { createPoll, interval } from "ags/time"
import { Astal, Gtk, Gdk } from "ags/gtk4"
import { exec } from "ags/process"
import { Bat } from "./Battery/BatteryWidget"
import { createBinding } from "gnim"
import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { Volume } from "./Volume/volumeWidget"
import { controlCenter } from "./Menu/menu"
import { toggleWindow } from "ags/app"
import app from "ags/gtk4/app"


export function toggle() {
  //app.toggle_window("close") 
  app.toggle_window("menu")
  return
}

const network = AstalNetwork.get_default()

const time = createPoll("", 1000, 'date +"%H:%M"')
const date = createPoll("", 10000, 'date +"%d/%m/%y"')

export function Icons() {



  return <button class="buttons"
    onClicked={() => toggle()}>
    <box>
      <box
        spacing={10}>
        <image
          class="icons"
          iconName={createBinding(network.wifi, "iconName")} />
        <Volume />
        <Bat />
      </box>
      <box class="divider"
        vexpand={true}
        widthRequest={1} />
      <box orientation={Gtk.Orientation.VERTICAL}>
        <label label={time}
          class="time" />
        <label label={date}
          class="date" />
      </box>

    </box>
  </button>
}
