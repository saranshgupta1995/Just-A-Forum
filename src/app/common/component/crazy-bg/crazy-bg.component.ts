import { Component, OnInit } from '@angular/core';
import { CrazyBgConnect } from './crazy-bg-connect';

@Component({
    selector: 'dsclz-crazy-bg',
    templateUrl: './crazy-bg.component.html',
    styleUrls: ['./crazy-bg.component.css']
})
export class CrazyBgComponent implements OnInit {

    constructor(private crazyBgConnect: CrazyBgConnect) { }

    ngOnInit() {


        let connectData = this.crazyBgConnect;
        document.onclick = (e) => {
            connectData.targetPos.x = e['clientX']
            connectData.targetPos.y = e['clientY']
        }

        let randFun = Math.random;
        let currentMousePosition = {
            x: -1,
            y: -1
        }
        let p;
        window['requestAnimFrame'] = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window['mozRequestAnimationFrame'] ||
                window['oRequestAnimationFrame'] ||
                window['msRequestAnimationFrame'] ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        var canvas = document.getElementById("canvas");
        var ctx = canvas['getContext']("2d");

        var W = window.innerWidth, H = window.innerHeight;
        canvas['width'] = W;
        canvas['height'] = H;
        canvas['mousePosition'] = {
            x: 0,
            y: 0
        };

        var particleCount = Math.min(W, H),
            particles = [],
            minDist: any = 70

        function paintCanvas() {
            ctx.fillStyle = "rgba(255,255,255,1)";
            ctx.fillRect(0, 0, W, H);
        }

        function getrelativeMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            currentMousePosition.x = evt.clientX - rect.left
            currentMousePosition.y = evt.clientY - rect.top
            return {
                x: ((evt.clientX - rect.width / 2) / rect.width) / 1.5,
                y: ((evt.clientY - rect.height / 2) / rect.height) / 1.5
            };
        }

        canvas.addEventListener('mousemove', function (evt) {
            getrelativeMousePos(canvas, evt);
        }, false);

        class Particle {
            x: number = randFun() * W;
            y: number = randFun() * H;
            lifeTime = 0;
            radius: number = 2;

            constructor() {
                let that = this;
                setInterval(() => {
                    that.x = randFun() * W;
                    that.y = randFun() * H;
                }, 1000 + randFun() * 10000)
            }

            draw: () => void = function () {
                ctx.fillStyle = "rgba(0, 0, 0, " + (Math.min(randFun(), 0.05)).toString() + ")";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

                ctx.fill();
            };

            updateSpeed: () => void = function () {
                if (!~connectData.targetPos.x)
                    return

                let diffX = this.x - connectData.targetPos.x
                let diffY = this.y - connectData.targetPos.y

                if (diffX * diffX + diffY * diffY < 3600) {
                    this.x -= diffX / 2000;
                    this.y -= diffY / 2000;
                } else if (diffX * diffX + diffY * diffY < 6600) {
                    this.x -= diffX / 20;
                    this.y -= diffY / 20;
                } else if (diffX * diffX + diffY * diffY < 16600) {
                    this.x -= diffX / 2000;
                    this.y -= diffY / 2000;
                } else if (diffX * diffX + diffY * diffY < 25600) {
                    this.x -= diffX / 20;
                    this.y -= diffY / 20;
                } else if (diffX * diffX + diffY * diffY < 35600) {
                    this.x -= diffX / 2000;
                    this.y -= diffY / 2000;
                } else if (diffX * diffX + diffY * diffY < 45600) {
                    this.x -= diffX / 20;
                    this.y -= diffY / 20;
                } else {
                    this.x -= (diffX * diffX >= 1600 ? ((diffX) / 1000) : 0) + randFun() * 1 + randFun() * -1;
                    this.y -= (diffY * diffY >= 1600 ? ((diffY) / 1000) : 0) + randFun() * 1 + randFun() * -1;
                }

                // let t = Math.atan2(this.x, this.y);
                // this.x -= Math.cos(10 * t) * 0.5;
                // this.y -= Math.sin(10 * t) * 0.5;
            };


        }

        for (var i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function draw() {

            paintCanvas();

            let p;
            for (var i = 0; i < particles.length; i++) {
                p = particles[i];
                p.draw();
            }

            update();
        }

        function update() {

            for (var i = 0; i < particles.length; i++) {
                p = particles[i];

                if (p.x + p.radius > W)
                    p.x = p.radius;

                else if (p.x - p.radius < 0) {
                    p.x = W - p.radius;
                }

                if (p.y + p.radius > H)
                    p.y = p.radius;

                else if (p.y - p.radius < 0) {
                    p.y = H - p.radius;
                }

                let p2;
                let k = 0;
                for (var j = i + 1; j < particles.length; j++) {
                    k += distance(p, particles[j]) ? 1 : 0;
                    if (k > 5)
                        break
                }
                p.updateSpeed();

            }
        }

        function distance(p1, p2) {
            let dist: any, colorIndex: any;
            let dx = Math.abs(p1.x - p2.x);
            let dy = Math.abs(p1.y - p2.y);

            dist = Math.sqrt(dx * dx + dy * dy);

            if (dist <= minDist) {
                let ax = -dx / 200;
                let ay = -dy / 200;
                p1.x -= ax;
                p1.y -= ay;
                p2.x += ax;
                p2.y += ay;
                ctx.beginPath();
                colorIndex = parseInt((100.0 * dist / minDist).toString()) + 25;
                ctx.strokeStyle = "rgba(0, 0, 0," + Math.min((0.8 - dist / minDist), 0.06) + ")";
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }

            return dist <= minDist
        }

        function animloop() {
            draw();
            window['requestAnimFrame'](animloop);
        }

        animloop();
    }

}
