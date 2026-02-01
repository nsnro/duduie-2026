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
        // NEW: Question 3 - About Feb 14th plans
        prethird: {
            text: "Do you have any plans for the 14th of February?",
            yesBtn: "No",
            noBtn: "No. Stop looking for a yes."
        },
        // NEW: Question 4 - Sarcastic response
        prefourth: {
            text: "Uf, that sucks for you. I wish you good luck with that",
            continueBtn: "Oh fuck you."
        },
        // NEW: Question 5 - Playful comeback
        prefifth: {
            text: "You wish ;)",
            continueBtn: "Sigh..."
        },
        // Final question (was third, now sixth)
        third: {
            text: "Fine, fine... Will you be my valentine?",
            yesBtn: "Yes!",
            noBtn: "No",
            // Multiple yes options
            yesOptions: [
                "Yes",
                "Of course",
                "I didn't think you'd ever ask",
                "Oh fuck yeah."
            ]
        }
    },

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
