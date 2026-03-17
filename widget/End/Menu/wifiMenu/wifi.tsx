import { Astal, Gtk, Gdk } from "ags/gtk4"
import { createBinding } from "gnim"
import AstalNetwork from "gi://AstalNetwork?version=0.1"

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
                vscrollbarPolicy={2}>
                <Wifi />
            </scrolledwindow>

        </popover>
    </menubutton>
}



export function Wifi() {
    const networks = new Gtk.Box({
        cssClasses: ["networks"],
        orientation: Gtk.Orientation.VERTICAL
    });

    const wrapper = new Gtk.Box({
        cssClasses: ["wrapper"],
        spacing: 3,
        margin_top: 12,
        margin_bottom: 12,
        orientation: Gtk.Orientation.VERTICAL
    })

    const buttons: Gtk.Button[] = []
    let connections: [number, Gtk.Button][] = []

    function update() {
        connections.forEach(data => data[1].disconnect(data[0]))
        connections = []

        const nws = Network.wifi.accessPoints.filter(nw => nw.ssid)

        nws.forEach((nw, i) => {
            let button
            if (buttons[i]) {
                button = buttons[i];


                const box = button.get_child() as Gtk.Box;
                const icon = box.get_first_child() as Gtk.Image;
                const label = box.get_last_child() as Gtk.Label;

                icon.iconName = nw.iconName || "network-wireless-symbolic";
                label.set_label(nw.ssid);
            }
            else {
                button = new Gtk.Button({
                    can_shrink: true,
                    cssClasses: ["wifi-item"]
                });

                const contentBox = new Gtk.Box({
                    spacing: 8,
                    orientation: Gtk.Orientation.HORIZONTAL
                });

                const icon = new Gtk.Image({
                    icon_name: nw.iconName || "network-wireless-symbolic",
                    cssClasses: ["wifi-icon"]
                });
                const label = new Gtk.Label({ label: nw.ssid });

                contentBox.append(icon);
                contentBox.append(label);

                button.set_child(contentBox);
                buttons[i] = button;


                wrapper.append(button);
            }
            connections.push([button.connect("clicked", () => {
                print(`Connessione a: ${nw.ssid}`);
            }), button])
        })

        while (buttons.length > nws.length) {
            wrapper.remove(buttons[buttons.length - 1]);
            buttons.pop()
        }
    }

    networks.append(wrapper)

    createBinding(Network.wifi, "accessPoints").subscribe(update)
    update()
    return networks
}