(function () {

    var canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')


    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;


    particles = [];
    properties = {

        particleColor: 'rgba(34, 11, 181, 1);',
        particleRadius: 5,
        particleCount: 100,
        ParticleMaxVelocity: 0.7,
        lineLength: 160,
        particleLife: 10
    }

    document.querySelector('body').appendChild(canvas)

    window.onresize = function () {
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w
            this.y = Math.random() * h
            //создание (скорость) перемещения частиц
            this.velocityX = Math.random() * (properties.ParticleMaxVelocity * 2) - properties.ParticleMaxVelocity;
            this.velocityY = Math.random() * (properties.ParticleMaxVelocity * 2) - properties.ParticleMaxVelocity;
            //Жизнь частичек
            this.life = Math.random() * properties.particleLife * 60;
        }
        position() {
            //Не выходить за рамки окна
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY

            //Перемещение частиц
            this.x += this.velocityX
            this.y += this.velocityY
        }
        //Создание самих частиц
        reDraw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }

    }

    //цвет заднего фона
    function redrawBackground() {
        ctx.fillStyle = 'rgba(48, 22, 37, 1)';
        ctx.fillRect(0, 0, w, h)
    }

    //Рисуем линии
    function drawLines() {
        var x1, y1, x2, y2, length, opacity

        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x
                y1 = particles[i].y
                //Координаты второй частицы
                x2 = particles[j].x
                y2 = particles[j].y
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength
                    //Ширина,цвет
                    ctx.lineWidth = '0.5'
                    ctx.strokeStyle = 'rgba(2, 173, 151,1)'
                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.closePath();
                    ctx.stroke()
                }
            }
        }
    }


    function reDrawParticles() {
        for (let i in particles) {
            particles[i].position()
            particles[i].reDraw()
        }
    }

    function loop() {
        redrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop)
    }

    function init() {
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop()
    }

    init()

}())



