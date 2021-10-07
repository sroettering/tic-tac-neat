import { Board } from './models/board.model';
import { Field } from './models/field.model';
import { PlayerSymbol } from './models/player-symbol.model';

export class Game {

  public board: Board;

  private isCellFree(fieldIdx: number, cellIdx: number): boolean {
    return this.board.fields[fieldIdx].cells[cellIdx].owner == null;
  }

  private determineWinnerForBoard(board: Board): PlayerSymbol | null {
    return this.determineWinner(board.fields);
  }

  private determineWinnerForField(field: Field): PlayerSymbol | null {
    return field.owner != null
      ? field.owner
      : this.determineWinner(field.cells);
  }

  private determineWinner<T extends { owner?: PlayerSymbol }>(fieldsOrBoard: T[]): PlayerSymbol | null {
    /**
     * Winning conditions:
     * 1. [X, X, X, _, _, _, _, _, _] horizontal
     * 2. [_, _, _, X, X, X, _, _, _] horizontal
     * 3. [_, _, _, _, _, _, X, X, X] horizontal
     * 4. [X, _, _, X, _, _, X, _, _] vertical
     * 5. [_, X, _, _, X, _, _, X, _] vertical
     * 6. [_, _, X, _, _, X, _, _, X] vertical
     * 6. [X, _, _, _, X, _, _, _, X] diagonal
     * 6. [_, _, X, _, X, _, X, _, _] diagonal
     */
    const winningConditions: Array<[number, number, number]> = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
      [0, 4, 8], [2, 4, 6] // diagonal
    ];

    return winningConditions.map(([pos1, pos2, pos3]: [number, number, number]) => {
      return [fieldsOrBoard[pos1].owner, fieldsOrBoard[pos2].owner, fieldsOrBoard[pos3].owner];
    })
      .filter(([p1, p2, p3]: [PlayerSymbol, PlayerSymbol, PlayerSymbol]) => p1 != null && p1 === p2 && p2 === p3)
      .map((playerSymbols: [PlayerSymbol, PlayerSymbol, PlayerSymbol]) => playerSymbols[0])
      .pop();
  };
}
