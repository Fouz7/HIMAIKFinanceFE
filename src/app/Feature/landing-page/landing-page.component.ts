import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../../Core/Services/balance-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit {
  latestBalance: number = 0;
  totalIncome: number = 0;
  totalOutcome: number = 0;

  constructor(
    private balanceService: BalanceService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/admin-dashboard']);
    }
    this.loadBalanceData();
  }

  loadBalanceData() {
    this.balanceService.getBalance().subscribe(
      (res: any) => {
        console.log('Balance:', res);
        this.latestBalance = res.balance;
      },
      error => console.error('Error fetching balance:', error)
    );

    this.balanceService.getTotalIncome().subscribe(
      (res: any) => {
        console.log('TotalIncome:', res);
        this.totalIncome = res.totalIncome;
      },
      error => console.error('Error fetching total income:', error)
    );

    this.balanceService.getTotalOutcome().subscribe(
      (res: any) => {
        console.log('TotalOutcome:', res);
        this.totalOutcome = res.totalOutcome;
      },
      error => console.error('Error fetching total outcome:', error)
    );
  }
}
