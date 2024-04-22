function connectAndQuery() {
    const host = document.getElementById('host').value;
    const port = document.getElementById('port').value;
    const database = document.getElementById('database').value;
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const connectionString = `postgresql://${user}:${password}@${host}:${port}/${database}`;

    fetch('/query', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ connectionString })
    })
    .then(response => response.json())
    .then(data => {
        displayResults(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpa os resultados anteriores

    const table = document.createElement('table');
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    table.appendChild(headerRow);

    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(headerText => {
            const cell = document.createElement('td');
            cell.textContent = rowData[headerText];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    resultsDiv.appendChild(table);
}
