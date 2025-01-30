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

    if (m1 === m2 && m1 === d3 && m1 === m4 && m1 === m5) {            
        return { pattern: cpy(matrix,m1), pay: 25000 };
    }
    if (m1 === m2 && m1 === u3 && m1 === m4 && m1 === m5) {            
        return { pattern: cpy(matrix,m1), pay: 25000 };
    }
    if (m1 === d2 && m1 === m3 && m1 === d4 && m1 === m5) {
        return { pattern: cpy(matrix,m1), pay: 12500 };
    }
    if (m1 === u2 && m1 === m3 && m1 === u4 && m1 === m5) {
        return { pattern: cpy(matrix,m1), pay: 12500 };
    }
    if (m1 === d2 && m1 === m3 && m1 === u4 && m1 === m5){
        return { pattern: cpy(matrix, m1), pay: 6200 };
    } 

    return { pattern: 'LOSE', pay: 0 };
}

// Add Animation Effect
function animateGrid(matrix) {
    let delay = 100; // Delay between each symbol appearing

    grid.forEach((row, rowIndex) => {
        row.innerHTML = ''; // Clear existing symbols
        matrix[rowIndex].forEach((col, colIndex) => {
            setTimeout(() => {
                const cell = document.createElement('div');
                cell.textContent = col;
                cell.classList.add('slot-symbol'); // Add CSS class for animation
                row.appendChild(cell);
            }, delay * (colIndex + rowIndex * 5)); // Delay based on position
        });
    });
}

// Main Game Function
async function playGame() {
    const matrix = rand_spin();
    const result = check_patterns(matrix);

    // Remove highlights and clear quote
    grid.forEach(row => {
        row.querySelectorAll('div').forEach(cell => cell.classList.remove('win-cell'));
    });
    quoteSpan.textContent = '';

    // Animate the grid
    animateGrid(matrix);

    setTimeout(() => {
        if (result.pattern === 'LOSE') {
            statusSpan.textContent = 'You Lose! 😢';
            payoutSpan.textContent = `$0`;
            quoteSpan.textContent = getRandomQuote();
        } else {
            statusSpan.textContent = `You Win! 🎉`;
            payoutSpan.textContent = `$${result.pay}`;
            result.pattern.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (cell === '$') {
                        grid[rowIndex].children[colIndex].classList.add('win-cell');
                    }
                });
            });
        }
    }, 1000); // Give time for animation before showing results
}

const betButtons = document.querySelectorAll('.bet-btn');
const selectedBetDisplay = document.getElementById('selected-bet');

  betButtons.forEach(button => {
      button.addEventListener('click', () => {
          betButtons.forEach(btn => btn.classList.remove('selected')); // Remove previous selection
          button.classList.add('selected');
          const betAmount = button.getAttribute('data-amount');
          selectedBetDisplay.textContent = `Selected Bet: $${betAmount}`;
      });
  });
// Play Button Event Listener
playBtn.addEventListener('click', playGame);


const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
