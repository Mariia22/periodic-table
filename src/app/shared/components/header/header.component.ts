import { Component } from "@angular/core";
import { TableFilter } from "../../../filter/components/table-filter/table-filter.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { RxIf } from "@rx-angular/template/if";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [TableFilter, MatIconModule, MatButtonModule, RxIf],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  showSearchInput = false;

  toggleSearch() {
    this.showSearchInput = !this.showSearchInput;
  }
}
