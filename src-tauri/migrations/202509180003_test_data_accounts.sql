INSERT INTO accounts (acctId, acctTypeId, name, parentId, icon, currency, hidden) VALUES
-- Root accounts
(1, 1, 'Assets', NULL, NULL, 'USD', 0),
(2, 2, 'Liabilities', NULL, NULL, 'USD', 0),
(3, 3, 'Income', NULL, NULL, 'USD', 0),
(4, 4, 'Expenses', NULL, NULL, 'USD', 0),
(5, 5, 'Equity', NULL, NULL, 'USD', 0),

-- Equity subaccounts
(6, 5, 'Opening-Balances', 5, NULL, 'USD', 0),
(7, 5, 'Closing-Balances', 5, NULL, 'USD', 0),
(8, 5, 'Revaluation-Reserve', 5, NULL, 'USD', 0),
(9, 5, 'Adjustments', 5, NULL, 'USD', 0),

-- Assets
(10, 1, 'Cash', 1, 'fluent-emoji-flat:dollar-banknote', 'USD', 0),
(11, 1, 'Debit Card', 1, 'fluent-emoji-flat:credit-card', 'USD', 0),

-- Liabilities
(12, 2, 'Credit Card', 2, 'noto:credit-card', 'USD', 0),
(13, 2, 'Loans', 2, 'fluent-emoji-flat:money-bag', 'USD', 1),

-- Income
(14, 3, 'Work', 3, 'fluent-emoji-flat:briefcase', 'USD', 0),
(15, 3, 'Allowance', 3, 'fluent-emoji-flat:coin', 'USD', 0),
(16, 3, 'Gift', 3, 'fluent-emoji-flat:wrapped-gift', 'USD', 0),

-- Expense category groups
(17, 4, 'Food', 4, NULL, 'USD', 0),
(18, 4, 'Utilities', 4, NULL, 'USD', 0),
(19, 4, 'Transportation', 4, NULL, 'USD', 0),
(20, 4, 'Personal', 4, NULL, 'USD', 0),

-- Expense subcategories
(21, 4, 'Grocery', 17, 'fluent-emoji-flat:shopping-cart', 'USD', 0),
(22, 4, 'Restaurant', 17, 'fluent-emoji-flat:curry-rice', 'USD', 0),
(23, 4, 'Rent', 18, 'fluent-emoji-flat:house', 'USD', 0),
(24, 4, 'Electricity', 18, 'fluent-emoji-flat:high-voltage', 'USD', 0),
(25, 4, 'Water', 18, 'fluent-emoji-flat:droplet', 'USD', 0),
(26, 4, 'Internet', 18, 'fluent-emoji-flat:wireless', 'USD', 0),
(27, 4, 'Gas', 19, 'fluent-emoji-flat:fuel-pump', 'USD', 0),
(28, 4, 'Commute', 19, 'fluent-emoji-flat:light-rail', 'USD', 0),
(29, 4, 'Maintenance', 19, 'fluent-emoji-flat:wrench', 'USD', 0),
(30, 4, 'Clothes', 20, 'fluent-emoji-flat:coat', 'USD', 0),
(31, 4, 'Subscriptions', 20, 'fluent-emoji-flat:mobile-phone', 'USD', 0),
(32, 4, 'Leisure', 20, 'fluent-emoji-flat:man-cartwheeling', 'USD', 0),
(33, 4, 'Online Purchase', 20, 'fluent-emoji-flat:credit-card', 'USD', 0),
(34, 4, 'Misc', 20, 'fluent-emoji-flat:receipt', 'USD', 0);
