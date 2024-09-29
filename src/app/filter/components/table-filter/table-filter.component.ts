import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from "@angular/core";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SearchService } from "../../../shared/services/search-service/search-service.service";
import { debounceTime, distinctUntilChanged } from "rxjs";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-table-filter",
  standalone: true,
  imports: [ReactiveFormsModule, MatLabel, MatFormFieldModule, MatInputModule],
  templateUrl: "./table-filter.component.html",
  styleUrl: "./table-filter.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilter {
  searchControl = new FormControl("", { validators: [] });
  private _searchService = inject(SearchService);
  readonly searchSignal = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(2000),
      distinctUntilChanged()
    )
  );

  constructor() {
    effect(() => {
      this.searchElements(this.searchSignal());
    });
  }

  searchElements(value: string | null | undefined) {
    if (typeof value !== "string") return;
    this._searchService.updateSearchText(value);
  }
}
