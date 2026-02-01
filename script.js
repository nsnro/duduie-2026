// Enhanced script.js - Extends original to 6 questions
let currentAdditionalQuestion = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeContent();
    setupLoveMeter();
});

function initializeContent() {
    // Set title
    document.getElementById('valentineTitle').textContent = `Hey ${config.valentineName}!`;
    
    // Question 1
    document.getElementById('question1Text').textContent = config.questions.first.text;
    document.getElementById('yesBtn1').textContent = config.questions.first.yesBtn;
    document.getElementById('noBtn1').textContent = config.questions.first.noBtn;
    document.getElementById('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Question 2 (Love Meter)
    document.getElementById('question2Text').textContent = config.questions.second.text;
    document.getElementById('startText').textContent = config.questions.second.startText;
    document.getElementById('nextBtn').textContent = config.questions.second.nextBtn;
    
    // Question 3 (will be modified for final question)
    updateFinalQuestion();
    
    // Celebration
    document.getElementById('celebrationTitle').textContent = config.celebration.title;
    document.getElementById('celebrationMessage').textContent = config.celebration.message;
    document.getElementById('celebrationEmojis').textContent = config.celebration.emojis;
}

function updateFinalQuestion() {
    // Update final question text
    document.getElementById('question3Text').textContent = 
        config.additionalQuestions.length > 0 
        ? config.additionalQuestions[0].text 
        : config.questions.third.text;
    
    // Update button texts
    if (config.additionalQuestions.length > 0 && currentAdditionalQuestion === 0) {
        document.getElementById('yesBtn3').textContent = config.additionalQuestions[0].yesBtn;
        document.getElementById('noBtn3').textContent = config.additionalQuestions[0].noBtn;
    }
}

function setupLoveMeter() {
    const slider = document.getElementById('loveMeter');
    const output = document.getElementById('loveValue');
    const extraLove = document.getElementById('extraLove');
    
    slider.oninput = function() {
        output.textContent = this.value;
        
        if (this.value > 5000) {
            extraLove.textContent = config.loveMessages.extreme;
            extraLove.classList.remove('hidden');
        } else if (this.value > 1000) {
            extraLove.textContent = config.loveMessages.high;
            extraLove.classList.remove('hidden');
        } else if (this.value > 100) {
            extraLove.textContent = config.loveMessages.normal;
            extraLove.classList.remove('hidden');
        } else {
            extraLove.classList.add('hidden');
        }
    }
}

function moveButton(button) {
    const maxX = window.innerWidth - button.offsetWidth - 40;
    const maxY = window.innerHeight - button.offsetHeight - 40;
    
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    button.style.position = 'fixed';
    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
}

function showNextQuestion(questionNumber) {
    // Hide all sections first
    document.querySelectorAll('.question-section, .celebration').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Special handling for question 3 (after love meter)
    if (questionNumber === 3) {
        if (config.additionalQuestions && config.additionalQuestions.length > 0) {
            // Show first additional question
            currentAdditionalQuestion = 0;
            showAdditionalQuestion();
            return;
        }
    }
    
    // Show requested question
    const questionEl = document.getElementById('question' + questionNumber);
    if (questionEl) {
        questionEl.classList.remove('hidden');
    }
}

function showAdditionalQuestion() {
    const question3El = document.getElementById('question3');
    const q = config.additionalQuestions[currentAdditionalQuestion];
    
    // Update question text
    document.getElementById('question3Text').textContent = q.text;
    
    // Check if this is a single-button question
    if (q.continueBtn) {
        // Single button question
        const yesBtn = document.getElementById('yesBtn3');
        const noBtn = document.getElementById('noBtn3');
        
        yesBtn.textContent = q.continueBtn;
        yesBtn.onclick = proceedToNextQuestion;
        yesBtn.classList.remove('final-yes');
        
        noBtn.style.display = 'none';
    } else {
        // Two button question
        const yesBtn = document.getElementById('yesBtn3');
        const noBtn = document.getElementById('noBtn3');
        
        yesBtn.textContent = q.yesBtn;
        noBtn.textContent = q.noBtn;
        yesBtn.onclick = proceedToNextQuestion;
        noBtn.onclick = proceedToNextQuestion;
        yesBtn.classList.remove('final-yes');
        
        noBtn.style.display = 'inline-block';
    }
    
    question3El.classList.remove('hidden');
}

function proceedToNextQuestion() {
    currentAdditionalQuestion++;
    
    // Hide current question
    document.getElementById('question3').classList.add('hidden');
    
    if (currentAdditionalQuestion < config.additionalQuestions.length) {
        // Show next additional question
        showAdditionalQuestion();
    } else {
        // Show final valentine question with multiple yes options
        showFinalValentineQuestion();
    }
}

function showFinalValentineQuestion() {
    const question3El = document.getElementById('question3');
    const question3Text = document.getElementById('question3Text');
    const yesBtn = document.getElementById('yesBtn3');
    const noBtn = document.getElementById('noBtn3');
    
    // Update to final question
    question3Text.textContent = config.questions.third.text;
    
    // If we have multiple yes options, create multiple buttons
    if (config.finalYesOptions && config.finalYesOptions.length > 0) {
        // Hide original buttons
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        
        // Create button container
        const container = yesBtn.parentElement;
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'multi-yes-container';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.flexWrap = 'wrap';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.justifyContent = 'center';
        
        // Add yes option buttons
        config.finalYesOptions.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'cute-btn final-yes';
            btn.textContent = option;
            btn.onclick = celebrate;
            buttonContainer.appendChild(btn);
        });
        
        // Add no button that runs away
        const newNoBtn = document.createElement('button');
        newNoBtn.className = 'cute-btn';
        newNoBtn.textContent = config.questions.third.noBtn;
        newNoBtn.onclick = function() { moveButton(this); };
        buttonContainer.appendChild(newNoBtn);
        
        // Insert before the yes button
        container.insertBefore(buttonContainer, yesBtn);
    } else {
        // Standard two button layout
        yesBtn.textContent = config.questions.third.yesBtn;
        yesBtn.onclick = celebrate;
        yesBtn.classList.add('final-yes');
        yesBtn.style.display = 'inline-block';
        
        noBtn.textContent = config.questions.third.noBtn;
        noBtn.onclick = function() { moveButton(this); };
        noBtn.style.display = 'inline-block';
    }
    
    question3El.classList.remove('hidden');
}

function celebrate() {
    // Hide all questions
    document.querySelectorAll('.question-section').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Show celebration
    document.getElementById('celebration').classList.remove('hidden');
    
    // Create heart explosion
    createHeartExplosion();
}

function createHeartExplosion() {
    const container = document.querySelector('.floating-elements');
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
        heart.style.animation = 'heartPulse 1s ease-in-out infinite';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 4000);
    }
}
