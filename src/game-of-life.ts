export enum Cell {
    Dead,
    Alive
}

export type Neighborhood = Cell[]

export function update(neighborhood: Neighborhood): Cell {
    return neighborhood[4]
}
