import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RepoSearchComponent} from "./components/repo-search.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {commonVendors} from "./app.vendors";
import {RepoListComponent} from "./components/repo-list/repo-list.component";
import {FilterPipe} from "./pipes/filter.pipe";
import {BooleanComponent} from "./components/boolean.component";
import {TripleCheckboxComponent} from "./components/triple-checkbox.component";
import {RepoComponent} from "./components/repo/repo.component";
import {ReposComponent} from "./components/repos/repos.component";

@NgModule({
  declarations: [
    AppComponent,
    RepoSearchComponent,
    RepoListComponent,
    BooleanComponent,
    TripleCheckboxComponent,
    ReposComponent,
    RepoComponent,
    FilterPipe,
  ],
  imports: [
    ...commonVendors,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
