import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LayoutModule} from '@angular/cdk/layout';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import { ShellComponent } from './shell/shell.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

const components: Array<any> = [
  ShellComponent,
  DeleteButtonComponent
];

const MaterialModules: Array<any> = [
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
];

const otherModules: Array<any> = [
  RouterModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    ...otherModules,
    ...MaterialModules,
  ],
  exports: [
    RouterModule,
    ...otherModules,
    ...MaterialModules,
    ...components
  ]
})
export class SharedModule { }
