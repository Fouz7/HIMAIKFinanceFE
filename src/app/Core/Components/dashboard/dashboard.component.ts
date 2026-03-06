import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../Services/balance-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latestBalance: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;

  donutChartData: any;
  lineChartData: any;

  constructor(private balanceService: BalanceService) { }

  ngOnInit() {
    this.loadBalanceData();
  }

  loadBalanceData() {
    this.balanceService.getBalance().subscribe(
      (res: any) => {
        console.log('Balance:', res);
        this.latestBalance = res.balance;
        this.updateCharts();
      },
      error => console.error('Error fetching balance:', error)
    );

    this.balanceService.getTotalIncome().subscribe(
      (res: any) => {
        console.log('TotalIncome:', res);
        this.totalIncome = res.totalIncome;
        this.updateCharts();
      },
      error => console.error('Error fetching total income:', error)
    );

    this.balanceService.getTotalOutcome().subscribe(
      (res: any) => {
        console.log('TotalOutcome:', res);
        this.totalOutcome = res.totalOutcome;
        this.updateCharts();
      },
      error => console.error('Error fetching total outcome:', error)
    );
  }

  updateCharts() {
    this.donutChartData = {
      labels: ['Income', 'Outcome'],
      datasets: [
        {
          data: [this.totalIncome, this.totalOutcome],
          backgroundColor: ['#00FF00', '#FF0000']
        }
      ]
    };

    this.lineChartData = {
      labels: ['Balance'],
      datasets: [
        {
          label: 'Balance',
          data: [this.latestBalance],
          fill: false,
          borderColor: '#0000FF'
        }
      ]
    };
  }
}
