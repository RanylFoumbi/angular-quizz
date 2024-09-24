import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private readonly httpClient: HttpClient) { }
  
  apiUrl = "http://localhost:3000/categories"
  categories:Category[] = []

  getAll() { 
    return this.httpClient.get<Category[]>(this.apiUrl)
  }

}

export type Category = {
  id: string,
  label: string
}
