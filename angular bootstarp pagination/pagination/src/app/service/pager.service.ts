import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PagerService {

  constructor() { }

  getPager(totalPages: number, currentPage: number) {

    let startPage: number
    let endPage: number

    // if (totalPages <= 10) {
    //     // less than 10 total pages so show all
    //     startPage = 1;
    //     endPage = totalPages;
    // } else {
    //     // more than 10 total pages so calculate start and end pages
    //     if (currentPage <= 6) {
    //         startPage = 1;
    //         endPage = 10;
    //     } else if (currentPage + 4 >= totalPages) {
    //         startPage = totalPages - 9;
    //         endPage = totalPages;
    //     } else {
    //         startPage = currentPage - 5;
    //         endPage = currentPage + 4;
    //     }
    // }
    
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {

        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {    

            if((totalPages - (currentPage - 2)) == 5) {
               startPage = currentPage - 1;
              endPage = currentPage + 3;
            } else {
               startPage = currentPage - 2;
               endPage = currentPage + 2;
            }
        }
    }

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from({length: endPage - startPage + 1}, (_, i) => i + startPage)

    // return object with all pager properties required by the view
    return {
        currentPage: currentPage,
        startPage: startPage,
        endPage: endPage,
        pages: pages
    };
  }

}
