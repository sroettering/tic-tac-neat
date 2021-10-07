import { Cell } from './cell.model';
import { PlayerSymbol } from './player-symbol.model';

export interface Field {
    cells: Cell[];
    owner?: PlayerSymbol;
}
