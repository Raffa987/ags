import { exec } from "ags/process";

let volumeString: string = exec('wpctl get-volume @DEFAULT_AUDIO_SINK@')
const icons = ['\u{f0e08}', '\u{f057f}', '\u{f0580}', '\u{f057e}']

setInterval(() =>
    volumeString = exec('wpctl get-volume @DEFAULT_AUDIO_SINK@')
, 500);

function getVolume(){
    let volume = parseFloat(volumeString.split(" ")[1])
    if(volume == 0) return 0 
    else if(volume < 0.33) return 1
    else if(volume < 0.66) return 2
    else return 3

}

export function volumeIcon() {
    return icons[getVolume()]
}