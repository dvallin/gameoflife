import ROT, { Display } from "rot-js"
import { Cell, update } from "./game-of-life";

export const DEFAULT_WIDTH = 30
export const DEFAULT_HEIGHT = 30

export interface GameSettings {
    framerate?: number
}

export function defaultSettings(): GameSettings {
    return {
        framerate: 2
    }
}

export class Game {
    public display: Display
    private settings: GameSettings
    private displayOptions: ROT.DisplayOptions

    private map: Cell[] = []

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
    }

    public build(): void {
        document.body.appendChild(this.display.getContainer())
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

    public run(): void {
        const next = Date.now() + (1000 / this.settings.framerate!)
        this.tick()
        const untilNextFrame = next - Date.now()
        setTimeout(() => this.run(), untilNextFrame)
    }

    public tick(): void {
        this.display.clear()
        this.map = this.nextMap()
        for (let y = 0; y < this.displayOptions.height!; y++) {
            for (let x = 0; x < this.displayOptions.width!; x++) {
                this.display.draw(x, y, this.map[this.index(x, y)] === Cell.Alive ? "A" : ".")
            }
        }
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

    private getCell(x: number, y: number): Cell {
        if (x < 0 || x >= this.displayOptions.width! || y < 0 || y >= this.displayOptions.height!) {
            return Cell.Dead
        }
        return this.map[this.index(x, y)]
    }

    private index(x: number, y: number): number {
        return x + y * this.displayOptions.width!
    }
}

const game = new Game()
game.build()
game.run()

