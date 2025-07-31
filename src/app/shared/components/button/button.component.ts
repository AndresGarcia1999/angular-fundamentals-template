import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, IconName } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  @Input() text?: string;
  @Input() iconName?: IconName;
  @Input() type: string = "button";
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
