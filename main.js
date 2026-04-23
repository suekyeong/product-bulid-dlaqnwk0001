
const lottoContainer = document.getElementById('lotto-container');
const generatorBtn = document.getElementById('generator-btn');

const colors = [
    '#ff4b5c', '#ffc107', '#2ec4b6', '#4f86f7', '#a368b6', 
    '#f9a825', '#f57c00', '#c2185b', '#7b1fa2', '#303f9f',
    '#0288d1', '#00796b', '#388e3c', '#689f38', '#afb42b',
    '#fbc02d', '#ffa000', '#e64a19', '#d81b60', '#8e24aa',
    '#5e35b1', '#1e88e5', '#00acc1', '#00897b', '#43a047',
    '#7cb342', '#c0ca33', '#fdd835', '#ffb300', '#fb8c00',
    '#f4511e', '#ec407a', '#ab47bc', '#7e57c2', '#5c6bc0',
    '#29b6f6', '#26c6da', '#26a69a', '#66bb6a', '#9ccc65',
    '#d4e157', '#ffee58', '#ffca28', '#ffa726', '#ff7043'
];

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) { // Lotto numbers are 6
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function displayNumbers() {
    lottoContainer.innerHTML = ''; // Clear previous numbers

    for (let i = 0; i < 3; i++) { // Create 3 rows
        const lottoRow = document.createElement('div');
        lottoRow.classList.add('lotto-row');

        const lottoNumbers = generateLottoNumbers();
        lottoNumbers.forEach(number => {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.textContent = number;
            ball.style.backgroundColor = colors[number - 1];
            lottoRow.appendChild(ball);
        });
        lottoContainer.appendChild(lottoRow);
    }
}

generatorBtn.addEventListener('click', displayNumbers);

// No initial display. Numbers will be generated only when the button is clicked.
