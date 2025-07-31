import { Pipe, PipeTransform } from "@angular/core";
import { mockedAuthorsList } from "../mocks/mock";

@Pipe({
  name: "authorNames",
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authors: string[]) {
    return authors.map(
      (authorId) =>
        mockedAuthorsList.find((author) => author.id === authorId)?.name ||
        "Unknown"
    );
  }
}
