import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService, Product, CreateProduct } from 'src/app/products.service';
import { Router } from "@angular/router";
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  constructor(private router: Router){

  }
  isSubmitted = false;
  submittedOnce = false;
  private productsService = inject(ProductsService);
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
  })
  onSubmit(){
    this.submittedOnce = true;
    if(this.productForm.valid){
      this.isSubmitted = true;
      const product: CreateProduct = this.productForm.value as CreateProduct;
      this.productsService.createProduct(product).subscribe({
        next: (data) => {
          this.router.navigate(["/products"])
        },
        error: (err) => {
          console.error("Error creating product", err)
          this.isSubmitted = false;
        }
      })
    }
  }
}
