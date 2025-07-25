import { Component, Input } from "@angular/core";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() id!: string;
  @Input() creationDate!: string;
  @Input() duration!: number;
  @Input() authors!: string[];
}
