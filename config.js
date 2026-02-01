// Configuration file for Valentine's Day Website
const config = {
    // Basic Information
    valentineName: "Duduie",
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating Background Elements
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    // Questions Configuration
    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you! ❤️"
        },
        second: {
            text: "How much?",
            startText: "This much!",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Will you be my Valentine...?",
            yesBtn: "Yes!",
            noBtn: "No"
        }
    },

    // NEW: Additional questions (3-5) to insert between question 2 and final question
    additionalQuestions: [
        {
            text: "Do you have any plans for the 14th of February?",
            yesBtn: "No",
            noBtn: "No. Stop looking for a yes."
        },
        {
            text: "Uf, that sucks for you. I wish you good luck with that",
            continueBtn: "Oh fuck you."
        },
        {
            text: "You wish ;)",
            continueBtn: "Sigh..."
        }
    ],

    // Multiple yes options for final question
    finalYesOptions: [
        "Yes",
        "Of course",
        "I didn't think you'd ever ask",
        "Oh fuck yeah."
    ],

    // Love Meter Messages
    loveMessages: {
        extreme: "WOOOOW You love me that much?? 🥰🚀💝",
        high: "To infinity and beyond! 🚀💝",
        normal: "And beyond! 🥰"
    },

    // Final Celebration
    celebration: {
        title: "Yay! I'm the luckiest person...",
        message: "Now come get your gift...",
        emojis: "🎁💖🤗💝💋❤️💕"
    },

    // Website Colors
    colors: {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    },

    // Animation Settings
    animations: {
        floatDuration: "15s",
        floatDistance: "50px",
        bounceSpeed: "0.5s",
        heartExplosionSize: 1.5
    },

    // Music Settings
    music: {
        enabled: false,
        autoplay: false,
        musicUrl: "",
        startText: "🎵 Play Music",
        stopText: "🔇 Stop Music",
        volume: 0.5
    }
};
