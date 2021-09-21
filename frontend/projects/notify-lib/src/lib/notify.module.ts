import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotifyComponent } from './notify.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    NotifyComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NotifyComponent
  ]
})
export class NotifyModule { }
