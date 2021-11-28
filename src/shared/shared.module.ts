import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CartService } from './services/cart.service';

@NgModule({
    imports: [
    ],
    exports: [HeaderComponent],
    declarations: [ HeaderComponent],
    providers: [CartService],
})
export class SharedModule { }
