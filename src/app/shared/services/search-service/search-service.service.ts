import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private searchSubject = new BehaviorSubject<string>("");
  search$: Observable<string> = this.searchSubject.asObservable();

  updateSearchText(newValue: string): void {
    this.searchSubject.next(newValue);
  }
}
