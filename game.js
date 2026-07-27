// ====================================
// ANOMALY HOSPITAL - Game Logic
// ====================================

class AnomalyHospitalGame {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        
        this.gameState = {
            hasStampedSeal: false,
            photoTaken: false,
            cardPrinted: false,
            assignedRoom: null,
            requestedItem: null,
            completed: false
        };

        this.items = ['Medicine', 'Bandage', 'Syringe', 'Oxygen', 'Tablet'];
        this.rooms = [1, 2, 3, 4];

        this.initializeEventListeners();
        this.displayStep(1);
    }

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.nextStep();
            }
        });
    }

    displayStep(step) {
        const stepTitle = document.getElementById('stepTitle');
        const stepMessage = document.getElementById('stepMessage');
        const instruction = document.getElementById('instruction');

        // Update progress
        this.updateProgress(step);

        switch(step) {
            case 1:
                stepTitle.textContent = '📝 Step 1: HOSPITAL SEAL';
                stepMessage.textContent = 'Press SPACE BAR to stamp your hospital seal';
                instruction.innerHTML = 'Press <strong>SPACE BAR</strong> to stamp seal →';
                break;

            case 2:
                stepTitle.textContent = '📷 Step 2: TAKE PHOTO';
                stepMessage.textContent = 'Your photo is being taken for your hospital ID card';
                instruction.innerHTML = 'Press <strong>SPACE BAR</strong> to take photo →';
                break;

            case 3:
                stepTitle.textContent = '🎫 Step 3: PRINT CARD';
                stepMessage.textContent = 'Your hospital ID card is being printed...';
                instruction.innerHTML = 'Press <strong>SPACE BAR</strong> to print card →';
                break;

            case 4:
                stepTitle.textContent = '🚪 Step 4: ROOM ASSIGNMENT';
                stepMessage.textContent = `You have been assigned to: <strong>Room ${this.gameState.assignedRoom}</strong>`;
                instruction.innerHTML = 'Press <strong>SPACE BAR</strong> to continue →';
                break;

            case 5:
                stepTitle.textContent = '💊 Step 5: REQUEST ITEM';
                stepMessage.textContent = `You have requested: <strong>${this.gameState.requestedItem}</strong>`;
                instruction.innerHTML = 'Press <strong>SPACE BAR</strong> to confirm →';
                break;

            case 6:
                stepTitle.textContent = '✅ WELCOME TO ANOMALY HOSPITAL!';
                stepMessage.textContent = 'Your registration is complete. Your room and supplies are ready.';
                instruction.innerHTML = '✓ Registration Complete!';
                break;
        }

        // Add animation
        this.addFadeAnimation();
        this.updateStatus();
    }

    nextStep() {
        if (this.currentStep === 1) {
            this.stampSeal();
        } else if (this.currentStep === 2) {
            this.takePhoto();
        } else if (this.currentStep === 3) {
            this.printCard();
        } else if (this.currentStep === 4) {
            this.assignRoom();
        } else if (this.currentStep === 5) {
            this.requestItem();
        } else if (this.currentStep === 6) {
            this.complete();
        }

        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.displayStep(this.currentStep);
            this.playSuccessEffect();
        }
    }

    stampSeal() {
        this.gameState.hasStampedSeal = true;
        console.log('✓ Hospital seal stamped');
        this.showNotification('✓ Hospital seal stamped');
    }

    takePhoto() {
        if (!this.gameState.hasStampedSeal) {
            this.showError('Must stamp seal first!');
            return;
        }
        this.gameState.photoTaken = true;
        console.log('✓ Photo taken successfully');
        this.showNotification('✓ Photo taken successfully');
    }

    printCard() {
        if (!this.gameState.photoTaken) {
            this.showError('Must take photo first!');
            return;
        }
        this.gameState.cardPrinted = true;
        console.log('✓ Card printed');
        this.showNotification('✓ Card printed');
    }

    assignRoom() {
        if (!this.gameState.cardPrinted) {
            this.showError('Must print card first!');
            return;
        }
        this.gameState.assignedRoom = this.rooms[Math.floor(Math.random() * this.rooms.length)];
        console.log(`✓ Assigned to Room ${this.gameState.assignedRoom}`);
        this.showNotification(`✓ Assigned to Room ${this.gameState.assignedRoom}`);
    }

    requestItem() {
        if (!this.gameState.assignedRoom) {
            this.showError('Must be assigned to a room first!');
            return;
        }
        this.gameState.requestedItem = this.items[Math.floor(Math.random() * this.items.length)];
        console.log(`✓ Requested: ${this.gameState.requestedItem}`);
        this.showNotification(`✓ Requested: ${this.gameState.requestedItem}`);
    }

    complete() {
        if (!this.gameState.requestedItem) {
            this.showError('Must request an item first!');
            return;
        }
        this.gameState.completed = true;
        console.log('✓ Registration complete!');
        this.showNotification('✓ Welcome to Anomaly Hospital!');
    }

    updateStatus() {
        // Update seal status
        const sealStatus = document.getElementById('statusSeal');
        if (this.gameState.hasStampedSeal) {
            sealStatus.textContent = '✓';
            sealStatus.classList.add('active');
        } else {
            sealStatus.textContent = '✗';
            sealStatus.classList.remove('active');
        }

        // Update photo status
        const photoStatus = document.getElementById('statusPhoto');
        if (this.gameState.photoTaken) {
            photoStatus.textContent = '✓';
            photoStatus.classList.add('active');
        } else {
            photoStatus.textContent = '✗';
            photoStatus.classList.remove('active');
        }

        // Update card status
        const cardStatus = document.getElementById('statusCard');
        if (this.gameState.cardPrinted) {
            cardStatus.textContent = '✓';
            cardStatus.classList.add('active');
        } else {
            cardStatus.textContent = '✗';
            cardStatus.classList.remove('active');
        }

        // Update room status
        const roomStatus = document.getElementById('statusRoom');
        if (this.gameState.assignedRoom) {
            roomStatus.textContent = this.gameState.assignedRoom;
            roomStatus.classList.add('active');
        } else {
            roomStatus.textContent = '-';
            roomStatus.classList.remove('active');
        }

        // Update item status
        const itemStatus = document.getElementById('statusItem');
        if (this.gameState.requestedItem) {
            itemStatus.textContent = this.gameState.requestedItem;
            itemStatus.classList.add('active');
        } else {
            itemStatus.textContent = '-';
            itemStatus.classList.remove('active');
        }
    }

    updateProgress(step) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        const percentage = (step / this.totalSteps) * 100;
        progressFill.style.width = percentage + '%';
        progressText.textContent = `Step ${step} of ${this.totalSteps}`;
    }

    showNotification(message) {
        // Optional: Show temporary notification
        console.log(message);
    }

    showError(message) {
        console.error(message);
        alert(message);
    }

    addFadeAnimation() {
        const messageBox = document.querySelector('.message-box');
        messageBox.classList.remove('fade-in');
        messageBox.offsetHeight; // Trigger reflow
        messageBox.classList.add('fade-in');
    }

    playSuccessEffect() {
        this.createParticles();
    }

    createParticles() {
        const container = document.getElementById('effectContainer');
        const colors = ['⭐', '✨', '🌟', '💫'];
        
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle star';
            particle.textContent = colors[Math.floor(Math.random() * colors.length)];
            
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
            particle.style.setProperty('--ty', (Math.random() - 0.5) * 100 + 'px');
            
            container.appendChild(particle);
            
            setTimeout(() => particle.remove(), 800);
        }
    }

    getGameState() {
        return this.gameState;
    }

    saveGameState() {
        localStorage.setItem('anomalyHospitalGameState', JSON.stringify(this.gameState));
    }

    loadGameState() {
        const saved = localStorage.getItem('anomalyHospitalGameState');
        if (saved) {
            this.gameState = JSON.parse(saved);
        }
    }

    resetGame() {
        this.currentStep = 1;
        this.gameState = {
            hasStampedSeal: false,
            photoTaken: false,
            cardPrinted: false,
            assignedRoom: null,
            requestedItem: null,
            completed: false
        };
        localStorage.removeItem('anomalyHospitalGameState');
        this.displayStep(1);
    }
}

// Initialize game when page loads
let game;

window.addEventListener('DOMContentLoaded', () => {
    game = new AnomalyHospitalGame();
    console.log('🏥 Anomaly Hospital Game Started!');
});

// Prevent default space bar behavior
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
    }
});

// Handle visibility changes (pause game when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Game paused');
    } else {
        console.log('Game resumed');
    }
});
