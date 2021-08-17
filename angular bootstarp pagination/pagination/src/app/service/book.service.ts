import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = 'http://localhost:8080/api/v1/book'

  constructor(private httpClient: HttpClient) { }

  getBooks = (bookRequest: any) => {

    let queryString = `?page=${bookRequest.page}&pageSize=${bookRequest.pageSize}&sortBy=${bookRequest.sortBy}&sortDirection=${bookRequest.sortDirection}`

    return this.httpClient.get<any>(this.baseUrl + queryString)
  }
}
