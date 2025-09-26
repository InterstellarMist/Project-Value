INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
	(1,1,'Assets',NULL,NULL,'USD',0),
	(2,2,'Liabilities',NULL,NULL,'USD',0),
	(3,3,'Income',NULL,NULL,'USD',0),
	(4,4,'Expenses',NULL,NULL,'USD',0),
	(5,5,'Equity',NULL,NULL,'USD',0),
	(6,1,'Cash',1,'fluent-emoji-flat:dollar-banknote','USD',0),
	(7,1,'Debit Card',1,'fluent-emoji-flat:credit-card','USD',0),
	(8,2,'Credit Card',2,'noto:credit-card','USD',0),
	(9,2,'Loans',2,'fluent-emoji-flat:money-bag','USD',1),
	(10,3,'Work',3,'fluent-emoji-flat:briefcase','USD',0);
INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
	(11,3,'Allowance',3,'fluent-emoji-flat:coin','USD',0),
	(12,3,'Gift',3,'fluent-emoji-flat:wrapped-gift','USD',0),
	(13,4,'Food',23,'fluent-emoji-flat:curry-rice','USD',0),
	(14,4,'Drink',23,'fluent-emoji-flat:bubble-tea','USD',0),
	(15,4,'Rent',24,'fluent-emoji-flat:house','USD',0),
	(16,4,'Electricity',24,'fluent-emoji-flat:high-voltage','USD',0),
	(17,4,'Water',24,'fluent-emoji-flat:droplet','USD',0),
	(18,4,'Grocery',23,'fluent-emoji-flat:shopping-cart','USD',0),
	(19,4,'Shopping',26,'fluent-emoji-flat:shopping-bags','USD',0),
	(20,4,'Gas',25,'fluent-emoji-flat:fuel-pump','USD',0);
INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
	(21,4,'Transportation',25,'fluent-emoji-flat:light-rail','USD',0),
	(22,4,'Misc',26,'fluent-emoji-flat:receipt','USD',0),
	(23,4,'Food',4,NULL,'USD',0),
	(24,4,'Utilities',4,NULL,'USD',0),
	(25,4,'Transportation',4,NULL,'USD',0),
	(26,4,'Personal',4,NULL,'USD',0),
	(27,4,'Restaurant',23,'fluent-emoji-flat:curry-rice','USD',0),
	(28,4,'Internet',24,'fluent-emoji-flat:wireless','USD',0),
	(29,4,'Commute',25,'fluent-emoji-flat:light-rail','USD',0),
	(30,4,'Maintenance',25,'fluent-emoji-flat:wrench','USD',0);
INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
	(31,4,'Clothes',26,'fluent-emoji-flat:coat','USD',0),
	(32,4,'Subscriptions',26,'fluent-emoji-flat:mobile-phone','USD',0),
	(33,4,'Leisure',26,'fluent-emoji-flat:man-cartwheeling','USD',0),
	(34,4,'Online Purchase',26,'fluent-emoji-flat:credit-card','USD',0);
