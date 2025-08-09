import { Observable, of, map } from "rxjs";
import { Pipe, PipeTransform } from "@angular/core";

import { CoursesStoreService } from "@app/services/courses-store.service";

@Pipe({
  name: "authorNames",
})
export class AuthorNamesPipe implements PipeTransform {
  constructor(private coursesStoreService: CoursesStoreService) {}

  transform(authors: string[]): Observable<string> {
    if (!authors || authors.length === 0) {
      return of("");
    }

    return this.coursesStoreService.authors$.pipe(
      map((authorsData) => {
        const authorNames = authors.map(
          (authorId) =>
            authorsData.find((author) => author.id === authorId)?.name ||
            "Unknown"
        );
        return authorNames.join(", ");
      })
    );
  }
}
