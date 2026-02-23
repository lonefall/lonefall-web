const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 110; 
const mouse = { x: null, y: null, radius: 350 };

window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
window.addEventListener('resize', init);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        
        const roll = Math.random();
        if (roll > 0.7) {
            this.size = Math.random() * 2 + 1; 
        } else {
            this.size = Math.random() * 0.8 + 0.3; 
        }

        this.vx = 0;
        this.vy = 0;
        this.friction = 0.98; 
        this.gravityStrength = 0.0005; 
        this.opacity = Math.random() * 0.5 + 0.2; 
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        if (this.size > 1.5) {
            ctx.shadowBlur = 5;
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
        }
        ctx.fill();
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius && mouse.x !== null) {
            let force = (mouse.radius - distance) / mouse.radius;
            this.vx += dx * force * this.gravityStrength;
            this.vy += dy * force * this.gravityStrength;
        } else {
            this.vx += (this.baseX - this.x) * 0.00015;
            this.vy += (this.baseY - this.y) * 0.00015;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;

        this.baseY -= 0.02; 
        if (this.baseY < -10) this.baseY = canvas.height + 10;
    }
}

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();