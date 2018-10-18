import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '../../mock/CATEGORIES';
import { NgForm } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../expense.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-expense-input',
  templateUrl: './expense-input.component.html',
  styleUrls: ['./expense-input.component.css']
})
export class ExpenseInputComponent implements OnInit {

  constructor( private expenseService: ExpenseService, private userService: UserService ) {
    this.expenseService.budgetInput.subscribe(value => {
      // console.log(value);
      this.formDisabled = value;
      // console.log(this.formDisabled);
    });
  }
  info: any = null;
  categories = null;
  date;
  formDisabled;
  minDay; maxDay;
  userId;

  ngOnInit() {
    this.categories = CATEGORIES;
    // console.log(this.date);
    // console.log(new Date());
    this.date = new Date();
    // console.log(this.date);
    this.minDay = new Date().setDate(new Date().getDate() - 7);
    this.maxDay = new Date().setDate(new Date().getDate() + 2);
  }

  // TODO add by date (auto generated)
  addItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // @ts-ignore
    // tslint:disable-next-line:prefer-const
    // let ID = '_' + Math.random().toString(36).substr(2, 9);
    const expense: Expense = {name: form.value.name,
      spend: form.value.spend, category: form.value.category, date: form.value.date,
      budgetId: this.expenseService.getBudgetId() };

    console.log(expense);

    this.expenseService.addExpenseItem( expense );
    this.info = { name: form.value.name,
      spend: form.value.spend, category: form.value.category };
    form.resetForm();
  }

}
