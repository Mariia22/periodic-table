export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface PeriodicTableState {
  elements: PeriodicElement[];
}

export type ColumnType = "position" | "name" | "weight" | "symbol" | "edit";
