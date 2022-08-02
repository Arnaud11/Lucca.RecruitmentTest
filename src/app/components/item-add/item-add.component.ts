import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.scss']
})
export class ItemAddComponent implements OnInit {

  currencies = [
    { id: 1, name: 'CHF' },
    { id: 2, name: 'EUR' },
    { id: 3, name: 'GBP' },
    { id: 4, name: 'USD' },
  ];

  natures = [
    { id: 1, name: 'Restaurant'},
    { id: 2, name: 'Hotal' },
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
      amount: null,
      currency: '',
    },
    convertedAmount: {
      amount: null,
      currency: '',
    },
    comment: '',
  };


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/items/']);
  }

  addItem(): void {
    this.rest.addItem(this.itemData).subscribe((result) => {
      map(res => res),
      this.router.navigate(['/items/']);
    }, (err) => {
      console.log(err);
    });
  }
}