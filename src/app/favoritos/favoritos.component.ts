import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartService } from '../service/chart.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  trades: any[];
  charts: any;
  data: any;
  showMessage: boolean;

  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    this.getTrads();
  }

  getTrads() {
    this.chartService.getFavorite().subscribe((item) => {
      this.trades = item.body;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.trades.length > 0) {
        this.trades.forEach((stocks, i) => {
          var config = {
            type: 'line',
            data: {
              labels: stocks.chart,
              datasets: [
                {
                  data: stocks.chart,
                  label: 'solved',
                  backgroundColor: 'rgba(0,0,0,0)',
                  borderColor: '#5a5baf',
                  borderWidth: 1,
                  pointRadius: 3,
                },
              ],
            },
            options: {
              maintainAspectRatio: true,
              legend: {
                display: false,
              },
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                },
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display: false,
                    },
                    gridLines: {
                      display: false,
                      drawBorder: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    ticks: {
                      display: false,
                    },
                    gridLines: {
                      display: false,
                      drawBorder: false,
                    },
                  },
                ],
              },
            },
          };

          new Chart('myChart' + i, config);
        });
      } else {
        this.showMessage = true;
      }
    }, 1000);
    //var ctx2 = document.getElementById('chart-2').getContext('2d');
  }
}
