import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {
  coin: string = '';
  currency: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const cadena = this.route.snapshot.params['coin'].split("_");
    this.coin = cadena[0]
    this.currency = cadena[1]
  }
}
