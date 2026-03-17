import { createBinding } from "gnim"
//@ts-ignore
import AstalHyprland from 'gi://AstalHyprland'
import { Astal, Gtk, Gdk } from "ags/gtk4"

const hyprland = AstalHyprland.get_default()

export function Workspace() {
    const workspaces = new Gtk.Box({
        cssClasses: ["workspaces"],
        orientation: Gtk.Orientation.VERTICAL
    });
    const wrapper = new Gtk.Box({
        cssClasses: ["wrapper"],
        spacing: 3,
        margin_top: 12,
        margin_bottom: 12
    })

    const buttons: Gtk.Button[] = [];
    let connections: [number, Gtk.Button][] = []

    function update() {
        connections.forEach(data => data[1].disconnect(data[0]))
        connections = []
        const wss = hyprland.get_workspaces().filter(ws => ws.id >= 0);
        wss.sort((a, b) => b.id - a.id)
        const focus = hyprland["focused-workspace"].id;

        wss.forEach((ws, i) => {
            let button;
            if (buttons[i])
                button = buttons[i];

            else {
                button = new Gtk.Button({
                    can_shrink: true,
                    height_request: 8,
                    width_request: 8,
                });

                buttons[i] = button;
                wrapper.insert_child_after(button, null);
            }
            connections.push([button.connect("clicked", () => {
                ws.focus()
            }), button])

            buttons[i].cssClasses = (focus == ws.id ? ["sel", "ws"] : ["ws"]);
        })

        while (buttons.length > wss.length) {
            wrapper.remove(buttons[buttons.length - 1]);
            buttons.pop();
        }
    }

    workspaces.insert_child_after(wrapper, null);

        
    createBinding(hyprland, "focused-workspace").subscribe(update);
    update();

    return workspaces;
}
