CREATE TRIGGER update_children_on_delete
	AFTER DELETE ON accounts
BEGIN
	UPDATE accounts
	SET parentId = old.parentId
	WHERE parentId = old.acctId;
END;