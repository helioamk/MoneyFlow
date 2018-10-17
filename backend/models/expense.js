const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const Budget = require('./budget');

const ExpenseSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    budgetId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Budget',
    },
    name: {
        type: String,
        required: true,
    },
    spend: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['Household Utilities', 'Food', 'Gift', 'Entertainment', 'Education', 'Invest', 'Others']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    budget: { type: Schema.Types.ObjectId, ref: 'Budget', childPath: 'expenseList' }

});

module.exports = mongoose.model('Expense', ExpenseSchema, 'expenses');