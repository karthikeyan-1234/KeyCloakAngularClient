//create service to handle idle time
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
    private idleTimeout = 10 * 60 * 1000; // 10 minutes
    private idleTimer: any;
    private idleSubject = new Subject<void>();
    
    constructor() {
        this.resetTimer();
    }
    
    resetTimer() {
        clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => this.idleSubject.next(), this.idleTimeout);
    }
    
    onIdle() {
        return this.idleSubject.asObservable();
    }

    stopTimer() {
        clearTimeout(this.idleTimer);
    }
}