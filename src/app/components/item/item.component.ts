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

  constructor(public rest: RestService, private router: Router) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.rest.getItems().subscribe((resp: any) => {
      this.items = resp;
      console.log(this.items);
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

  getTotal(): void {
    var total = 0
    this.rest.getItems().subscribe((resp: any) => {
      this.items = resp;
      this.items.forEach(element => {
        total += element.originalAmount.amount
      });

      return total
    });
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
