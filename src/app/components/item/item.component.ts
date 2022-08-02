import { Component, OnInit } from '@angular/core';
import { RestService, Item } from '../../services/rest/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  items: Item[] = [];
  total: any;

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): any {
    this.total = this.getItems();
  }

  getItems(): void {
    this.rest.getItems().subscribe((resp: any) => {
      this.items = resp;
    });

    var sum = 0;
    this.rest.getTotal().subscribe((data) => {
      data.forEach((element: { convertedAmount: { amount: number } }) => {
        sum += element.convertedAmount.amount;
      });
      this.total = sum;
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
}
