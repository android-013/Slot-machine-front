// Frontend Logic
const grid = document.querySelectorAll('#slot-grid .row');
const statusSpan = document.getElementById('status');
const payoutSpan = document.getElementById('payout');
const playBtn = document.getElementById('play-btn');
const quoteSpan = document.getElementById('quote');

// Display Random Quote on Loss
function getRandomQuote() {
    const quotes = [
        "Don't give up. Great things take time. ⏳",
        "Failure is just another step towards success. 💪",
        "Keep going, your luck might change next time! 🍀",
        "Every setback is a setup for a comeback. 🔄",
        "You miss 100% of the shots you don’t take. 🎯",
        "Believe in yourself, and you’re halfway there. 🌟",
        "When one door closes, another opens. 🚪✨",
        "The best way to predict the future is to create it. 🛠️",
        "Difficult roads often lead to beautiful destinations. 🛤️🌄",
        "Your only limit is you. Break your boundaries. 💥"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Simulate Backend Logic
function rand_spin() {
    const symbols = ['🃏', '7️⃣', '🍀', '🍒']; // Define 4 random symbols
    const matrix = Array.from({ length: 3 }, () => Array(5).fill(0));

    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < 3; i++) {
            let is_unique;
            do {
                is_unique = true;
                matrix[i][j] = symbols[Math.floor(Math.random() * symbols.length)];
                for (let k = 0; k < i; k++) {
                    if (matrix[i][j] === matrix[k][j]) {
                        is_unique = false;
                        break;
                    }
                }
            } while (!is_unique);
        }
    }
    return matrix;
}


// Check Winning Patterns
function check_patterns(matrix) {
    const u1 = matrix[0][0], u2 = matrix[0][1], u3 = matrix[0][2], u4 = matrix[0][3], u5 = matrix[0][4];
    const m1 = matrix[1][0], m2 = matrix[1][1], m3 = matrix[1][2], m4 = matrix[1][3], m5 = matrix[1][4];
    const d1 = matrix[2][0], d2 = matrix[2][1], d3 = matrix[2][2], d4 = matrix[2][3], d5 = matrix[2][4];

    function cpy(matrix, win) {
        let resultMatrix = matrix.map(row => [...row]);
        resultMatrix.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === win) {
                    resultMatrix[rowIndex][colIndex] = '$';
                }
            });
        });
        return resultMatrix;
    }

    if (m1 === m2 && m1 === m3 && m1 === m4 && m1 === m5) return { pattern: cpy(matrix, m1), pay: 100000 };
    if (u1 === u2 && u1 === u3 && u1 === u4 && u1 === u5) return { pattern: cpy(matrix, u1), pay: 50000 };
    if (d1 === d2 && d1 === d3 && d1 === d4 && d1 === d5) return { pattern: cpy(matrix, d1), pay: 50000 };

    // Checking "mmdmm"
    if (m1 === m2 && m1 === d3 && m1 === m4 && m1 === m5) {            
        return { pattern: cpy(matrix,m1), pay: 25000 };
    }
    
    // Checking "mmumm"
    if (m1 === m2 && m1 === u3 && m1 === m4 && m1 === m5) {            
        return { pattern: cpy(matrix,m1), pay: 25000 };
    }
    
    // Checking "mdmdm"
    if (m1 === d2 && m1 === m3 && m1 === d4 && m1 === m5) {
        return { pattern: cpy(matrix,m1), pay: 12500 };
    }
    
    // Checking "mumum"
    if (m1 === u2 && m1 === m3 && m1 === u4 && m1 === m5) {
        return { pattern: cpy(matrix,m1), pay: 12500 };
    }

    // Checking "mdmum"
    if (m1 === d2 && m1 === m3 && m1 === u4 && m1 === m5){
        return { pattern: cpy(matrix, m1), pay: 6200 };
    } 

    // "mumdm"
    if (m1 === u2 && m1 === m3 && m1 === d4 && m1 === m5) {
        return { pattern: cpy(matrix, m1), pay: 6200 };
    }

    // "ummmu"
    if (u1 === m2 && u1 === m3 && u1 === m4 && u1 === u5) {
        return { pattern: cpy(matrix, u1), pay: 3200 };
    }

    // "dmmmd"
    if (d1 === m2 && d1 === m3 && d1 === m4 && d1 === d5) {
        return { pattern: cpy(matrix, d1), pay: 3200 };
    }

    // "umumu"
    if (u1 === m2 && u1 === u3 && u1 === m4 && u1 === u5) {
        return { pattern: cpy(matrix, u1), pay: 1600 };
    }

    // "dmdmd"
    if (d1 === m2 && d1 === d3 && d1 === m4 && d1 === d5) {
        return { pattern: cpy(matrix, d1), pay: 1600 };
    }

    // "dmumd"
    if (d1 === m2 && m2 === u3 && u3 === m4 && m4 === d5) {
        return { pattern: cpy(matrix, d1), pay: 800 };
    }

    // Checking "umdmu" pattern
    if (u1 === m2 && m2 === d3 && d3 === m4 && m4 === u5) {
        return { pattern: cpy(matrix, u1), pay: 800 };
    }

    // Checking "uumdd" pattern
    if (u1 === u2 && u1 === m3 && u1 === d4 && u1 === d5) {
        return { pattern: cpy(matrix, u1), pay: 400 };
    }

    // Checking "ddmuu" pattern
    if (d1 === d2 && d1 === m3 && d1 === u4 && d1 === u5) {
        return { pattern: cpy(matrix, d1), pay: 400 };
    }

    // Checking "ddudd"
    if (d1 === d2 && d1 === u3 && d1 === d4 && d1 === d5) {
        return { pattern: cpy(matrix, d1), pay: 200 };
    }

    // Checking "uuduu"
    if (u1 === u2 && u1 === d3 && u1 === u4 && u1 === u5) {
        return { pattern: cpy(matrix, u1), pay: 200 };
    }

    // Checking "duuud"
    if (d1 === u2 && d1 === u3 && d1 === u4 && d1 === d5) {
        return { pattern: cpy(matrix, d1), pay: 100 };
    }

    // Checking "udddu"
    if (u1 === d2 && u1 === d3 && u1 === d4 && u1 === u5) {
        return { pattern: cpy(matrix, u1), pay: 100 };
    }

    return { pattern: 'LOSE', pay: 0 };
}

// Main Game Function
async function playGame() {
    // Simulate Backend API Call
    const matrix = rand_spin();
    const result = check_patterns(matrix);

    // Update Grid
    grid.forEach((row, rowIndex) => {
        row.innerHTML = '';
        matrix[rowIndex].forEach(col => {
            const cell = document.createElement('div');
            cell.textContent = col;
            row.appendChild(cell);
        });
    });

    // Remove highlights and clear quote
    grid.forEach(row => {
        row.querySelectorAll('div').forEach(cell => cell.classList.remove('win-cell'));
    });
    quoteSpan.textContent = ''; 

    // Handle Result
    if (result.pattern === 'LOSE') {
        statusSpan.textContent = 'You Lose! 😢';
        payoutSpan.textContent = `$0`;
        quoteSpan.textContent = getRandomQuote(); 
    } else {
        statusSpan.textContent = `You Win! 🎉 Pattern: ${result.pattern}`;
        payoutSpan.textContent = `$${result.pay}`;
        result.pattern.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === '$') {
                    grid[rowIndex].children[colIndex].classList.add('win-cell');
                }
            });
        });
    }

    // Display matrix in console
    console.log("Matrix:");
    matrix.forEach(row => console.log(row.join(' ')));
}

// Play Button Event Listener
playBtn.addEventListener('click', playGame);
