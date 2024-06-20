import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, viewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  @Input() placeholder: string = "";
  @Input() initialValue: string = "";

  @Output() onValue = new EventEmitter<string>();
  @Output() onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
     this.debouncerSubscription =
      this.debouncer
         .pipe(debounceTime(300))
         .subscribe(value => {
            this.onDebounce.emit(value)
          })
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  searchTerm(term: string): void {
    this.onValue.emit(term);
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
