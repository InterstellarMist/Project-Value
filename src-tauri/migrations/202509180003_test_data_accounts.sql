INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
  (1,6,'Assets',NULL,'fluent-emoji-flat:eyes','USD',0),
	(2,6,'Liabilities',NULL,'fluent-emoji-flat:eyes','USD',0),
	(3,6,'Income',NULL,'fluent-emoji-flat:eyes','USD',0),
	(4,6,'Expenses',NULL,'fluent-emoji-flat:eyes','USD',0),
	(5,6,'Equity',NULL,'fluent-emoji-flat:eyes','USD',0),
	(6,1,'Cash',1,'fluent-emoji-flat:dollar-banknote','USD',0),
	(7,1,'Debit Card',1,'fluent-emoji-flat:credit-card','USD',0),
	(8,2,'Credit Card',2,'noto:credit-card','USD',0),
	(9,2,'Loans',2,'fluent-emoji-flat:money-bag','USD',1),
	(10,3,'Work',3,'fluent-emoji-flat:briefcase','USD',0);
INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
	(11,3,'Allowance',3,'fluent-emoji-flat:coin','USD',0),
	(12,3,'Gift',3,'fluent-emoji-flat:wrapped-gift','USD',0),
	(13,4,'Food',4,'fluent-emoji-flat:curry-rice','USD',0),
	(14,4,'Drink',4,'fluent-emoji-flat:bubble-tea','USD',0),
	(15,4,'Rent',4,'fluent-emoji-flat:house','USD',0),
	(16,4,'Electricity',4,'fluent-emoji-flat:high-voltage','USD',0),
	(17,4,'Water',4,'fluent-emoji-flat:droplet','USD',0),
	(18,4,'Grocery',4,'fluent-emoji-flat:shopping-cart','USD',0),
	(19,4,'Shopping',4,'fluent-emoji-flat:shopping-bags','USD',0),
	(20,4,'Gas',4,'fluent-emoji-flat:fuel-pump','USD',0);
INSERT INTO accounts (acctId,acctTypeId,name,parentId,icon,currency,hidden) VALUES
	(21,4,'Transportation',4,'fluent-emoji-flat:light-rail','USD',0),
	(22,4,'Misc',4,'fluent-emoji-flat:receipt','USD',0);
