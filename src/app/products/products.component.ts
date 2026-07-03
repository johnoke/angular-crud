import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../products.service';
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
  products: Product[] = [];
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => { this.products = data; this.isLoading = false; },
      error: (err) => { console.error("Error fetching data", err); this.isLoading = false; }
    });
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
