import { Astal, Gtk, Gdk } from "ags/gtk4"
import { volumeIcon } from "./volume"
import { createPoll } from "ags/time" // Importiamo la funzione che già usi!

// Creiamo un "poll" proprio come hai fatto per l'orario.
// Valore iniziale: volumeIcon()
// Intervallo: 500ms
// Funzione da eseguire: volumeIcon
const volIcon = createPoll(volumeIcon(), 500, () => volumeIcon())

export function Volume() {
    return (
        <label 
            halign={Gtk.Align.CENTER}
            cssClasses={["icons"]} 
            label={volIcon} // Passiamo il poll direttamente alla label
        />
    )
}