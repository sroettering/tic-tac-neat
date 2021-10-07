import { Field } from './field.model';
import { PlayerSymbol } from './player-symbol.model';

export interface Board {
    fields: Field[];
    owner?: PlayerSymbol;
}
