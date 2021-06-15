import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule ,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatCarouselModule.forRoot(),
  ],
  exports: [  
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    MatCarouselModule
   ]
})
export class MatControlsModuleModule { }
