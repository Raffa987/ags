import { exec } from "ags/process"

let percentageStr: string = exec('cat /sys/class/power_supply/BAT1/capacity') 
let percentage: number = parseInt(percentageStr)
let status: string = exec('cat /sys/class/power_supply/BAT1/status');
const percentageIcon = ['\u{f007a}', '\u{f007b}', '\u{f007c}', '\u{f007d}', '\u{f007e}', '\u{f007f}', '\u{f0080}', '\u{f0081}', '\u{f0082}', '\u{f0079}']
const chargingIcon = ['\u{f089c}', '\u{f0086}', '\u{f0087}', '\u{f0088}', '\u{f089d}', '\u{f0089}', '\u{f089e}', '\u{f008a}', '\u{f008b}', '\u{f0085}']
const batterySave = '\u{f120f}'
const lowBattery = '\u{f10cd}'
const lowBatCharging = '\u{f089f}'
//@ts-ignore
setInterval(() => {
  percentageStr = exec('cat /sys/class/power_supply/BAT1/capacity')
  percentage = parseInt(percentageStr)
  status = exec('cat /sys/class/power_supply/BAT1/status')
}, 5000);


function digit() {
  return Math.round(percentage / 10)
}

function returnIcon(){
  if(percentage <= 81 && percentage >= 79 && status == 'Not charging') {
    return batterySave
  }else if(percentage <= 5){
    if(status == 'Discharging'){
      return lowBattery;
    } else {
      return lowBatCharging
    }
  }else if(status == 'Discharging') {
    return percentageIcon[digit()]
  } else return chargingIcon[digit()]
}


export function BatteryIcon() {  
  return returnIcon()
}
export function BatteryPercentage() {
  return percentageStr
}