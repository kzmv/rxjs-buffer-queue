// Import stylesheets
import './style.css';
import { buffer } from 'rxjs/operators';
import { interval, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';


const ticker$ = interval(500);
const isProcessing$ = new BehaviorSubject<boolean>(true);
const transactions$ = new Subject<any>();


const transactions = [
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]}
]

for(let i =0 ; i< transactions.length;i++) {
  setTimeout(() => {
    transactions$.next(transactions[i]);
  }, i*300);
}

const trigger = combineLatest(ticker$,isProcessing$).pipe(filter(([_,isProcessing]) => isProcessing))
//
transactions$.pipe(
  buffer(trigger)
).subscribe(data => {
  console.log('Injest:')
  console.log(data);
})

console.log('test');