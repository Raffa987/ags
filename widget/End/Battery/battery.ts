import { exec } from "ags/process"


let percentageStr: string = "?";
let percentage: number = 0;
let status: string = "Unknown";

const percentageIcon = ['\u{f007a}', '\u{f007b}', '\u{f007c}', '\u{f007d}', '\u{f007e}', '\u{f007f}', '\u{f0080}', '\u{f0081}', '\u{f0082}', '\u{f0079}']
const chargingIcon = ['\u{f089c}', '\u{f0086}', '\u{f0087}', '\u{f0088}', '\u{f089d}', '\u{f0089}', '\u{f089e}', '\u{f008a}', '\u{f008b}', '\u{f0085}']
const batterySave = '\u{f120f}'
const lowBattery = '\u{f10cd}'
const lowBatCharging = '\u{f089f}'
const errorIcon = '\u{f00d2}' 


function updateBattery() {
  try {
    percentageStr = exec('cat /sys/class/power_supply/BAT1/capacity').trim();
    percentage = parseInt(percentageStr);
    
    if (isNaN(percentage)) percentage = 0; 
    
    status = exec('cat /sys/class/power_supply/BAT1/status').trim();
  } catch (err) {
    percentageStr = "N/A";
    percentage = 0;
    status = "Error";
  }
}

updateBattery();

//@ts-ignore
setInterval(() => {
  updateBattery();
}, 5000);

function digit() {
  const idx = Math.round(percentage / 10);
  return Math.max(0, Math.min(9, idx));
}

function returnIcon() {
  if (status === "Error") return errorIcon;

  if (percentage <= 81 && percentage >= 79 && status == 'Not charging') {
    return batterySave;
  } else if (percentage <= 5) {
    if (status == 'Discharging') {
      return lowBattery;
    } else {
      return lowBatCharging;
    }
  } else if (status == 'Discharging') {
    return percentageIcon[digit()];
  } else {
    return chargingIcon[digit()];
  }
}

export function BatteryIcon() {  
  return returnIcon();
}

export function BatteryPercentage() {
  return percentageStr;
}