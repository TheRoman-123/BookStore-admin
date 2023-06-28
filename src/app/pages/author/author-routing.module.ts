import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AuthorTableComponent} from "./author-table/author-table.component";
import {AuthorModalAddComponent} from "./author-modal-add/author-modal-add.component";

const routes: Routes = [
  { path: '', component: AuthorTableComponent },
  { path: 'add', component: AuthorModalAddComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule {
}
