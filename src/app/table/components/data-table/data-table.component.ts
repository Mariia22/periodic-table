import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { RxState } from "@rx-angular/state";
import { PeriodicElement, PeriodicTableState } from "../../types/table";
import { PeriodicRepositoryService } from "../../services/periodic-repository.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { EditTablePopup } from "../edit-table-popup/edit-table-popup.component";

@Component({
  selector: "app-data-table",
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: "./data-table.component.html",
  styleUrl: "./data-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class DataTableComponent {
  displayedColumns: string[] = ["position", "name", "weight", "symbol", "edit"];
  dataSource: Observable<PeriodicElement[]>;
  dialog = inject(MatDialog);

  constructor(
    private _state: RxState<PeriodicTableState>,
    private _elementsRepository: PeriodicRepositoryService
  ) {
    this._state.connect("elements", this._elementsRepository.getElements());
    this.dataSource = this._state.select("elements");
  }

  onEdit(element:PeriodicElement) {
    this.dialog.open(EditTablePopup, {
      data: {
        position: element.position,
        name: element.name,
        weight: element.weight,
        symbol: element.symbol,
      }
    });
  }
}
