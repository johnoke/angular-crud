import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
export interface CreateProduct {
  name?: string;
  price?: string;
  stock?: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private apiUrl = "https://localhost:7110/api/products";
  //GET
  getProducts(): Observable<Product[]>{
    const token = localStorage.getItem("access_token");
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }
  getProduct(id: number): Observable<Product>{
    const token = localStorage.getItem("access_token");
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.get<Product>(this.apiUrl + "/" + id.toString(),  { headers });
  }
  createProduct(product: CreateProduct): Observable<CreateProduct>{
    const token = localStorage.getItem("access_token");
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.post<CreateProduct>(this.apiUrl, product,  { headers });
  }
  editProduct(product: Product): Observable<void>{
    const token = localStorage.getItem("access_token");
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.put<void>(this.apiUrl +"/"+ product.id.toString(), product,  { headers });
  }
  deleteProduct(id:number): Observable<void>{
    const token = localStorage.getItem("access_token");
    var headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    })
    return this.http.delete<void>(this.apiUrl +"/"+ id.toString(),  { headers });
  }
  constructor() { }
}
