import AstalMpris from "gi://AstalMpris";
import { Gtk } from "ags/gtk4";
import Pango from "gi://Pango?version=1.0";
import PangoCairo from "gi://PangoCairo?version=1.0";
import { Response } from "gnim/fetch";
import { createBinding } from "gnim";



export function SpecialLabel({ player }: { player: AstalMpris.Player }) {

    const wrapper = new Gtk.Box

    const marquee = new Gtk.Box({
        visible: false
    })
    //@ts-ignore
    let moving: Gtk.Box = Moving({player: player})
    marquee.insert_child_after(moving, null)

    const stillText = new Gtk.Box({
        visible: false
    })
    //@ts-ignore
    let still: Gtk.Box = Still({player: player})
    stillText.insert_child_after(still, null)
    
    return moving
}


function Moving({ player }: { player: AstalMpris.Player }) {

    let isPaused = false
    let offset = 0 // Posizione iniziale 
    return (<box orientation={Gtk.Orientation.VERTICAL}>
        <drawingarea
            widthRequest={200}
            heightRequest={30}
            $={(self) => {
                self.set_draw_func((area, cr, width, height) => {
                    cr.rectangle(0, 0, width, height)

                    cr.setSourceRGB(255, 255, 255)

                    const layout = self.create_pango_layout(createBinding(player, "title").peek())

                    const fontDesc = Pango.FontDescription.from_string("SF Pro 12")
                    layout.set_font_description(fontDesc)

                    cr.moveTo(offset, 10)
                    PangoCairo.update_layout(cr, layout)
                    PangoCairo.show_layout(cr, layout)
                })

                // Loop di animazione
                const timer = setInterval(() => {

                    if (isPaused) return;

                    offset -= 0.8;
                    if (offset <= 0 && offset + 0.8 > 0) {

                        offset = 0;
                        self.queue_draw();

                        isPaused = true;
                        setTimeout(() => {
                            isPaused = false;
                        }, 2000);

                        return;
                    }
                    if (offset < -400) {
                        offset = self.get_allocated_width();
                    }
                    self.queue_draw();
                }, 16);

                self.connect("destroy", () => clearInterval(timer))
            }}
        />
        <label
            halign={Gtk.Align.START}
            ellipsize={Pango.EllipsizeMode.END}
            maxWidthChars={15}
            overflow={Gtk.Overflow.HIDDEN}
            class={"analytics"}
            label={createBinding(player, "artist")}
            css={"color: white;"}>
        </label>
    </box>
    )
}

function Still({ player }: { player: AstalMpris.Player }) {
    return (<box
        orientation={Gtk.Orientation.VERTICAL}><label
            halign={Gtk.Align.START}
            class={"analytics"}
            label={createBinding(player, "title")}
            css={"color: white;"}>
        </label>
        <label
            halign={Gtk.Align.START}
            class={"analytics"}
            label={createBinding(player, "artist")}
            css={"color: white;"}>
        </label>
    </box>
    )
}