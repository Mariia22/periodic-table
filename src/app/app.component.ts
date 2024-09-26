import { Component } from "@angular/core";
import { DataTableComponent } from "./table/components/data-table/data-table.component";
import { TableFilter } from "./filter/components/table-filter/table-filter.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DataTableComponent, TableFilter],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Periodic table";
}
