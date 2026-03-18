import AstalMpris from "gi://AstalMpris";
import { Gtk } from "ags/gtk4";
import Pango from "gi://Pango?version=1.0";

export function Media() {
    const mpris = AstalMpris.get_default();
    const player = mpris.players[0];
    const cover = player ? player.coverArt : "";
    const coverUrl = cover.startsWith("file://") ? cover : `file://${cover}`;

    print(player.artist)
    print(player.title)

    return <box
        class={"media-wrapper"}
        orientation={Gtk.Orientation.VERTICAL}>
        <box orientation={Gtk.Orientation.HORIZONTAL}>
            <box hexpand={true}></box>
            <box
                class={"cover"}
                css={cover ? `
                background-image: url('${coverUrl}');
                background-size: cover;
                background-position: center;
                min-width: 128px; 
                min-height: 128px;
                ` : `
                background-color: red; 
                min-width: 100px; 
                min-height: 100px;
            `}>


            </box>
            <box hexpand={true}></box>
        </box>
        <label
            ellipsize={Pango.EllipsizeMode.END}
            class={"analytics"}
            label={`${player.title}\n${player.artist}`}
            css={"color: white;"}
            maxWidthChars={15}>
        </label>
    </box>
}