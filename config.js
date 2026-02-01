// Configuration file for Valentine's Day Website
const config = {
    // Basic Information
    valentineName: "Duduieeee",
    pageTitle: "Will You Be My Valentine? 💝",

    // Floating Background Elements
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],
        bears: ['🧸', '🐻']
    },

    // Questions Configuration - 6 Questions
    questions: {
        first: {
            text: "Do you like me?",
            yesBtn: "Yes",
            noBtn: "No",
            secretAnswer: "I don't like you, I love you! ❤️"
        },
        second: {
            text: "How much?",
            yesBtn: "This much",
            nextBtn: "Next ❤️"
        },
        third: {
            text: "Do you have any plans for the 14th of February?",
            yesBtn: "No",
            noBtn: "No. Stop looking for a yes."
        },
        fourth: {
            text: "Uf, that sucks for you. I wish you good luck with that",
            yesBtn: "Oh fuck you."
        },
        fifth: {
            text: "You wish ;)",
            yesBtn: "Sigh..."
        },
        sixth: {
            text: "Fine, fine... Will you be my valentine?",
            options: [
                "Yes",
                "Of course",
                "I didn't think you'd ever ask",
                "Oh fuck yeah."
            ]
        }
    },

    // Love Meter Messages (for question 2)
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
