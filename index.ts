// Import stylesheets
import './style.css';
import { buffer } from 'rxjs/operators';
import { interval, Subject, BehaviorSubject, combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import _ from "lodash";

const ticker$ = interval(500);
const isProcessing$ = new BehaviorSubject<boolean>(true);
const transactions$ = new Subject<any>();
const data$ = new BehaviorSubject<any>([]);

const trigger = combineLatest(ticker$,isProcessing$).pipe(filter(([_,isProcessing]) => isProcessing))
const transactionBuffer$ = transactions$.pipe(
  buffer(trigger),
  filter(transactions => transactions.length > 0)
);

const transactions = [
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]},
  {type: 'add', data: [{'test': 'test1'}]}
]



//
transactionBuffer$.subscribe(trans => {
  console.log('Injest Transactions:')
  console.log(trans);
  
  isProcessing$.next(false);
  setTimeout(() => {
    data$.next(_.flatten(trans.map(transaction => transaction.data)));
  }, 1000)
})

data$.subscribe(data => {
  console.log('Data:');
  console.log(data);
  isProcessing$.next(true);
})

for(let i =0 ; i< transactions.length;i++) {
  setTimeout(() => {
    transactions$.next(transactions[i]);
  }, i*130);
}

for(let i =0 ; i< transactions.length;i++) {
  setTimeout(() => {
    transactions$.next(transactions[i]);
  }, i*800);
}