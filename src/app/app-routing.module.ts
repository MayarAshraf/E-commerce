import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductsComponent } from './components/products/products.component';
import { SliderComponent } from './components/slider/slider.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
 {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'Home',component:MainLayoutComponent},
  {path:'AboutUs',component:AboutUsComponent},
  {path:'Products',component:ProductsComponent},
  {path:'Slider',component:SliderComponent},
  {path:'Contact',component:ContactComponent},
  {path:'Cart',component:CartComponent},
  {path:'footer',component:FooterComponent},
  {path:'ProductDetails/:pid',component:ProductDetailsComponent},
  {path:'Register',component:RegisterComponent},
  {path:'Login',component:LoginComponent},
  {path:'Logout',component:LoginComponent},
  // {path:'**',component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
