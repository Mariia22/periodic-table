import { Injectable } from "@angular/core";
import { ColumnType, PeriodicElement } from "../../types/table";
import { combineLatest, map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataTableService {
  columns: ColumnType[] = ["position", "name", "weight", "symbol", "edit"];

  filterPeriodicElements(
    elements: PeriodicElement[],
    searchText: string
  ): PeriodicElement[] {
    const searchLower = searchText.toLowerCase();
    return elements.filter(
      (element) =>
        element.name.toLowerCase().includes(searchLower) ||
        element.weight.toString().toLowerCase().includes(searchLower) ||
        element.symbol.toLowerCase().includes(searchLower)
    );
  }

  createFilteredDataObservable(
    elements: Observable<PeriodicElement[]>,
    searchText: Observable<string>
  ): Observable<PeriodicElement[]> {
    return combineLatest([elements, searchText]).pipe(
      map(([elements, searchText]) =>
        this.filterPeriodicElements(elements, searchText)
      )
    );
  }

  getColumnHeader(column: ColumnType): string {
    const headers: Record<ColumnType, string> = {
      position: "Number",
      name: "Name",
      weight: "Weight",
      symbol: "Symbol",
      edit: "Edit",
    };
    return headers[column] || column.toUpperCase();
  }

  updateTable(
    elements: PeriodicElement[],
    updatedElement: PeriodicElement
  ): PeriodicElement[] {
    return elements.map((element: PeriodicElement) =>
      element.position === updatedElement.position ? updatedElement : element
    );
  }
}
