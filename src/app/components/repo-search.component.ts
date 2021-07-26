import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {debounceTime, distinctUntilChanged, filter, last, map, startWith, switchMap, tap} from "rxjs/operators";
import {Observable, of, Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {IGitSearchData, IGitSearchItem} from "../interfaces/git.interface";


/**
 * @Component компонент поиска по репозиториям гитхаба
 */
@Component({
  selector: 'repo-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-form-field class="w-100">
      <input type="text" placeholder="Давай поищем что интересного есть в гите" matInput
             [formControl]="repoSearchControl">
      <mat-hint>Можно вводить на русском ;) Лоадер в наличии</mat-hint>
      <div matSuffix class="loading" *ngIf="loading"></div>
      <button mat-button matSuffix mat-icon-button
              *ngIf="repoSearchControl.value"
              (click)="clear()">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>
  `
})
export class RepoSearchComponent {
  /** значение */
  @Input() model: number | null = null;
  @Input() charsIgnore = 1;
  /** внешний обработчик полученых значений с бека */
  @Input() outerHandler?: (comps: IGitSearchItem[]) => IGitSearchItem[]
  /** колбек в родителя */
  @Output() onChange = new EventEmitter();
  /** контрол */
  repoSearchControl = new FormControl();
  /** загружается */
  loading = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.initControl();
  }


  /** очистить */
  clear() {
    this.repoSearchControl.reset();
    this.propagate([]);
  }

  /** сеттер значения */
  propagate(v: IGitSearchItem[]) {
    this.onChange.emit(v)
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  /** инициализация контрола */
  initControl() {
    this.repoSearchControl.valueChanges.pipe(
      startWith<string>('angular'),
      debounceTime(500),
      filter(res => typeof res === 'string' && (res.length >= this.charsIgnore)),
      distinctUntilChanged(),
      switchMap(value => value ? this.findRepos(<string>value).pipe(last()) : of([])),
      map(repos => this.handleAndPropagate(<any>repos))
    ).subscribe();
  }

  /** запрос репо */
  findRepos(str: string): Observable<IGitSearchItem[]> {
    this.propagate([]);
    this.loading = true;
    return this.http.get<IGitSearchData>(`https://api.github.com/search/repositories?q=${encodeURIComponent(str)}`)
      .pipe(map(d => d.items));
  }

  /** обработчик компаний */
  handleAndPropagate(repos: any[]) {
    this.loading = false;
    this.propagate(this.outerHandler ? this.outerHandler(repos) : repos)
  }

}
