import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../products.service';
import { SecurityService, SecurityToken } from '../security.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive]
})
export class ProductsComponent implements OnInit{
  constructor(private router: Router){

  }
  isLoading = true;
  private productsService = inject(ProductsService);
  private securityService = inject(SecurityService);
  products: Product[] = [];
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => { this.products = data; this.isLoading = false; },
      error: (err) => { 
        console.error("Error fetching data"); 
        if(err.status == 401){
          this.securityService.getToken().subscribe({
            next: (data) => {
              localStorage.setItem("access_token", data.access_token ?? "");
              this.getProducts();
            },
            error: (err) => {
              console.error("Error getting token", err);
            }
          })
        }
      }
    });
  }
  getProducts() :void {
    this.productsService.getProducts().subscribe({
      next: (data) => { this.products = data; this.isLoading = false; },
      error: (err) => { 
        console.error("Error fetching products", err);
      }
    })
  }
  trackByProductId(index: number, product: any): number {
    return product.id;
  }
  deleteClicked(id: number){
    if(this.isLoading == false){
      this.isLoading = true;
      this.productsService.deleteProduct(id).subscribe({
        next: (data) => { 
          this.productsService.getProducts().subscribe({
            next: (data) => this.products = data,
            error: (err) => console.error("Error fetching data", err)
          });
          this.isLoading = false;
        },
        error: (err) => {
          console.error("Error deleting data", err);
          this.isLoading = false;
        }
      })
    }
  }
}
