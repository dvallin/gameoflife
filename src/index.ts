import ROT, { Display } from "rot-js"
import { Cell, update } from "./game-of-life"
import { Input } from "./input";

export const DEFAULT_WIDTH = 30
export const DEFAULT_HEIGHT = 30

export interface GameSettings {
    framerate?: number
}

export function defaultSettings(): GameSettings {
    return {
        framerate: 30
    }
}

export class Game {
    public display: Display
    private settings: GameSettings
    private displayOptions: ROT.DisplayOptions

    private map: Cell[] = []
    private turn: number = 0

    private input: Input | undefined = undefined

    constructor(settings?: GameSettings) {
        this.settings = Object.assign(defaultSettings(), settings)

        this.displayOptions = {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            forceSquareRatio: true,
            fontSize: 17,
            fontFamily: "Lucida Console, Monaco, monospace",
            bg: "black"
        }
        this.display = new ROT.Display(this.displayOptions)
        this.input = new Input((e) => this.display.eventToPosition(e))
    }

    public build(): void {
        document.body.appendChild(this.display.getContainer())

        this.input!.register()

        this.initializeMap()
    }

    public run(): void {
        const next = Date.now() + (1000 / this.settings.framerate!)
        this.tick()
        const untilNextFrame = next - Date.now()
        setTimeout(() => this.run(), untilNextFrame)
    }

    public tick(): void {
        this.turn += 1
        this.reactToUserInput()
        this.updateMap(15)
        this.renderMap()
    }

    private initializeMap() {
        for (let y = 0; y < this.displayOptions.height!; y++) {
            for (let x = 0; x < this.displayOptions.width!; x++) {
                this.map[this.index(x, y)] = Cell.Dead
            }
        }
        this.map[this.index(11, 11)] = Cell.Alive
        this.map[this.index(12, 11)] = Cell.Alive
        this.map[this.index(11, 12)] = Cell.Alive
        this.map[this.index(13, 12)] = Cell.Alive

        this.map[this.index(13, 14)] = Cell.Alive
        this.map[this.index(15, 14)] = Cell.Alive
        this.map[this.index(14, 15)] = Cell.Alive
        this.map[this.index(15, 15)] = Cell.Alive
    }

    private nextMap(): Cell[] {
        const nextMap: Cell[] = []
        for (let y = 0; y < this.displayOptions.height!; y++) {
            for (let x = 0; x < this.displayOptions.width!; x++) {
                const newCell = update([
                    this.getCell(x - 1, y - 1), this.getCell(x, y - 1), this.getCell(x + 1, y - 1),
                    this.getCell(x - 1, y), this.getCell(x, y), this.getCell(x + 1, y),
                    this.getCell(x - 1, y + 1), this.getCell(x, y + 1), this.getCell(x + 1, y + 1)
                ])
                nextMap.push(newCell)
            }
        }
        return nextMap
    }

    private updateMap(frameSkip: number) {
        if (this.turn % frameSkip === 0) {
            this.map = this.nextMap()
        }
    }

    private reactToUserInput(): void {
        if (this.input) {
            if (this.input.mouse.left) {
                this.setCell(this.input.mouse.x, this.input.mouse.y, Cell.Alive)
            }
        }
    }

    private renderMap(): void {
        this.display.clear()
        for (let y = 0; y < this.displayOptions.height!; y++) {
            for (let x = 0; x < this.displayOptions.width!; x++) {
                this.display.draw(x, y, this.map[this.index(x, y)] === Cell.Alive ? "A" : ".")
            }
        }
    }

    private getCell(x: number, y: number): Cell {
        if (x < 0 || x >= this.displayOptions.width! || y < 0 || y >= this.displayOptions.height!) {
            return Cell.Dead
        }
        return this.map[this.index(x, y)]
    }

    private setCell(x: number, y: number, cell: Cell) {
        if (x < 0 || x >= this.displayOptions.width! || y < 0 || y >= this.displayOptions.height!) {
            return
        }
        this.map[this.index(x, y)] = cell
    }

    private index(x: number, y: number): number {
        return x + y * this.displayOptions.width!
    }
}

const game = new Game()
game.build()
game.run()

