import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RepoComponent} from "./repo/repo/repo.component";
import {ReposComponent} from "./repo/repos/repos.component";

const routes: Routes = [
  {path: '', redirectTo: 'repos', pathMatch: 'full'},
  {component: ReposComponent, path: 'repos'},
  {component: RepoComponent, path: 'repo/:repoOwnerLogin/:repoName'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
