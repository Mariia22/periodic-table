import { Pipe, PipeTransform } from "@angular/core";
import { PeriodicElement } from "../../table/types/table";

@Pipe({
  name: "filter",
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: PeriodicElement[] | null, searchText: string): unknown {
    if (!items || !searchText) {
      return items;
    }

    const searchTerm = searchText.toLowerCase();

    return items.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm)
      )
    );
  }
}
