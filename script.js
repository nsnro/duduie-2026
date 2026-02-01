// Main script for Valentine's Day Website
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 1;
    let lovePercentage = 0;
    let intervalId = null;
    let secretClicks = 0;
    
    // Initialize the page
    init();

    function init() {
        applyTheme();
        createFloatingElements();
        setupMusicPlayer();
        showQuestion1();
    }

    // Apply theme colors from config
    function applyTheme() {
        const root = document.documentElement;
        root.style.setProperty('--bg-gradient-start', config.colors.backgroundStart);
        root.style.setProperty('--bg-gradient-end', config.colors.backgroundEnd);
        root.style.setProperty('--button-bg', config.colors.buttonBackground);
        root.style.setProperty('--button-hover', config.colors.buttonHover);
        root.style.setProperty('--text-color', config.colors.textColor);
        
        document.title = config.pageTitle;
    }

    // Create floating hearts and bears
    function createFloatingElements() {
        const container = document.getElementById('floating-elements');
        const allEmojis = [...config.floatingEmojis.hearts, ...config.floatingEmojis.bears];
        
        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = allEmojis[Math.floor(Math.random() * allEmojis.length)];
            element.style.left = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 15 + 's';
            element.style.fontSize = (Math.random() * 20 + 20) + 'px';
            container.appendChild(element);
        }
    }

    // Setup music player
    function setupMusicPlayer() {
        if (!config.music.enabled) {
            document.getElementById('music-control').style.display = 'none';
            return;
        }

        const musicBtn = document.getElementById('music-btn');
        const audio = document.getElementById('background-music');
        
        audio.src = config.music.musicUrl;
        audio.volume = config.music.volume;
        musicBtn.textContent = config.music.startText;

        musicBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play();
                musicBtn.textContent = config.music.stopText;
            } else {
                audio.pause();
                musicBtn.textContent = config.music.startText;
            }
        });

        if (config.music.autoplay) {
            audio.play().catch(() => {
                // Autoplay was prevented, user will need to click
            });
        }
    }

    // Question 1: Do you like me?
    function showQuestion1() {
        currentQuestion = 1;
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <h1>${config.questions.first.text}</h1>
            <div class="button-container">
                <button id="yes-btn" class="btn">${config.questions.first.yesBtn}</button>
                <button id="no-btn" class="btn btn-no">${config.questions.first.noBtn}</button>
            </div>
            <div id="secret-answer" class="secret-answer">${config.questions.first.secretAnswer}</div>
        `;

        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const secretAnswer = document.getElementById('secret-answer');

        yesBtn.addEventListener('click', showQuestion2);
        
        // No button runs away
        noBtn.addEventListener('mouseenter', makeButtonRunAway);
        noBtn.addEventListener('click', makeButtonRunAway);

        // Secret answer on click
        secretAnswer.addEventListener('click', function() {
            secretClicks++;
            if (secretClicks === 1) {
                secretAnswer.style.opacity = '0.3';
                secretAnswer.style.transform = 'scale(1.1)';
            }
        });
    }

    // Question 2: How much (Love Meter)
    function showQuestion2() {
        currentQuestion = 2;
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <h1>${config.questions.second.text}</h1>
            <div id="love-meter-container">
                <div id="love-meter">
                    <div id="love-fill"></div>
                    <span id="love-percentage">0%</span>
                </div>
                <p id="love-message">${config.questions.second.yesBtn}</p>
            </div>
            <button id="next-btn" class="btn" style="display:none;">${config.questions.second.nextBtn}</button>
        `;

        startLoveMeter();
    }

    function startLoveMeter() {
        const fill = document.getElementById('love-fill');
        const percentage = document.getElementById('love-percentage');
        const message = document.getElementById('love-message');
        const nextBtn = document.getElementById('next-btn');
        
        lovePercentage = 0;
        let increasing = true;
        
        intervalId = setInterval(() => {
            if (increasing) {
                lovePercentage += Math.random() * 15;
                if (lovePercentage >= 100) {
                    increasing = false;
                }
            }
            
            const displayPercentage = Math.min(Math.floor(lovePercentage), 9999);
            percentage.textContent = displayPercentage + '%';
            
            const fillWidth = Math.min((lovePercentage / 100) * 100, 100);
            fill.style.width = fillWidth + '%';
            
            // Update message based on percentage
            if (lovePercentage > 5000) {
                message.textContent = config.loveMessages.extreme;
            } else if (lovePercentage > 1000) {
                message.textContent = config.loveMessages.high;
            } else if (lovePercentage > 100) {
                message.textContent = config.loveMessages.normal;
            }
            
            if (lovePercentage >= 200) {
                clearInterval(intervalId);
                nextBtn.style.display = 'block';
                nextBtn.addEventListener('click', showQuestion3);
            }
        }, 100);
    }

    // Question 3: Do you have plans for Feb 14?
    function showQuestion3() {
        currentQuestion = 3;
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <h1>${config.questions.third.text}</h1>
            <div class="button-container">
                <button id="yes-btn" class="btn">${config.questions.third.yesBtn}</button>
                <button id="no-btn" class="btn btn-no">${config.questions.third.noBtn}</button>
            </div>
        `;

        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');

        yesBtn.addEventListener('click', showQuestion4);
        
        // Both buttons advance to next question
        noBtn.addEventListener('click', showQuestion4);
    }

    // Question 4: Single statement with one button
    function showQuestion4() {
        currentQuestion = 4;
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <h1>${config.questions.fourth.text}</h1>
            <div class="button-container">
                <button id="continue-btn" class="btn">${config.questions.fourth.yesBtn}</button>
            </div>
        `;

        const continueBtn = document.getElementById('continue-btn');
        continueBtn.addEventListener('click', showQuestion5);
    }

    // Question 5: Single statement with one button
    function showQuestion5() {
        currentQuestion = 5;
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <h1>${config.questions.fifth.text}</h1>
            <div class="button-container">
                <button id="continue-btn" class="btn">${config.questions.fifth.yesBtn}</button>
            </div>
        `;

        const continueBtn = document.getElementById('continue-btn');
        continueBtn.addEventListener('click', showQuestion6);
    }

    // Question 6: Final question with 4 options
    function showQuestion6() {
        currentQuestion = 6;
        const container = document.getElementById('question-container');
        
        const buttonsHTML = config.questions.sixth.options.map((option, index) => 
            `<button class="btn final-option" data-index="${index}">${option}</button>`
        ).join('');
        
        container.innerHTML = `
            <h1>${config.questions.sixth.text}</h1>
            <div class="button-container final-buttons">
                ${buttonsHTML}
            </div>
        `;

        const buttons = document.querySelectorAll('.final-option');
        buttons.forEach(btn => {
            btn.addEventListener('click', showCelebration);
        });
    }

    // Make button run away
    function makeButtonRunAway(e) {
        e.preventDefault();
        const btn = e.target;
        const container = btn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width - 20;
        const maxY = containerRect.height - btnRect.height - 20;
        
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;
        
        btn.style.position = 'absolute';
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';
        btn.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 200);
    }

    // Show celebration
    function showCelebration() {
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="celebration">
                <h1 class="celebration-title">${config.celebration.title}</h1>
                <div class="celebration-emojis">${config.celebration.emojis}</div>
                <p class="celebration-message">${config.celebration.message}</p>
            </div>
        `;

        createHeartExplosion();
    }

    // Create heart explosion effect
    function createHeartExplosion() {
        const container = document.getElementById('floating-elements');
        
        for (let i = 0; i < 50; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart-explosion';
            heart.textContent = '❤️';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.animationDelay = Math.random() * 0.5 + 's';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            container.appendChild(heart);
            
            setTimeout(() => heart.remove(), 4000);
        }
    }
});
