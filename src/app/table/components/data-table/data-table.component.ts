import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { rxState } from "@rx-angular/state";
import {
  ColumnType,
  PeriodicElement,
  PeriodicTableState,
} from "../../types/table";
import { take } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EditTablePopup } from "../edit-table-popup/edit-table-popup.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { SearchService } from "../../../shared/services/search-service/search-service.service";
import { RxIf } from "@rx-angular/template/if";
import { DataTableService } from "../../services/data-table/data-table.service";
import { PeriodicRepositoryService } from "../../services/repository/periodic-repository.service";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    NgFor,
    RxIf,
  ],
  templateUrl: "./data-table.component.html",
  styleUrl: "./data-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  private _searchService = inject(SearchService);
  private _dataTableService = inject(DataTableService);
  private _elementsRepository = inject(PeriodicRepositoryService);
  private _state = rxState<PeriodicTableState>(({ set, connect }) => {
    set({ elements: [] });
    connect("elements", this._elementsRepository.getElements());
  });
  displayedColumns: ColumnType[] = this._dataTableService.columns;
  dialog = inject(MatDialog);

  filteredData$ = this._dataTableService.createFilteredDataObservable(
    this._state.select("elements"),
    this._searchService.search$
  );

  getColumnHeader(column: ColumnType): string {
    return this._dataTableService.getColumnHeader(column);
  }

  onUpdate(element: PeriodicElement) {
    const dialogRef = this.dialog.open(EditTablePopup, {
      data: { ...element },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.updateTableData(result);
        }
      });
  }

  private updateTableData(updatedElement: PeriodicElement) {
    this._state.set({
      elements: this._dataTableService.updateTable(
        this._state.get("elements"),
        updatedElement
      ),
    });
  }
}
