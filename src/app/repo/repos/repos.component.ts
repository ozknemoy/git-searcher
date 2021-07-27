import {ChangeDetectionStrategy, Component} from '@angular/core';
import {IGitRepo, IGitSearchItem} from "../../interfaces/git.interface";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs/operators";


/**
 * @Component компонент списка репозиториев
 */
@Component({
  selector: 'repo',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.sass'],
})
export class ReposComponent {
  /** title */
  title = 'git-searcher';
  /** список репозиториев */
  repoList: IGitSearchItem[] = [];

  /** кастомный фильтр или обработка */
  filterArchived(repos: IGitSearchItem[]) {
    return repos.filter(repo => !repo.archived)
  }
}
