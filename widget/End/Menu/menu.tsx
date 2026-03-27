import { Astal, Gtk, Gdk } from "ags/gtk4"
import app from "ags/gtk4/app"
import { exec } from "ags/process"
import { createBinding } from "gnim"
import { Volume } from "../Volume/volumeWidget"
import { updateBright, updateVol } from "./update"
import { createPoll } from "ags/time"
import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { Power } from "./powerWindow/power"
import { Bat } from "../Battery/BatteryWidget"
import { BatteryPercentage } from "../Battery/battery"
import { WifiMenu } from "./wifiMenu/wifi"
import { Media } from "./media/mediaPlayer"

const network = AstalNetwork.get_default()

function levelVolume() {
    const r = /\d+\.\d+/;
    const vol = exec('wpctl get-volume @DEFAULT_AUDIO_SINK@')
    return vol.match(r)
}

function levelBrightness() {
    return parseInt(exec('brightnessctl g'))
}

const Bright = createPoll(levelBrightness(), 250, () => levelBrightness())

const Vol = createPoll(0, 100, () => {
    const match = levelVolume()

    // Se la regex trova qualcosa (match non è null)
    if (match && match[0]) {
        return match[0] // Estraiamo il testo trovato e lo facciamo diventare numero
    }

    return 0 // Valore di default per evitare crash se il volume non viene letto
})

export function controlCenter(gdkmonitor: Gdk.Monitor) {
    const currentBright: number = parseInt(exec('brightnessctl g'))
    return <window
        namespace={"menu"}
        name="menu"
        visible={false}
        application={app}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT}
        margin={10}
        gdkmonitor={gdkmonitor}
        layer={Astal.Layer.OVERLAY}
        css={"background: transparent;"}>
        <box
            orientation={Gtk.Orientation.VERTICAL}
            class="container"
            spacing={20}>

            <box
                orientation={Gtk.Orientation.HORIZONTAL}
                name={"topBox"}
                css={"background: transparent;"}>
                <Bat />
                <label label={BatteryPercentage() + "%"}
                    css={"font-size: 12px; color: white; background: transparent;"} />
                <box hexpand={true} />
                <Power />
            </box>
            <box>
                <box orientation={Gtk.Orientation.VERTICAL}
                    css={"background: transparent;"}>
                    <box
                        css={"background: transparent;"}
                        widthRequest={220}
                        name={"volume"}
                        spacing={10}>
                        <Volume />
                        <slider
                            //@ts-ignore
                            value={Vol}
                            min={0}
                            max={1}
                            orientation={Gtk.Orientation.HORIZONTAL}
                            widthRequest={200}
                            onChangeValue={({ value }) => updateVol(value)}
                        ></slider>
                    </box>
                    <box
                        name={"brightness"}
                        spacing={10}
                        widthRequest={220}>
                        <label
                            halign={Gtk.Align.CENTER}
                            cssClasses={["icon"]}
                            label={'\u{f522}'}
                            name={"bright"} />
                        <slider
                            value={Bright}
                            min={2}
                            max={255}
                            orientation={Gtk.Orientation.HORIZONTAL}
                            widthRequest={200}
                            onChangeValue={({ value }) => updateBright(value)}
                        ></slider>
                    </box>
                </box>
            </box>
            <box>
                <box
                    name="serviceIcons">

                    <WifiMenu />



                    <box hexpand={true}></box>

                    <button class="buttons"
                        name="bluetooth">
                        <image
                            class="iconsButton"
                            iconName={createBinding(network.wifi, "iconName")}
                            pixelSize={20} />
                    </button>



                    <box hexpand={true}></box>


                    <button class="buttons"
                        name="aux">
                        <image
                            class="iconsButton"
                            iconName={createBinding(network.wifi, "iconName")}
                            pixelSize={20} />
                    </button>




                    <box hexpand={true}></box>


                    <button class="buttons"
                        name="powersave">
                        <image
                            class="iconsButton"
                            iconName={createBinding(network.wifi, "iconName")}
                            pixelSize={20} />
                    </button>



                    <box hexpand={true}></box>


                    <button class="buttons"
                        name="airplane">
                        <label
                            class="iconsButton"
                            label={"\u{f001d}"} />
                    </button>
                </box>
            </box>
            <Media/>
        </box>
    </window>
}

//value={parseInt(exec(`wpctl get-volume @DEFAULT_AUDIO_SINK@`))}


