// trigger to play music in the background with sweetalert
window.addEventListener('load', () => {
    Swal.fire({
        title: 'Do you want to play music in the background?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('.song').play();
            animationTimeline();
        } else {
            animationTimeline();
        }
    });
});

// Enhanced WhatsApp chat animation function with typing and sending simulation
// Enhanced WhatsApp chat animation function with proper timing
// Enhanced WhatsApp chat animation with precise timing
function animateChatMessages() {
    const messages = [
        "🎉 Happy birthday to you!! Yeee! Many many happy returns of the day 💖✨", // ~15 sec
        "Wishing you a day filled with love, laughter, and cake 🎂", // ~10 sec
        "May your year be as wonderful as you are 🥳", // ~8 sec
        "Cheers to more adventures, smiles, and memories! 🥂", // ~10 sec
        "Stay blessed and keep glowing! 🌟", // ~7 sec
        "💌 From someone who truly cares..." // ~5 sec
    ];

    const chatBody = document.getElementById('chatBody');
    const inputBox = document.querySelector('.hbd-chatbox');
    const sendBtn = document.querySelector('.fake-btn');
    
    // Calculate precise typing time (chars × delay) + sending delay
    function calculateMessageTime(message) {
        const typingTime = message.length * 80; // Average 80ms per character
        const sendingDelay = 1300; // 1.3s for send animation
        return typingTime + sendingDelay;
    }

    // Calculate total time needed for all messages
    function calculateTotalTime() {
        return messages.reduce((total, msg) => total + calculateMessageTime(msg), 0);
    }

    // Simulate typing and sending with precise timing
    async function processMessages() {
        const totalTime = calculateTotalTime();
        console.log(`Total chat duration needed: ${totalTime/1000} seconds`);
        
        for (const message of messages) {
            // Type message
            let typedLength = 0;
            inputBox.textContent = "";
            
            await new Promise(resolve => {
                const typingInterval = setInterval(() => {
                    if (typedLength < message.length) {
                        inputBox.textContent += message[typedLength];
                        typedLength++;
                    } else {
                        clearInterval(typingInterval);
                        setTimeout(resolve, 500); // Pause after typing
                    }
                }, 60 + Math.random() * 40); // 60-100ms per character
            });
            
            // Send message
            await new Promise(resolve => {
                // Button press effect
                sendBtn.style.transform = "scale(0.9)";
                sendBtn.style.boxShadow = "0 0 8px rgba(0,0,0,0.2)";
                
                setTimeout(() => {
                    // Create bubble
                    const bubble = document.createElement('div');
                    bubble.className = 'chat-bubble';
                    bubble.textContent = message;
                    chatBody.appendChild(bubble);
                    chatBody.scrollTop = chatBody.scrollHeight;
                    
                    // Reset UI
                    inputBox.textContent = "";
                    sendBtn.style.transform = "";
                    sendBtn.style.boxShadow = "";
                    
                    setTimeout(resolve, 1000); // View message before next
                }, 300);
            });
        }
    }

    return processMessages();
}

// animation timeline
const animationTimeline = () => {
    // split chars that needs to be animated individually
    const hbd = document.getElementsByClassName("wish-hbd")[0];
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const ideaTextTrans = {
        opacity: 0,
        y: -20,
        rotationX: 5,
        skewX: "15deg"
    }

    const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg"
    }

    // timeline
    const tl = new TimelineMax();

    tl.to(".container", 0.6, {
        visibility: "visible"
    })
    .from(".one", 0.7, {
        opacity: 0,
        y: 10
    })
    .from(".two", 0.4, {
        opacity: 0,
        y: 10
    })
    .to(".one", 0.7, {
        opacity: 0,
        y: 10
    }, "+=3.5")
    .to(".two", 0.7, {
        opacity: 0,
        y: 10
    }, "-=1")
    .from(".three", 0.7, {
        opacity: 0,
        y: 10
    })
    .to(".three", 0.7, {
        opacity: 0,
        y: 10
    }, "+=3")
    .from(".four", 0.7, {
        scale: 0.2,
        opacity: 0,
    })
    // Initialize chat UI
    .from(".chat-header", 0.5, { opacity: 0, y: -20 }, "+=0.5")
    .from(".chat-body", 0.5, { opacity: 0 }, "-=0.5")
    .from(".text-box", 0.5, { opacity: 0, y: 20 }, "-=0.5")
    
    // Start chat animation
    .add(() => {
        animateChatMessages().then(() => {
            console.log("All messages completed");
        });
    }, "+=0.5")
    
    // Make container disappear after EXACTLY the needed time
    .to(".four", 0.5, {
        scale: 0.2,
        opacity: 0,
        y: -150
    }, "+=25") // 25 seconds covers all messages comfortably
    
    // ... (rest of your existing timeline remains exactly the same)
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
        scale: 1.2,
        x: 10,
        backgroundColor: "rgb(21, 161, 237)",
        color: "#fff",
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
    }, "+=1.5")
    .to(".idea-5 span", 0.7, {
        rotation: 90,
        x: 8,
    }, "+=1.4")
    .to(".idea-5", 0.7, {
        scale: 0.2,
        opacity: 0,
    }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
    }, 0.2)
    .staggerTo(".idea-6 span", 0.8, {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
    }, 0.2, "+=1.5")
    .staggerFromTo(".baloons img", 2.5, {
        opacity: 0.9,
        y: 1400,
    }, {
        opacity: 1,
        y: -1000,
    }, 0.2)
    .from(".profile-picture", 0.5, {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
    }, "-=2")
    .from(".hat", 0.5, {
        x: -80,
        y: 300,
        rotation: -180,
        opacity: 0,
    })
    .staggerFrom(".wish-hbd span", 0.7, {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
    }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, {
        scale: 1.4,
        rotationY: 150,
    }, {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
    }, 0.1, "party")
    .from(".wish h5", 0.5, {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
    }, "party")
    .staggerTo(".eight svg", 1.5, {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: .7,
    }, 0.3)
    .to(".six", 0.5, {
        opacity: 0,
        y: 30,
        zIndex: "-1",
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, {
        rotation: 90,
    }, "+=1");

    // Restart Animation on click
    const replyBtn = document.getElementById("replay");
    replyBtn.addEventListener("click", () => {
        // Clear chat messages and reset input before restarting
        document.getElementById("chatBody").innerHTML = "";
        document.querySelector('.hbd-chatbox').textContent = "";
        tl.restart();
    });
}
