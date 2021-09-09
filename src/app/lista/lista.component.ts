import {
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Event } from '@angular/router';
import { Chart } from 'chart.js';
import { Stock } from '../models/stock';
import { ChartService } from '../service/chart.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
})
export class ListaComponent implements OnInit, AfterViewInit {
  trades: Stock[];
  charts: any;
  erro: any;

  constructor(private chartService: ChartService) {
    this.getTrads();
  }

  ngOnInit(): void {

  }

  searchStock(name: string) {

    this.chartService.searchStock(name).subscribe(res => {
      console.log(res);

      /* var config = {
        type: 'line',
        data: {
          labels: res.chart,
          datasets: [
            {
              data: res.chart,
              label: 'Data',
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

      new Chart(`myChart0`, config); */

    }, error => {
      console.log(error);

    })

  }

  getTrads() {
    this.chartService.getAll().subscribe(
      data => {
        this.trades = data.body;
      }, error => {
        this.erro = error
        console.log(error);

      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.trades.length > 0) {
        this.trades.forEach((stocks, i) => {
          let plusOrMinus = Math.sign(stocks.variation);

          if (plusOrMinus == 1) {
            document.getElementById(`negative${i}`)!.remove();
          } else {
            document.getElementById(`positive${i}`)!.remove();
          }

          if (stocks.favorito) {
            document.getElementById(`favorite${i}`)!.style.fill = 'red';
          }

          var config = {
            type: 'line',
            data: {
              labels: stocks.chart,
              datasets: [
                {
                  data: stocks.chart,
                  label: 'Data',
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

          new Chart(`myChart${i}`, config);
        });
      }
    }, 1000);
    //var ctx2 = document.getElementById('chart-2').getContext('2d');
  }

  setFavorite(item: any, i: any) {
    document.getElementById(`favorite${i}`)!.classList.toggle('active');
    /* document.getElementById(`favorite${i}`)!.style.animation =
    'beat .3s ease-out;'; */
    this.chartService.setFavorite(item).subscribe((item) => {
      if (item.ok == true) {
      }
    });
  }
}
