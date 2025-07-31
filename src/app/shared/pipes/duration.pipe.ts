import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "duration",
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    const hh = hours < 10 ? `0${hours}` : `${hours}`;
    const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const hourLabel = hours === 1 ? "hour" : "hours";
    return `${hh}:${mm} ${hourLabel}`;
  }
}
