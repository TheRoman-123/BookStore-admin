import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthorTableComponent} from "./author-table/author-table.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthorRoutingModule} from "./author-routing.module";
import {NzFormModule} from "ng-zorro-antd/form";
import {AuthorModalAddComponent} from "./author-modal-add/author-modal-add.component";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  declarations: [
    AuthorTableComponent,
    AuthorModalAddComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzPopconfirmModule,
    NzInputModule,
    FormsModule,
    AuthorRoutingModule,
    NzFormModule,
    ReactiveFormsModule,
    NzModalModule
  ],
  exports: [
    AuthorTableComponent,
    AuthorModalAddComponent
  ]
})
export class AuthorModule { }
