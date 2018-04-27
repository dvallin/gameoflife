export enum Cell {
    Dead,
    Alive
}

export type Neighborhood = Cell[]

export function update(neighborhood: Neighborhood): Cell {
    const centerCell = neighborhood[4]
    let alive = neighborhood.filter(cell => cell === Cell.Alive).length
    if (centerCell === Cell.Alive) {
        alive -= 1
        if (alive > 3) {
            return Cell.Dead
        } else if (alive > 1) {
            return Cell.Alive
        } else {
            return Cell.Dead
        }
    } else if (alive === 3) {
        return Cell.Alive
    }
    return neighborhood[4]
}
