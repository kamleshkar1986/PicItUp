import { ButtonAComponent } from './button-a/button-a.component';
import { ButtonBComponent } from './button-b/button-b.component';
export const components: any[] = [ButtonAComponent, ButtonBComponent];
export * from './button-a/button-a.component';
export * from './button-b/button-b.component';

// We’re doing 3 things here for each component, which is very easy when using VS Code’s IntelliSense:
// -> Import the Component
// -> Add it to a named exported object components
// -> Export the 

// We can now import one or more components from anywhere like this:
// import { ButtonAComponent, ButtonBComponent } from '/path/to/shared/components';