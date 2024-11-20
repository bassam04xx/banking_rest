// Get references to form elements and display containers
const addAccountForm = document.getElementById('add-account-form');
const getAccountForm = document.getElementById('get-account-form');
const getAllAccountsForm = document.getElementById('get-all-accounts-form');
const responseMessage = document.getElementById('response-message');
const accountDetails = document.getElementById('account-details');
const allAccounts = document.getElementById('all-accounts');

// Utility function to display messages
const displayMessage = (message, isError = false) => {
    responseMessage.textContent = message;
    responseMessage.style.color = isError ? 'red' : 'green';
};

// Utility function to create a readable account display
const displayAccountDetails = (accountData) => {
    accountDetails.innerHTML = ''; // Clear previous content
    const accountElement = document.createElement('div');
    accountElement.classList.add('account-detail');

    accountElement.innerHTML = `
        <h3>Account Information</h3>
        <p><strong>RIB:</strong> ${accountData.rib}</p>
        <p><strong>Client CIN:</strong> ${accountData.client.cin}</p>
        <p><strong>Client Name:</strong> ${accountData.client.name} ${accountData.client.familyName}</p>
        <p><strong>Client Email:</strong> ${accountData.client.email}</p>
        <p><strong>Balance:</strong> ${accountData.balance}</p>
        <p><strong>Account Type:</strong> ${accountData.accountType}</p>
    `;
    accountDetails.appendChild(accountElement);
};

// Utility function to create a readable list of accounts
const displayAllAccounts = (accountsData) => {
    allAccounts.innerHTML = ''; // Clear previous content
    const accountsElement = document.createElement('div');
    accountsElement.classList.add('accounts-list');

    accountsData.forEach(account => {
        const accountElement = document.createElement('div');
        accountElement.classList.add('account-item');
        accountElement.innerHTML = `
            <h3>Account - ${account.client.name} ${account.client.familyName}</h3>
            <p><strong>RIB:</strong> ${account.rib}</p>
            <p><strong>Client Email:</strong> ${account.client.email}</p>
            <p><strong>Balance:</strong> ${account.balance}</p>
            <p><strong>Account Type:</strong> ${account.accountType}</p>
        `;
        accountsElement.appendChild(accountElement);
    });

    allAccounts.appendChild(accountsElement);
};

// Handle Add Account form submission
addAccountForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(addAccountForm);
    const accountData = Object.fromEntries(formData);

    const requestData = {
        rib: accountData.rib,
        balance: accountData.balance,
        client: {
            cin: accountData.cin,
            name: accountData.name,
            familyName: accountData.familyName,
            email: accountData.email
        },
        accountType: accountData.accountType
    };

    try {
        const response = await fetch('/account/api/accounts/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();

        if (response.ok) {
            displayMessage('Account added successfully!');
        } else {
            displayMessage(data.error || 'Failed to add account.', true);
        }
    } catch (error) {
        console.error('Error adding account:', error);
        displayMessage('Failed to add account.', true);
    }
});

// Handle Get Account Details form submission
getAccountForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('accountEmail').value;

    try {
        const response = await fetch(`/account/api/accounts/${email}/`);
        const data = await response.json();

        if (response.ok) {
            displayAccountDetails(data);
            displayMessage('Account details retrieved successfully!');
        } else {
            displayMessage(data.error || 'Failed to fetch account details.', true);
        }
    } catch (error) {
        console.error('Error fetching account details:', error);
        displayMessage('Failed to fetch account details.', true);
    }
});

// Handle Get All Accounts form submission
getAllAccountsForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('/account/api/accounts/');
        const data = await response.json();

        if (response.ok) {
            displayAllAccounts(data);
            displayMessage('All accounts retrieved successfully!');
        } else {
            displayMessage(data.error || 'Failed to fetch all accounts.', true);
        }
    } catch (error) {
        console.error('Error fetching all accounts:', error);
        displayMessage('Failed to fetch accounts.', true);
    }
});
