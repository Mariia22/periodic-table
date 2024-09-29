import { Component } from "@angular/core";
import { DataTableComponent } from "./table/components/data-table/data-table.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DataTableComponent, HeaderComponent, FooterComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "Periodic table";
}
