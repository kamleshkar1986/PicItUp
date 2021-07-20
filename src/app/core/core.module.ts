import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class CoreModule { }

// In short, when using a Core Module:
// DO import modules that should be instantiated once in your app.
// DO place services in the module, but do not provide them.
// DO NOT declare components, pipes, directives.
// DO NOT import the CoreModule into any modules other than the AppModule.