import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "gnim"
import AstalNetwork from "gi://AstalNetwork?version=0.1"
import { For } from "gnim"
import { getSsid } from "./connect/connect"

const Network = AstalNetwork.get_default()



export function WifiMenu() {
    return <menubutton
        class="menubutton"
        name="wifi"
        hasFrame={false}
        alwaysShowArrow={false}>
        <image class="iconsButton"
            iconName={createBinding(Network.wifi, "iconName")}
            pixelSize={20} />
        <popover class={"powerContainer"}
            hasArrow={false}
            halign={Gtk.Align.START}
        >
            <scrolledwindow
                widthRequest={250}
                heightRequest={150}
                hscrollbarPolicy={2}
                vscrollbarPolicy={0}>
                        <Wifi />                
            </scrolledwindow>

        </popover>
    </menubutton>
}


export function Wifi() {
    const nws = createBinding(Network.wifi, "accessPoints").as(aps => {
        const valid = aps.filter(nw => nw.ssid);

        const unique = [];
        const seen = new Set();
        
        for (const nw of valid) {
            if (!seen.has(nw.ssid)) {
                seen.add(nw.ssid);
                unique.push(nw);
            }
        }

        return unique.slice(0, 15);
    });

    return (
        <box
            cssClasses={["networks"]}
            orientation={Gtk.Orientation.VERTICAL}
            heightRequest={150}
            widthRequest={250}
        >
            <For each={nws}>
                {(nw) => (
                    <button
                        cssClasses={["wifi-item"]}
                        onClicked={() => getSsid(nw.ssid)}
                    >
                        <box orientation={Gtk.Orientation.HORIZONTAL} spacing={8}>
                            <image 
                                iconName={createBinding(nw, "iconName")} 
                            />
                            <label label={nw.ssid} />
                        </box>
                    </button>
                )}
            </For>
        </box>
    );
}