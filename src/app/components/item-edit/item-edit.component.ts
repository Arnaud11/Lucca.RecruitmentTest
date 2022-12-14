import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
  currencies = [
    { id: 1, name: 'CHF' },
    { id: 2, name: 'EUR' },
    { id: 3, name: 'GBP' },
    { id: 4, name: 'USD' },
  ];

  natures = [
    { id: 1, name: 'Restaurant' },
    { id: 2, name: 'Hotel' },
    { id: 3, name: 'Indemnités Kms' },
    { id: 4, name: 'Frais de péage' },
    { id: 5, name: 'Carburant' },
    { id: 6, name: 'Entretien' },
    { id: 7, name: 'Location de vehicule' },
    { id: 8, name: 'Transports' },
    { id: 9, name: 'Téléphone' },
    { id: 10, name: 'Documentation' },
  ];

  @Input() itemData: any = {
    purchasedOn: '',
    nature: '',
    originalAmount: {
      amount: 0,
      currency: '',
    },
    convertedAmount: {
      amount: 0,
      currency: '',
    },
    comment: ''
  };

  constructor(
    public rest: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rest.getItem(this.route.snapshot.params.id).subscribe((data: {}) => {
      console.log(data);
      this.itemData = data;
    });
  }

  cancel(): void {
    this.router.navigate(['/items/']);
  }

  updateItem(): void {
    this.rest
      .updateItem(this.route.snapshot.params.id, this.itemData)
      .subscribe(
        (result) => {
          this.router.navigate(['/items/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
