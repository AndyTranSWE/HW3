/*
File: script.js
GUI Assignment: Creating an Interactive Dynamic Table
Andy Tran, UMass Lowell Computer Science, andy_tran1@student.uml.edu
Copyright (c) 2024 by Andy. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by AT on June 3, 2024 at 10:26 PM
*/

// File Description: 
// This file contains the JavaScript that is run to create and fill out the dynamic table.

// This happens when the "Submit" button is pressed. Four integers are read and
// validation starts. The table may be formed at the end:
document.getElementById('tableForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var minRowVal = parseInt(document.getElementById('minRowVal').value); // Min row value read
    var maxRowVal = parseInt(document.getElementById('maxRowVal').value); // Max row value read
    var minColVal = parseInt(document.getElementById('minColVal').value); // Min column value read
    var maxColVal = parseInt(document.getElementById('maxColVal').value); // Max column value read
    
    // Validation section for inputted integers.

    // This block initializes the error message box and sets it to empty.
    var errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
    
    // This one checks if mins are greater than maxes.
    if (minRowVal > maxRowVal || minColVal > maxColVal) {
        errorContainer.textContent = "There is a minimum value greater than a maximum value. Please check your numbers.";
        return;
    }

    // Range between -100 and 100 (double assignment minimum).
    if (minRowVal < -100 || maxRowVal > 100 || minColVal < -100 || maxColVal > 100) {
        errorContainer.textContent = "Values must be between -100 and 100.";
        return;
    }

    // This NOT isInteger check should cover anything other illegal input that is not an integer.
    if (!Number.isInteger(minRowVal) || !Number.isInteger(maxRowVal) || !Number.isInteger(minColVal) || 
        !Number.isInteger(maxColVal)) {
        errorContainer.textContent = "Input has at least one entry that is not an integer.";
        return;
    }

    // Section for forming the dynamic table.

    // This block initializes the table container and sets it to empty (since no cells
    // have been produced yet).
    var tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    
    // New initializations are here after validation so the page can be a little more efficient.
    var table = document.createElement('table'); // New table initialized.
    var thead = document.createElement('thead'); // Table header initialized (so it can be set sticky).
    var tbody = document.createElement('tbody'); // Table body initialized.
    var headerRow = document.createElement('tr'); // The row which serves as a header is initialized.

    // This code block initializes the top-left empty header cell.
    var emptyHeaderCell = document.createElement('th');
    headerRow.appendChild(emptyHeaderCell);

    // For this block:
    // For every value from the minimum to maximum column value inputted...
    // create a header cell for the header column and populate it with its
    // corresponding value. Then add the header row.
    for (var i = minColVal; i <= maxColVal; i++) {
        var headerCell = document.createElement('th'); // Initialize a singular cell for the first column
        headerCell.textContent = i;
        headerRow.appendChild(headerCell);
    }
    thead.appendChild(headerRow);

    // For this block:
    // For every row from the min to the max, the header cell is
    // initialized with the corresponding number, as well as
    // all the row's cells, which are multiplied with the column
    // headers to get the product. Each row is then inserted into
    // the table.
    for (i = minRowVal; i <= maxRowVal; i++) {
        var row = document.createElement('tr');
        var rowHeaderCell = document.createElement('th');
        rowHeaderCell.textContent = i;
        row.appendChild(rowHeaderCell);

        // For every column value, min to max, create a cell containing
        // the product of the corresponding row and column headers
        // and populate each cell with that product.
        for (var j = minColVal; j <= maxColVal; j++) {
            var cell = document.createElement('td');
            cell.textContent = i * j;
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    }

    // Add the header, bodies, and then the table itself is displayed.
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
});
