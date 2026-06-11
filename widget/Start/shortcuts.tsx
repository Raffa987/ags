import { execAsync } from "ags/process"

export function Apps() {
    return <box widthRequest={200}>
        <box class="buttons">
            <button hexpand={false}>
                <label label={"\u{f003b}"} class={"icons"} />
            </button>
            <button onClicked={() => execAsync("firefox")} hexpand={false}>
                <image iconName={"firefox"} pixelSize={14} />
            </button>
            <button onClicked={() => execAsync("code")} hexpand={false}>
                <image iconName={"vscode"} pixelSize={14} />
            </button>
            <button onClicked={() => execAsync("discord")} hexpand={false}>
                <image iconName={"discord"} pixelSize={14} />
            </button>
        </box>
        <box hexpand={true}></box>
    </box>
}