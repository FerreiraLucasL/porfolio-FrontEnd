import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private datosPorfolio:PortfolioService) { }

  ngOnInit(): void {
    this.datosPorfolio.obtenerDatos();
  }

}
