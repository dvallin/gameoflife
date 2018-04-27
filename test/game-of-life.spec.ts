import { update, Cell, Neighborhood } from "../src/game-of-life"

const d: Cell = Cell.Dead
const a: Cell = Cell.Alive

describe("GameOfLife", () => {

    it("dead tiles remain dead in dead neigborhood", () => {
        // given
        const neighborhood: Neighborhood = [
            d, d, d,
            d, d, d,
            d, d, d
        ]

        // when + then
        expect(update(neighborhood)).toEqual(d)
    })

    /// TODO: Dead with exactly 3 alive neighbors becomes alive
    /// TODO: Alive with less than 2 alive neighbors dies
    /// TODO: Alive with 2 or 3 alive neighbors stays alive
    /// TODO: Alive with more than 3 alive neighbors dies
})
