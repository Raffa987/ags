import AstalMpris from "gi://AstalMpris";
import { Gtk } from "ags/gtk4";
import Pango from "gi://Pango?version=1.0";
import PangoCairo from "gi://PangoCairo?version=1.0";
import { createBinding } from "gnim";

// ==========================================
// 1. COMPONENTE DI SUPPORTO: AutoMarquee
// Gestisce automaticamente il testo fermo o scorrevole
// ==========================================
function AutoMarquee({ textBinding, maxWidth = 200, fontSize}: { textBinding: any, maxWidth?: number, fontSize: number }) {
    const container = new Gtk.Box({});
    
    let currentText = "";
    let offset = 0;
    let isPaused = false;
    let timer: ReturnType<typeof setInterval> | null = null;
    let textWidth = 0;

    // 1. Creiamo la Label Statica UNA SOLA VOLTA
    const staticLabel = new Gtk.Label({
        halign: Gtk.Align.START,
        cssClasses: ["analytics"], // Usa la tua classe corretta
        useMarkup: true,
        visible: false
    });

    // 2. Creiamo l'area di scorrimento UNA SOLA VOLTA
    const marqueeArea = new Gtk.DrawingArea({
        widthRequest: maxWidth,
        heightRequest: 20,
        visible: false // Parte nascosta
    });

    marqueeArea.set_draw_func((area, cr, w, h) => {
        cr.setSourceRGB(255, 255, 255); 
        const drawLayout = marqueeArea.create_pango_layout(currentText);
        drawLayout.set_font_description(Pango.FontDescription.from_string(`SF Pro ${fontSize}`));
        
        cr.moveTo(offset, 0);
        PangoCairo.update_layout(cr, drawLayout);
        PangoCairo.show_layout(cr, drawLayout);
    });

    // Aggiungiamo ENTRAMBI al contenitore fin dall'inizio
    container.append(staticLabel);
    container.append(marqueeArea);

    // Funzioni di supporto per il timer
    const startTimer = () => {
        if (timer) return; // Se è già partito, non fare nulla
        offset = 0;
        isPaused = false;
        timer = setInterval(() => {
            if (isPaused) return;

            offset -= 0.8; 
            if (offset <= 0 && offset + 0.8 > 0) {
                offset = 0;
                marqueeArea.queue_draw();
                isPaused = true;
                setTimeout(() => { isPaused = false; }, 2000);
                return;
            }
            if (offset < -textWidth) {
                offset = maxWidth; 
            }
            marqueeArea.queue_draw();
        }, 16); 
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    // 3. Logica di aggiornamento sicura (nessuna distruzione di widget)
    const updateUI = (text: string) => {
        currentText = text || "Sconosciuto";

        // Misuriamo la larghezza
        const layout = staticLabel.create_pango_layout(currentText);
        layout.set_font_description(Pango.FontDescription.from_string(`SF Pro ${fontSize}`));
        const [w, _] = layout.get_pixel_size();
        textWidth = w;

        if (textWidth > maxWidth) {
            // Testo lungo: Spegni la label, Accendi lo scorrimento
            staticLabel.visible = false;
            marqueeArea.visible = true;
            startTimer();
            marqueeArea.queue_draw(); // Forza un aggiornamento visivo
        } else {
            // Testo corto: Spegni lo scorrimento, Accendi la label
            marqueeArea.visible = false;
            stopTimer();
            
            // "Puliamo" il testo da caratteri che rompono l'HTML come la & (es. "R&B")
            const escapedText = currentText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            
            // Applichiamo la dimensione del font dinamicamente usando Pango Markup
            staticLabel.label = `<span font='SF Pro ${fontSize}'>${escapedText}</span>`; 
            
            staticLabel.visible = true;
        }
    };

    const getCurrentValue = () => {
        return textBinding.get ? textBinding.get() : (textBinding.peek ? textBinding.peek() : "");
    };

    // Inizializzazione
    updateUI(getCurrentValue());

    // Sottoscrizione
    const unsubscribe = textBinding.subscribe(() => {
        updateUI(getCurrentValue());
    });

    // Pulizia totale alla chiusura
    container.connect("destroy", () => {
        unsubscribe();
        stopTimer();
    });

    return container;
}

// ==========================================
// 2. COMPONENTE TESTO: SpecialLabel
// Raccoglie Titolo e Artista/Album usando AutoMarquee
// ==========================================
export function SpecialLabel({ player }: { player: AstalMpris.Player }) {
    
    // Binding standard per il titolo
    const titleBinding = createBinding(player, "title");
    
    // Creiamo un "Multi-Binding" fatto in casa che ascolta contemporaneamente Artista e Album
    const subtitleBinding = {
        // 1. Cosa restituire quando AutoMarquee chiede il testo
        get: () => {
            const nomeArtista = player.artist || "Artista Sconosciuto";
            const nomeAlbum = player.album || "Album Sconosciuto";
            return `${nomeArtista} - ${nomeAlbum}`;
        },
        
        // 2. A chi dare ascolto
        subscribe: (callback: () => void) => {
            // Ci iscriviamo a ENTRAMBI i segnali
            const unsubArtist = createBinding(player, "artist").subscribe(callback);
            const unsubAlbum = createBinding(player, "album").subscribe(callback);
            
            // Quando il widget viene distrutto, AutoMarquee chiamerà questa funzione
            // per pulire in un colpo solo tutte e due le iscrizioni
            return () => {
                if (typeof unsubArtist === "function") unsubArtist();
                if (typeof unsubAlbum === "function") unsubAlbum();
            };
        }
    };

    return (
        <box orientation={Gtk.Orientation.VERTICAL} spacing={2}>
            <AutoMarquee textBinding={titleBinding} maxWidth={200} fontSize={12}/>
            <AutoMarquee textBinding={subtitleBinding} maxWidth={200} fontSize={9}/>
        </box>
    );
}