let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {

    let name = document.getElementById("expenseName").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (name === "" || amount <= 0 || date === "") {
        alert("Please enter all expense details.");
        return;
    }

    let expense = {
        name: name,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    saveExpenses();

    displayExpenses();

    document.getElementById("expenseName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";
}

function displayExpenses() {

    let expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";
    total = 0;

    expenses.forEach(function(expense, index) {

        total += Number(expense.amount);

        let div = document.createElement("div");
        div.className = "expense-item";

        div.innerHTML = `
            <strong>${expense.name}</strong>
            <p>Amount: Rs. ${Number(expense.amount).toFixed(2)}</p>
            <p>Category: ${expense.category}</p>
            <p>Date: ${expense.date}</p>
            <button onclick="deleteExpense(${index})">
                Delete
            </button>
        `;

        expenseList.appendChild(div);
    });

    document.getElementById("total").innerText =
        "Rs. " + total.toFixed(2);
}

function deleteExpense(index) {

    expenses.splice(index, 1);

    saveExpenses();

    displayExpenses();
}

document.addEventListener("DOMContentLoaded", function() {
    displayExpenses();
});