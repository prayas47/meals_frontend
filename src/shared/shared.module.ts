import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { DataService } from './services/data.service';

@NgModule({
    imports: [],
    exports: [HeaderComponent ],
    declarations: [ HeaderComponent ],
    providers: [DataService]
})
export class SharedModule { }
