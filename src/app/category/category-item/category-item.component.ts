import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent {

  @Input() category!: Category;
  constructor(
    readonly router: Router
  ) { }

  selectCategory(category: Category) {
    this.router.navigate(['/quiz', category.id]);
  }

}
