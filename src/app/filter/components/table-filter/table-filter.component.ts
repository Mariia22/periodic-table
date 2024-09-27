import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SearchService } from "../../../shared/services/search-service/search-service.service";

@Component({
  selector: "app-table-filter",
  standalone: true,
  imports: [MatLabel, MatFormFieldModule, MatInputModule],
  templateUrl: "./table-filter.component.html",
  styleUrl: "./table-filter.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilter {
  private _searchService = inject(SearchService);

  searchElements(value: string) {
    this._searchService.updateSearchText(value);
  }
}
