import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category, CategoryService } from '../shared/services/category.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  query = '';
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  getCategorySubscription?: Subscription

  constructor(
    readonly categoryService: CategoryService
  ) { }

  ngOnInit(): void {  
    this.getCategorySubscription = this.categoryService.getAll().subscribe((data) => {
      this.categories = data 
    });
  }

  isSearching(): boolean {
    return this.query.length > 0;
  }

  searchCategory() {
    if(this.getCategorySubscription)
      this.getCategorySubscription.unsubscribe()
    if (this.query === '') {
      this.getCategorySubscription = this.categoryService.getAll().subscribe((data) => {
        this.categories = data 
      });
    } else {
      this.categories = this.categories.filter((category) => category.label.toLowerCase().includes(this.query.toLowerCase())); 
    }
  }

  clearSearch() {
    this.query = '';
    this.getCategorySubscription = this.categoryService.getAll().subscribe((data) => {
      this.categories = data 
    });
  }
}
