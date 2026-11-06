// SpendWise Client-Side Script
document.addEventListener('DOMContentLoaded', () => {
    console.log('SpendWise Dashboard Loaded Successfully.');

    const addTransactionBtn = document.getElementById('add-transaction-btn');
    
    if (addTransactionBtn) {
        addTransactionBtn.addEventListener('click', () => {
            const description = prompt('Enter transaction description:');
            if (!description) return;
            
            const amountInput = prompt('Enter amount (use negative for expense, positive for income, e.g., -45.00 or 150.00):');
            const amount = parseFloat(amountInput);
            
            if (isNaN(amount)) {
                alert('Invalid amount entered.');
                return;
            }

            const category = prompt('Enter category (e.g., Food, Transport, Salary):') || 'General';
            
            addNewTransaction(description, category, amount);
        });
    }
});

function addNewTransaction(description, category, amount) {
    const tableBody = document.getElementById('transaction-list');
    const row = document.createElement('tr');
    
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const isIncome = amount > 0;
    const formattedAmount = `${isIncome ? '+' : '-'}$${Math.abs(amount).toFixed(2)}`;
    
    row.innerHTML = `
        <td>${description}</td>
        <td>${category}</td>
        <td>${today}</td>
        <td class="${isIncome ? 'income' : 'expense'}">${formattedAmount}</td>
    `;
    
    // Prepend to top of list
    tableBody.insertBefore(row, tableBody.firstChild);
    
    // Update total balance dynamically
    updateBalance(amount);
}

function updateBalance(amount) {
    const balanceElement = document.getElementById('total-balance');
    if (!balanceElement) return;
    
    // Clean string to float
    let currentBalance = parseFloat(balanceElement.textContent.replace('$', '').replace(',', ''));
    currentBalance += amount;
    
    balanceElement.textContent = `$${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
