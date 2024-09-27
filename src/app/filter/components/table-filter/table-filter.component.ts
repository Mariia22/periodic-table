import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { SearchService } from "../../../shared/services/search-service/search-service.service";
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subscription,
} from "rxjs";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-table-filter",
  standalone: true,
  imports: [ReactiveFormsModule, MatLabel, MatFormFieldModule, MatInputModule],
  templateUrl: "./table-filter.component.html",
  styleUrl: "./table-filter.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilter implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("searchElement", { static: false }) searchInput?: ElementRef;
  searchControl = new FormControl();
  private _searchService = inject(SearchService);
  private _subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.searchControl.setValue("");
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(
      fromEvent<KeyboardEvent>(this.searchInput?.nativeElement, "keyup")
        .pipe(
          debounceTime<KeyboardEvent>(2000),
          distinctUntilChanged<KeyboardEvent>()
        )
        .subscribe(() =>
          this.searchElements(this.searchInput?.nativeElement.value)
        )
    );
  }

  searchElements(value: string) {
    this._searchService.updateSearchText(value);
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
