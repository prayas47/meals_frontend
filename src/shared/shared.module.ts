import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CartService } from './services/cart.service';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    imports: [],
    exports: [HeaderComponent , LoaderComponent],
    declarations: [ HeaderComponent , LoaderComponent],
    providers: [CartService],
})
export class SharedModule { }
