import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService, Product, CreateProduct } from 'src/app/products.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterLinkActive],
  standalone: true,
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  productId!: string;
  isLoading = true;
  submittedOnce = false;
  isSaved = false;
  product!: Product;
  private productsService = inject(ProductsService);
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required)
  })
  constructor(private route: ActivatedRoute, private router: Router){
    this.productId = this.route.snapshot.paramMap.get("id")!;
  }
  ngOnInit(): void {
    this.productsService.getProduct(Number(this.productId)).subscribe({
      next: (data) => { 
        this.product = data; 
        this.isLoading = false; 
        this.productForm.patchValue({
          name: this.product.name,
          price: this.product.price.toString(),
          stock: this.product.stock.toString()
        });
      },
      error: (err) => console.error("Error fetching data", err)
    });
  }
   onSubmit(){
    this.submittedOnce = true;
    if(this.productForm.valid){
      this.isSaved = false;
      this.isLoading = true;
      const rawValue = this.productForm.value;
      const product: Product = {
        id: Number(this.productId),
        name: rawValue.name ?? '',
        price: Number(rawValue.price),
        stock: Number(rawValue.stock)
      };
      this.productsService.editProduct(product).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.isSaved = true;
        },
        error: (err) => {
          console.error("Error creating product", err)
          this.isLoading = false;
        }
      })
    }
  }
}
