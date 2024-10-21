import { useState } from "react";

export default function BudgetContainer() {
  const { incomes } = useIncomes();
  const { expenses } = useExpenses();
  const [updatingData, setUpdatingData] = useState(null);
  const [selectedBudgetType, setSelectedBudgetType] = useState("expense");

  return (
    <div>
      <BudgetForm>
        <TabButtonGroup />
      </BudgetForm>
      <BudgetDashboard />
      <BudgetView>
        <IncomesList />
        <ExpensesList />
      </BudgetView>
    </div>
  );
}
