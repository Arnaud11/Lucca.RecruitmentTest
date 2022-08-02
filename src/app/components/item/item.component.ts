import { Component, OnInit } from '@angular/core';
import { RestService, Item } from '../../services/rest/rest.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  items: Item[] = [];
  total: any;

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): any {
    this.rest.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>)=>{
      console.log(res);
      this.items = res.body;
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  getItems(): void {
    this.rest.getItems().subscribe((resp: any) => {
      this.items = resp;
    });
  }

  add(): void {
    this.router.navigate(['/item-add']);
  }

  update(id: string, item: Item): void {
    this.rest.updateItem(id, item).subscribe(
      () => {
        this.router.navigate(['/item-edit/' + id]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(id: string): void {
    this.rest.deleteItem(id).subscribe(
      () => {
        this.getItems();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public firstPage() {
    this.items = [];
    this.rest.sendGetRequestToUrl(this.rest.first).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.items = res.body;
    })
  }
  public previousPage() {

    if (this.rest.prev !== undefined && this.rest.prev !== '') {
      this.items = [];
      this.rest.sendGetRequestToUrl(this.rest.prev).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.items = res.body;
      })
    }

  }
  public nextPage() {
    if (this.rest.next !== undefined && this.rest.next !== '') {
      this.items = [];
      this.rest.sendGetRequestToUrl(this.rest.next).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.items = res.body;
      })
    }
  }
  public lastPage() {
    this.items = [];
    this.rest.sendGetRequestToUrl(this.rest.last).pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<any>) => {
      console.log(res);
      this.items = res.body;
    })
  }

}
