import {ChangeDetectionStrategy, Component, Input, TrackByFunction} from '@angular/core';
import {IGitSearchItem} from "../../interfaces/git.interface";

class IFrontGitSearchFilter {
  language: string | null = null;
  has_wiki: boolean | null = null;
  has_issues: boolean | null = null;
  has_pages: boolean | null = null;
}


/**
 * @Component компонент списка репозиториев
 */
@Component({
  selector: 'repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoListComponent {
  /** список репозиториев */
  @Input() repoList: IGitSearchItem[] = [];
  /** фронтовый фильтр */
  fltr = new IFrontGitSearchFilter();

  trackById(i: number, repo: IGitSearchItem) {
    return repo.id
  }
}
