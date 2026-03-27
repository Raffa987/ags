import AstalMpris from "gi://AstalMpris";
import { Gtk } from "ags/gtk4";
import Pango from "gi://Pango?version=1.0";
import PangoCairo from "gi://PangoCairo?version=1.0";
import { SpecialLabel } from "./Label";
import { createBinding } from "gnim";
import { For } from "gnim";


/*export function Media() {
    const mpris = AstalMpris.get_default();
    const player = mpris.players[0];
    const cover = player ? player.coverArt : "";
    const coverUrl = cover.startsWith("file://") ? cover : `file://${cover}`;

    print(player.artist)
    print(player.title)

    return 
}
*/

export function Media() {
  const players = createBinding(AstalMpris.get_default(), "players")
  return (
    <For each={players}>
      {(player) => (      
        <box
        class={"media-wrapper"}
        orientation={Gtk.Orientation.VERTICAL}>
        <box orientation={Gtk.Orientation.HORIZONTAL}>
            <box hexpand={true}></box>
            <box
                class={"cover"}
                css={player.coverArt ? `
                background-image: url('file://${player.coverArt}');
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

        <SpecialLabel
        player={player} />
    </box>
      )}
    </For>
  )
}
