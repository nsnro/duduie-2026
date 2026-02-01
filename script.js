// Main script for Valentine's Day Website - Extended to 6 Questions
document.addEventListener('DOMContentLoaded', function() {
    let currentQuestion = 1;
    let lovePercentage = 0;
    let intervalId = null;
    let secretClicks = 0;
    
    init();

    function init() {
        applyTheme();
        createFloatingElements();
        setupMusicPlayer();
        showQuestion1();
    }

    function applyTheme() {
        const root = document.documentElement;
        root.style.setProperty('--bg-gradient-start', config.colors.backgroundStart);
        root.style.setProperty('--bg-gradient-end', config.colors.backgroundEnd);
        root.style.setProperty('--button-bg', config.colors.buttonBackground);
        root.style.setProperty('--button-hover', config.colors.buttonHover);
        root.style.setProperty('--text-color', config.colors.textColor);
        root.style.setProperty('--float-duration', config.animations.floatDuration);
        root.style.setProperty('--float-distance', config.animations.floatDistance);
        root.style.setProperty('--bounce-speed', config.animations.bounceSpeed);
        
        document.title = config.pageTitle;
    }

    function createFloatingElements() {
        const container = document.getElementById('floating-elements');
        if (!container) return;
        
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

    function setupMusicPlayer() {
        if (!config.music.enabled) {
            const musicControl = document.getElementById('music-control');
            if (musicControl) musicControl.style.display = 'none';
            return;
        }

        const musicBtn = document.getElementById('music-btn');
        const audio = document.getElementById('background-music');
        
        if (!musicBtn || !audio) return;
        
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
            audio.play().catch(() => {});
        }
    }

    // Question 1: Do you like me?
    function showQuestion1() {
        currentQuestion = 1;
        const container = document.getElementById('question-container');
        if (!container) return;
        
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

        if (yesBtn) yesBtn.addEventListener('click', showQuestion2);
        if (noBtn) {
            noBtn.addEventListener('mouseenter', makeButtonRunAway);
            noBtn.addEventListener('click', makeButtonRunAway);
        }

        if (secretAnswer) {
            secretAnswer.addEventListener('click', function() {
                secretClicks++;
                if (secretClicks === 1) {
                    secretAnswer.style.opacity = '0.3';
                    secretAnswer.style.transform = 'scale(1.1)';
                }
            });
        }
    }

    // Question 2: How much (Love Meter)
    function showQuestion2() {
        currentQuestion = 2;
        const container = document.getElementById('question-container');
        if (!container) return;
        
        container.innerHTML = `
            <h1>${config.questions.second.text}</h1>
            <div id="love-meter-container">
                <div id="love-meter">
                    <div id="love-fill"></div>
                    <span id="love-percentage">0%</span>
                </div>
                <p id="love-message">${config.questions.second.startText}</p>
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
        
        if (!fill || !percentage || !message || !nextBtn) return;
        
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
                nextBtn.addEventListener('click', showPreThird);
            }
        }, 100);
    }

    // NEW Question 3: Do you have plans for Feb 14?
    function showPreThird() {
        currentQuestion = 3;
        const container = document.getElementById('question-container');
        if (!container) return;
        
        container.innerHTML = `
            <h1>${config.questions.prethird.text}</h1>
            <div class="button-container">
                <button id="yes-btn" class="btn">${config.questions.prethird.yesBtn}</button>
                <button id="no-btn" class="btn btn-no">${config.questions.prethird.noBtn}</button>
            </div>
        `;

        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');

        if (yesBtn) yesBtn.addEventListener('click', showPreFourth);
        if (noBtn) noBtn.addEventListener('click', showPreFourth);
    }

    // NEW Question 4: Sarcastic response
    function showPreFourth() {
        currentQuestion = 4;
        const container = document.getElementById('question-container');
        if (!container) return;
        
        container.innerHTML = `
            <h1>${config.questions.prefourth.text}</h1>
            <div class="button-container">
                <button id="continue-btn" class="btn">${config.questions.prefourth.continueBtn}</button>
            </div>
        `;

        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) continueBtn.addEventListener('click', showPreFifth);
    }

    // NEW Question 5: Playful comeback
    function showPreFifth() {
        currentQuestion = 5;
        const container = document.getElementById('question-container');
        if (!container) return;
        
        container.innerHTML = `
            <h1>${config.questions.prefifth.text}</h1>
            <div class="button-container">
                <button id="continue-btn" class="btn">${config.questions.prefifth.continueBtn}</button>
            </div>
        `;

        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) continueBtn.addEventListener('click', showQuestion3);
    }

    // Question 6 (final): Will you be my valentine? - with multiple yes options
    function showQuestion3() {
        currentQuestion = 6;
        const container = document.getElementById('question-container');
        if (!container) return;
        
        // Check if we have multiple yes options
        if (config.questions.third.yesOptions && config.questions.third.yesOptions.length > 0) {
            const yesButtonsHTML = config.questions.third.yesOptions.map((option, index) => 
                `<button class="btn yes-option" data-index="${index}">${option}</button>`
            ).join('');
            
            container.innerHTML = `
                <h1>${config.questions.third.text}</h1>
                <div class="button-container multi-yes">
                    ${yesButtonsHTML}
                    <button id="no-btn" class="btn btn-no">${config.questions.third.noBtn}</button>
                </div>
            `;

            const yesButtons = document.querySelectorAll('.yes-option');
            yesButtons.forEach(btn => {
                btn.addEventListener('click', showCelebration);
            });
        } else {
            // Original single yes button
            container.innerHTML = `
                <h1>${config.questions.third.text}</h1>
                <div class="button-container">
                    <button id="yes-btn" class="btn">${config.questions.third.yesBtn}</button>
                    <button id="no-btn" class="btn btn-no">${config.questions.third.noBtn}</button>
                </div>
            `;

            const yesBtn = document.getElementById('yes-btn');
            if (yesBtn) yesBtn.addEventListener('click', showCelebration);
        }

        const noBtn = document.getElementById('no-btn');
        if (noBtn) {
            noBtn.addEventListener('mouseenter', makeButtonRunAway);
            noBtn.addEventListener('click', makeButtonRunAway);
        }
    }

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

    function showCelebration() {
        const container = document.getElementById('question-container');
        if (!container) return;
        
        container.innerHTML = `
            <div class="celebration">
                <h1 class="celebration-title">${config.celebration.title}</h1>
                <div class="celebration-emojis">${config.celebration.emojis}</div>
                <p class="celebration-message">${config.celebration.message}</p>
            </div>
        `;

        createHeartExplosion();
    }

    function createHeartExplosion() {
        const container = document.getElementById('floating-elements');
        if (!container) return;
        
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
