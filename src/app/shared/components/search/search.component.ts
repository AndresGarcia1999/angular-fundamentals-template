import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  @Input() placeholder: string = "Search...";
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild("searchForm") searchForm!: NgForm;

  onSearch() {
    if (this.searchForm.valid) {
      // Emit the search term to the parent component
      this.search.emit(this.searchForm.value.searchTerm);
    }
  }
}
