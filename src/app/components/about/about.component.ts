import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  miPortfolio:any;
  constructor(private datosPorfolio:PortfolioService) { }
    URL = 'http://localhost:8080/persona'
  ngOnInit(): void {

    this.datosPorfolio.obtenerDatos().subscribe(data=>{
      this.miPortfolio=data;
      });

  }


}
