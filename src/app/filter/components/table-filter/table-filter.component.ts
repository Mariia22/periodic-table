import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-table-filter",
  standalone: true,
  imports: [ReactiveFormsModule, MatLabel, MatFormFieldModule, MatInputModule],
  templateUrl: "./table-filter.component.html",
  styleUrl: "./table-filter.component.scss",
})
export class TableFilter {
  searchControl = new FormControl();
  searchElements(value: string) {
    console.log(value);
  }
}
