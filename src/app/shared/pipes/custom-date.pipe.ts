import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(date: string) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  }
}
