import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { BookRequest } from 'src/app/model/book-request';
import { BookService } from 'src/app/service/book.service';
import { PagerService } from 'src/app/service/pager.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookRequest: BookRequest = new BookRequest()
  books: Book[]
  first: boolean
  last: boolean
  pageNumber: number
  numberOfElements: number
  pageSize: number
  totalElements: number
  totalPages: number

  pages = []
  startPage: number
  currentPage: number

  // pager object
  pager: any = {};

  constructor(private bookService: BookService, private pagerService: PagerService) { } 

  ngOnInit() {
     //this.getBooks(1, true)
    this.getBooksV2(1)
  }

  // version 1
  getBooks = (page: number, isFromEllipsis: boolean) => {

    this.bookRequest.page = page - 1
    this.bookRequest.pageSize = 3
    this.bookRequest.sortBy = 'title'
    this.bookRequest.sortDirection = 'DESC'

    this.bookService.getBooks(this.bookRequest).subscribe(response => {

      this.books = response.content
      this.first = response.first
      this.last = response.last
      this.pageSize = response.pageSize
      this.totalElements = response.totalElements
      this.totalPages = response.totalPages

      this.currentPage = response.number + 1

      if (isFromEllipsis) {

        this.pages = []

        if (page < 4) {
          this.startPage = 1
        } else if (page < this.totalPages - 1) {
          this.startPage = page - 2
        } else if (page < this.totalPages) {
          this.startPage = this.totalPages - 4
        } 

        for (let index = this.startPage; index <= this.startPage + 4; index++) {
          this.pages.push(index)
        }
      }
    },
    error => {
      console.log(error);     
    })
  }

  setPage = (page: number, isFromEllipsis = false) => {
    this.getBooks(page, isFromEllipsis)
  }


// version 2
  getBooksV2 = (page: number) => {

    this.bookRequest.page = page - 1
    this.bookRequest.pageSize = 4
    this.bookRequest.sortBy = 'title'
    this.bookRequest.sortDirection = 'DESC'

    this.bookService.getBooks(this.bookRequest).subscribe(response => {

      this.books = response.content
      this.first = response.first
      this.last = response.last
      this.pageSize = response.size
      this.totalElements = response.totalElements
      this.totalPages = response.totalPages
      this.currentPage = response.number + 1

      this.setPageV2(this.currentPage)
    },
    error => {
      console.log(error);     
    })
  }

  setPageV2(page: number) {

    if (page < 1 || page > this.totalPages) {
        return;
    }
    // get pager object from service
    this.pager = this.pagerService.getPager(this.totalPages, page);
  }

}





