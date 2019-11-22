import {Observable} from 'rxjs';
import './style.css';
import { buffer } from 'rxjs/operators';
import { interval, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export class BufferQueue<T> {

  public ticker$;
  public trigger$: Subject<boolean>;
  public combinedTrigger$: Observable<boolean>;
  public bufferQueue$: Observable<T[]>;

  constructor(public inputStream$: Observable<T>, ticker$: Observable<number>, public bufferQueueTickRate: number = 100) {
    this.ticker$ = interval(bufferQueueTickRate);
    this.trigger$ = new Subject<boolean>();

    this.combinedTrigger$ = combineLatest(this.ticker$,this.trigger$).pipe(
      map( ([_, trigger]) => trigger),
      filter(trigger => trigger));

    this.bufferQueue$ = this.inputStream$.pipe(
      buffer(this.combinedTrigger$),
      filter(transactions => transactions.length > 0)
    );
  }

  public trigger(predicate: boolean ) {
    this.trigger$.next(predicate);
  }
} 