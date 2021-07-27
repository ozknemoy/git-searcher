import {Component} from '@angular/core';
import {IGitCommits, IGitRepo} from "../../interfaces/git.interface";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";



/**
 * @Component компонент списка репозиториев
 */
@Component({
  selector: 'repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.sass'],
})
export class RepoComponent {
  /** репо */
  repo: IGitRepo | null = null;
  /** коммиты */
  commits: IGitCommits[] | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute) {

  }

  async ngOnInit() {
    const {repoOwnerLogin, repoName} = this.route.snapshot.params;
    this.repo = await this.getOneRepo(repoOwnerLogin, repoName);
    this.commits = await this.getRepoCommits(repoOwnerLogin, repoName)
  }

  getOneRepo(repoOwnerLogin: string, repoName: string) {
    return this.http.get<IGitRepo>(`https://api.github.com/repos/${repoOwnerLogin}/${repoName}`)
      .toPromise();
  }

  getRepoCommits(repoOwnerLogin: string, repoName: string) {
    return this.http.get<IGitCommits[]>(`https://api.github.com/repos/${repoOwnerLogin}/${repoName}/commits`)
      .toPromise()
  }
}
