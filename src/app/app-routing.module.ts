import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [ 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'product/:sno',
    loadChildren: () => import('./modules/product/product.module').then( m => m.ProductPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
