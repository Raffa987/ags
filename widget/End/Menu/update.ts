import { exec } from "ags/process";

export function updateVol(value: number) {
    exec(`wpctl set-volume @DEFAULT_AUDIO_SINK@ ${value}`)
}

export function updateBright(value: number) {
    exec(`brightnessctl set ${value}`)
}