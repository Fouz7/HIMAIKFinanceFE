import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../Services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  latestBalance: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;
  balanceData: number[] = [];
  balanceLabels: string[] = [];

  donutChartData: any;
  lineChartData: any;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
    this.getAllTransaction();
  }

  getAllTransaction() {
    this.transactionService.getAllTransaction()
      .subscribe(data => {
        console.log('DataTransaction:', data);

        this.latestBalance = data[data.length - 1].balance;

        data.forEach(transaction => {
          this.totalIncome += transaction.credit;
          this.totalOutcome += transaction.debit;
          this.balanceData.push(transaction.balance);
          this.balanceLabels.push(new Date(transaction.createdAt).toISOString());
        });

        this.updateCharts();
      }, error => {
        console.error('Error:', error);
      });
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
      labels: this.balanceLabels,
      datasets: [
        {
          label: 'Balance',
          data: this.balanceData,
          fill: false,
          borderColor: '#0000FF'
        }
      ]
    };
  }
}
