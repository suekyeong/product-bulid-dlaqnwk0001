
// 로또 번호 생성기 코드
const lottoContainer = document.getElementById('lotto-container');
const generatorBtn = document.getElementById('generator-btn');

if (generatorBtn) {
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
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    function displayNumbers() {
        lottoContainer.innerHTML = ''; 
        for (let i = 0; i < 3; i++) {
            const lottoRow = document.createElement('div');
            lottoRow.classList.add('lotto-row');
            lottoContainer.appendChild(lottoRow);
            const lottoNumbers = generateLottoNumbers();
            lottoNumbers.forEach((number, index) => {
                const ball = document.createElement('div');
                ball.classList.add('ball');
                ball.textContent = number;
                ball.style.backgroundColor = colors[number - 1];
                lottoRow.appendChild(ball);
                setTimeout(() => {
                    ball.classList.add('show');
                }, (i * 600) + (index * 150)); 
            });
        }
    }

    generatorBtn.addEventListener('click', displayNumbers);
}

// 동물상 테스트 코드
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('image-preview');
const analyzeBtn = document.getElementById('analyze-btn');
const resultContainer = document.getElementById('result-container');

if (imageUpload) {
    const URL = "https://teachablemachine.withgoogle.com/models/70M-2a1yC/";
    let model, maxPredictions;
    let uploadedImage;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
    }
    init();

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.innerHTML = ''; // 이전 미리보기 이미지 삭제
            uploadedImage = document.createElement('img');
            uploadedImage.src = e.target.result;
            uploadedImage.style.width = '100%';
            imagePreview.appendChild(uploadedImage);
            analyzeBtn.disabled = false; // 분석 버튼 활성화
            resultContainer.innerHTML = ''; // 이전 결과 삭제
        }
        reader.readAsDataURL(file);
    });

    analyzeBtn.addEventListener('click', async () => {
        if (!uploadedImage) return;
        analyzeBtn.disabled = true;
        analyzeBtn.textContent = '분석 중...';
        const prediction = await model.predict(uploadedImage);
        displayResults(prediction);
        analyzeBtn.textContent = '분석 시작';
    });

    function displayResults(prediction) {
        resultContainer.innerHTML = '';
        prediction.sort((a, b) => b.probability - a.probability);
        const resultHeader = document.createElement('h3');
        resultHeader.textContent = `당신은 ${prediction[0].className}상에 가깝습니다.`;
        resultContainer.appendChild(resultHeader);

        prediction.forEach(p => {
            const item = document.createElement('div');
            item.className = 'result-item';
            const name = document.createElement('span');
            name.textContent = p.className;
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';
            const bar = document.createElement('div');
            bar.className = 'bar';
            bar.style.width = `${p.probability.toFixed(2) * 100}%`;
            const percent = document.createElement('span');
            percent.textContent = `${(p.probability * 100).toFixed(1)}%`;

            barContainer.appendChild(bar);
            item.appendChild(name);
            item.appendChild(barContainer);
            item.appendChild(percent);
            resultContainer.appendChild(item);
        });
    }
}

// 테마 토글 기능
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// 페이지 로드 시 저장된 테마 적용
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
}
