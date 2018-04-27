export interface InputState {
    mouse: Mouse
}

export interface Mouse {
    x: number
    y: number
    clickX: number | undefined
    clickY: number | undefined
    click_count: number
    left: boolean
    right: boolean
}

export class Input {
    private state: InputState

    constructor(private eventToPosition: (e: UIEvent) => [number, number] | number) {
        this.state = {
            mouse: {
                click_count: 0,
                x: 0,
                y: 0,
                clickX: undefined,
                clickY: undefined,
                left: false,
                right: false
            }
        }
    }

    public register(): void {
        document.addEventListener("mousemove", this.mousemove.bind(this))
        document.addEventListener("mousedown", this.mousedown.bind(this))
        document.addEventListener("mouseup", this.mouseup.bind(this))
    }

    get mouse(): Mouse {
        return this.state.mouse
    }

    private handleMouse(mouse: Mouse, e: MouseEvent): void {
        const pos = this.eventToPosition(e) as [number, number]
        mouse.x = pos[0]
        mouse.y = pos[1]

        mouse.left = (e.buttons & 1) === 1
        mouse.right = (e.buttons & 2) === 2
        mouse.click_count = e.detail || 0
    }

    private mousedown(event: MouseEvent): void {
        this.handleMouse(this.state.mouse, event)
        this.state.mouse.clickX = this.state.mouse.x
        this.state.mouse.clickY = this.state.mouse.y
    }

    private mouseup(event: MouseEvent): void {
        this.handleMouse(this.state.mouse, event)
    }

    private mousemove(event: MouseEvent): void {
        this.handleMouse(this.state.mouse, event)
    }
}
