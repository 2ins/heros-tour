import {
  Component,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ChartjsComponent } from '@ctrl/ngx-chartjs';
import { Store } from '@ngxs/store';
import { ChartData, ChartOptions } from 'chart.js';
import { Align, Anchor, Color, Position } from 'src/app/config';
import { Quality } from 'src/app/model/quality';
import { SupabaseService } from 'src/app/supabase.service';
@Component({
  selector: 'app-virtues-pie',
  templateUrl: './virtues-pie.component.html',
  styleUrls: ['./virtues-pie.component.css'],
})
export class VirtuesPieComponent implements OnInit, OnChanges {
  @ViewChild('ref', { static: true }) ref!: ChartjsComponent;

  @Input()
  qualities?: Quality[];

  constructor(
    private readonly supabase: SupabaseService,
    private store: Store,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { qualities } = changes;
    if (qualities.currentValue != qualities.previousValue) {
      //console.log('Changes');
      //console.log('adesso: ', changes['qualities'].currentValue);
      //console.log('prima: ', changes['qualities'].previousValue);
      //console.log(' this.qualities ', this.qualities?.length);

      this.hashmap.set('WI', 0);
      this.hashmap.set('CO', 0);
      this.hashmap.set('HU', 0);
      this.hashmap.set('JU', 0);
      this.hashmap.set('TE', 0);
      this.hashmap.set('TR', 0);

      var qualitiesAux: Quality[] | undefined = qualities.currentValue;

      console.log('qualitiesAux', qualitiesAux);
      qualitiesAux?.map((x) => {
        var newVal = 0;
        if (x.count) {
          newVal = x.count;
        }
        newVal = 1;
        const mapV = this.hashmap.get(x.virtue);
        //console.log('mapv', mapV);
        if (mapV != undefined) {
          newVal = newVal + mapV;
        }
        this.hashmap.set(x.virtue, newVal);
      });
      // console.log(this.hashmap);
      var data = this.datasource.datasets[0].data;

      data[0] = this.hashmap.get('WI') as number;
      data[1] = this.hashmap.get('CO') as number;
      data[2] = this.hashmap.get('HU') as number;
      data[3] = this.hashmap.get('JU') as number;
      data[4] = this.hashmap.get('TE') as number;
      data[5] = this.hashmap.get('TR') as number;

      //this.ref.chartInstance.data.datasets[0].data = data;
      this.ref.chartInstance?.update();
    }
  }

  ngAfterViewInit() {
    // console.log('Valore di qualities:', this.qualities);
  }

  maximo = 0;

  datasource = {
    labels: [
      'Wisdom',
      'Courage',
      'Humanity',
      'Justice',
      'Temperance',
      'Trascendence',
    ],
    datasets: [
      {
        label: 'Dataset 1',
        data: [0, 0, 0, 0, 0, 0],
        backgroundColor: [
          /*
          '#fffc7f4d',
          '#038aff4d',
          '#fe79684d',
          '#c9f29b4d',
          '#ff94704d',
          '#d5b8ff4d',
         */
          '#fffc7f',
          '#038aff',
          '#fe7968',
          '#c9f29b',
          '#ff9470',
          '#d5b8ff',
        ],
      },
    ],
  } as ChartData;

  datasource2 = {
    labels: [
      'Wisdom',

      'Courage',
      'Humanity',
      'Justice',
      'Temperance',
      'Trascendence',
    ],
    datasets: [
      {
        label: 'Dataset 1',
        data: [5, 4, 3, 2, 1, 6],
        backgroundColor: [
          '#FFFF00',
          '#0000FF',
          '#FF0000',
          '#00FF00',
          '#FF00FF',
          '#00FFFF',
        ],
      },
    ],
  } as ChartData;

  options = {
    responsive: true,
    aspectRatio: 1.5,
    borderColor: 'black',
    borderWidth: 1,

    scales: {
      r: {
        grid: {
          lineWidth: 0.4,
          display: false,
          circular: true,
        },

        angleLines: {
          display: true,
          color: 'green', // Cambia il colore delle linee radiali
          circular: true,
        },
        display: true,
        ticks: {
          display: false,
        },

        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            size: 12,
          },
        },
      },
    },

    tooltips: {
      mode: 'index',
    },

    onClick: (event, chartElements) => {
      console.log(chartElements);
      if (chartElements.length > 0) {
        const clickedLabelIndex = chartElements[0].index;
        // Esegui le azioni desiderate utilizzando l'indice della label cliccata
        console.log('Indice della label cliccata:', clickedLabelIndex);
      }
    },

    plugins: {
      legend: {
        display: false,
        position: 'bottom',
        align: 'start',
        labels: {
          color: 'white',
          usePointStyle: true,
        },
      },
      datalabels: {
        display: false,
        borderRadius: 15,
        align: 'end',
        color: 'white',
        anchor: 'end',
        padding: 0,
        clip: false,
        offset: function (context) {
          // Calcolo dinamico dell'offset in base ai dati
          const value: number = context.dataset.data[
            context.dataIndex
          ] as number;

          var max = 0;
          context.dataset.data.map((x) => {
            if (x && (x as number) > max) max = x as number;
          });

          var appo = (100 / max) * (max - value) + 5;
          //50 * (1 - value / max + (max - value));
          console.log('appo', appo);

          return 5;
        },
        formatter: function (value, context) {
          const labels: String[] = context.chart.data.labels as String[];
          //return value;
          var max = 0;
          context.dataset.data.map((x) => {
            if (x && (x as number) > max) max = x as number;
          });

          var appo = (100 / max) * (max - value) + 5;
          //50 * (1 - value / max + (max - value));

          return value;
        },
      },
    },
  } as ChartOptions;

  options2 = {
    layout: { padding: 70 },
    responsive: true,
    aspectRatio: 1.0,

    plugins: {
      legend: {
        display: false,
        position: Position.BOTTOM,
        align: Align.START,
        labels: {
          color: Color.WHITE,
          usePointStyle: true,
        },
      },
      datalabels: {
        borderRadius: 2,
        align: Align.END,
        color: Color.WHITE,
        anchor: Anchor.END,
        offset: 5,
        formatter: function (value, context) {
          const labels: String[] = context.chart.data.labels as String[];
          return labels[context.dataIndex];
          //return labels[context.dataIndex] + ` ${value}`;
        },
      },
    },
  } as ChartOptions;

  getBaseLog(x: number, y: number): number {
    return Math.log(y) / Math.log(x);
  }

  hashmap = new Map<string, number>();

  ngOnInit(): void {}
}
