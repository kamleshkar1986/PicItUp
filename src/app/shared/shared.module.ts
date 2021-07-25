import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import * as btnComponents from './components';

@NgModule({
  declarations: [...btnComponents.components],//refer to shared/compnents/index.ts file
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    ...btnComponents.components  
  ]
})
export class SharedModule {}

// When using a Shared Module:
// DO declare components, pipes, directives, and export them.
// DO import FormsModule, ReactiveFormsModule and other (3rd-party) modules you need.
// DO import the SharedModule into any other Feature Modules.
// DO NOT provide app-wide singleton services in your SharedModule. Instead move these to the CoreModule.
// DO NOT import the SharedModule into the AppModule.