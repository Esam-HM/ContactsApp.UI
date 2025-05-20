import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent implements OnDestroy {
  @Input() header : string = "";
  @Input() question : string = "";
  @Input() btnsText : string[] = [];
  @Input() btnsColor : string[] = [];
  @Input() isVisible : boolean = false;
  @Output() confirmedAction = new EventEmitter();
  @Output() canceledAction = new EventEmitter();
  outClickAnimation : string = "";

  timerSubscription? : Subscription;

  onConfirmClicked(): void{
    this.confirmedAction.emit();
  }

  onCancelClicked(): void{
    this.canceledAction.emit();
  }

  nonModalClicked() : void{
    this.outClickAnimation = "animate__heartBeat";
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = timer(1000).subscribe({
      next: () => {
        this.outClickAnimation = "";
      }
    });
  }


  modalClicked(event : Event): void{
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
  }


}
