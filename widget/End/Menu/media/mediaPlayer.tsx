import AstalMpris from "gi://AstalMpris";
import { Gtk } from "ags/gtk4";
import { SpecialLabel } from "./Label"; // Assicurati che il path sia corretto
import { createBinding } from "gnim";
import { For } from "gnim";

export function Media() {
  const players = createBinding(AstalMpris.get_default(), "players");
  
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
                // Rendiamo il CSS reattivo ai cambi di coverArt
                css={createBinding(player, "coverArt").as(cover => {
                    if (!cover) {
                        return `
                        background-color: transparent; 
                        min-width: 100px; 
                        min-height: 100px;
                        `;
                    }
                    
                    // Assicuriamoci che abbia il formato corretto per l'URL
                    const coverUrl = (cover.startsWith("file://") ? cover : `file://${cover}`) || "audio-x-generic-symbolic";
                    return `
                    background-image: url('${coverUrl}');
                    background-size: cover;
                    background-position: center;
                    min-width: 128px; 
                    min-height: 128px;
                    `;
                })}>
            </box>
            <box hexpand={true}></box>
          </box>

          <SpecialLabel player={player} />
        </box>
      )}
    </For>
  );
}