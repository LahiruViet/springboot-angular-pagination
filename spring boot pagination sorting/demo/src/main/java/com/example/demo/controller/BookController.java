package com.example.demo.controller;

import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/book")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping
    Page<Book> getBooks(@RequestParam Optional<Integer> page, @RequestParam Optional<Integer> pageSize,
                        @RequestParam Optional<String> sortBy,
                        @RequestParam Optional<String> sortDirection) {

        PageRequest pageRequest = PageRequest.of(page.orElse(0), pageSize.orElse(5),
                Sort.Direction.ASC, sortBy.orElse("id"));

        if (sortDirection.isPresent()) {
            if (sortDirection.get().equals(Sort.Direction.DESC.name())) {
                pageRequest = PageRequest.of(page.orElse(0), pageSize.orElse(5),
                        Sort.Direction.DESC, sortBy.orElse("id"));
            }
        }

        return bookService.findAll(pageRequest);
    }
}
