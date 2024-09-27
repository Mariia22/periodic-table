import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { rxState } from "@rx-angular/state";
import { PeriodicElement, PeriodicTableState } from "../../types/table";
import { PeriodicRepositoryService } from "../../services/periodic-repository.service";
import { combineLatest, map } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EditTablePopup } from "../edit-table-popup/edit-table-popup.component";
import { AsyncPipe } from "@angular/common";
import { SearchService } from "../../../shared/services/search-service/search-service.service";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [MatTableModule, MatIconModule, AsyncPipe],
  templateUrl: "./data-table.component.html",
  styleUrl: "./data-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  displayedColumns: string[] = ["position", "name", "weight", "symbol", "edit"];
  dialog = inject(MatDialog);
  private _searchService = inject(SearchService);
  private _elementsRepository: PeriodicRepositoryService = inject(
    PeriodicRepositoryService
  );
  private _state = rxState<PeriodicTableState>(({ set, connect }) => {
    set({ elements: [] });
    connect("elements", this._elementsRepository.getElements());
  });

  filteredData$ = combineLatest([
    this._state.select("elements"),
    this._searchService.search$,
  ]).pipe(
    map(([elements, searchText]) => {
      return elements.filter((element: PeriodicElement) => {
        const searchLower = searchText.toLowerCase();
        return (
          element.name.toLowerCase().includes(searchLower) ||
          element.weight.toString().toLowerCase().includes(searchLower) ||
          element.symbol.toLowerCase().includes(searchLower)
        );
      });
    })
  );

  onEdit(element: PeriodicElement) {
    this.dialog.open(EditTablePopup, {
      data: {
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol,
      },
    });
  }
}
