import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../../common-services/Constants";
import {catchError, map, Observable, of} from "rxjs";
import {AuthorData} from "./author-table/author-table.component";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  serverUrl: string = Constants.serverUrl + "/authors";
  page: number = 0;
  size: number = 10;
  sort: string = "id,asc";

  constructor(
    private http: HttpClient
  ) {
  }

  getAuthors() {
    let url = this.serverUrl +
      "?withLiteraryWorks=false&page=" + this.page +
      "&size=" + this.size +
      "&sort=" + this.sort;

    return this.http.get(url)
      .pipe(
        map(
          (data) => {
            let list: any[] = data as any[];

            return list.map((book) => {
              return {
                id: book.id,
                authorName: book.name,
              }
            });
          }),
        catchError((err): Observable<AuthorData[]> => {
          alert('Попробуйте связаться с сервером позже.' + err);
          return of([]);        // Потом: Взять старую информацию
        })
      );
  }

  updateAuthor(author: AuthorData) {
    const url = this.serverUrl + `/${author.id}`;
    const requestBody = {
      name: author.authorName
    }

    return this.http.put(url, requestBody);
  }

  deleteAuthor(id: number) {
    let url = this.serverUrl + `/${id}`;

    return this.http.delete(url);
  }

  createAuthor(authorName: string) {
    let url = this.serverUrl + '?authorName=' + authorName;

    return this.http.post(url, null)
      .pipe(
        map(data => data as number)
      );
  }
}
