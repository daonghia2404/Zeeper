window.onload = () => {
    const loader = {
        init:function(){
            this.loading()
        },
        loading:function(){
            const page = document.querySelector('.loader');

            function hide(){
                page.classList.add('hide');
            }

            setTimeout(hide, 2000);
        }
    }
    loader.init();

    const navigation = {
        init:function(){
            this.clickBtn();
            this.fixed();
        },
        clickBtn:function(){
            const btn = document.querySelector('.nav__button');
            const menu = document.querySelector('.nav__menu');

            btn.addEventListener('click', ()=> {
                menu.classList.toggle('active');
            })
        },
        fixed:function(){
            const nav = document.querySelector('.nav');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 10){
                    nav.classList.add('active');
                }
                else {
                    nav.classList.remove('active');
                }
            })
        }
    }
    navigation.init();

    const video = {
        init:function(){
            this.popUp();
        },
        popUp:function(){
            const openBtn = document.querySelector('.iconPopup');
            const closeBtn = document.querySelector('.close');
            const overlay = document.querySelector('.videoPopup');
            const video = overlay.querySelector('iframe');

            openBtn.addEventListener('click', () => {
                overlay.classList.add('show');
                video.src = video.dataset.src;
            })

            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('show');
                video.src = '';
            })
        }
    }
    video.init();

    const grabSlider = {
        init:function(){
            this.grabSlide('.screen', '.slider__item');
            this.circleButton('.screen', '.slider__item');
            this.clickButton('.screen', '.buttonLeft', '.buttonRight', '#wrap', '.slider__item');

            // this.grabSlide('.testimonial', '.slider__item');
            this.circleButton('.testimonial', '.slider__item');
        },
        grabSlide: function (wrapSlider, itemSlider) {
            const grabSlide = document.querySelector(wrapSlider);
            if (grabSlide === null) return;
            const wrap = grabSlide.querySelector('#wrap');
            const items = document.querySelectorAll(itemSlider);

            let isDown = false;
            let startX;
            let scrollLeft;
            let size = items[0].offsetWidth;
            console.log(items);
            

            function slideItem(){
                index = Math.round(wrap.scrollLeft / size);
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = size * index;
            }
            
            //add event grab wrap
            wrap.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - wrap.offsetLeft; //this value will take x at first
                scrollLeft = wrap.scrollLeft;   //this value will take scroll left at first
                wrap.style.scrollBehavior = 'unset';
            })
            wrap.addEventListener('mouseleave', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mouseup', () => {
                isDown = false;
                slideItem();
            })
            wrap.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                //transfrom slide by grab and move left right
                const x = e.pageX - wrap.offsetLeft;
                const walk = x - startX;
                wrap.scrollLeft = scrollLeft - walk;
            })
        },
        clickButton:function(selfItem, leftBtn, rightBtn, wrapSlider, itemsSlider){
            const self = document.querySelector(selfItem);
            if (self === null) return;
            const left = self.querySelector(leftBtn);
            const right = self.querySelector(rightBtn);
            const wrap = self.querySelector(wrapSlider);
            const items = self.querySelectorAll(itemsSlider);
            

            let count = 0;
            let size = items[0].offsetWidth;    //lấy chiều rộng của slider__item

            left.addEventListener('click', () => {
                count--;
                count = count % items.length;
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = count * size;
            })

            right.addEventListener('click', () => {
                count++;
                count = count % items.length;
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = count * size;
            })
        },
        circleButton:function(wrapSlider, itemsSlider){
            const slider = document.querySelector(wrapSlider);
            const wrap = slider.querySelector('#wrap');
            const btn = slider.querySelectorAll('[data-slide]');
            const items = slider.querySelectorAll(itemsSlider);

            let size = items[0].offsetWidth;

            btn.forEach(item => item.addEventListener('click', (e) => {
                btn.forEach(i => i.classList.remove('active'));
                e.target.classList.add('active');
                
                wrap.style.scrollBehavior = 'smooth';
                wrap.scrollLeft = e.target.dataset.slide * size;
            }))
        }
    }
    grabSlider.init();

    const tab = {
        init:function(){
            this.clickTab();
        },
        clickTab:function(){
            const tabs = document.querySelectorAll('.tab__item');

            tabs.forEach(tab => tab.addEventListener('click', (e)=> {
                tabs.forEach(item => item.classList.remove('active'));
                e.target.classList.add('active');
            }))
        }
    }
    tab.init();

     //Start Copy 
     const wow = {
        init:function(){
            this.wowJS();
        },
        wowJS:function(){
            const items = document.querySelectorAll('.wow');

            options = {
                threshold: 0.7,                                             //qua 70% chiều cao của phần tử thực hiện active
                rootMargin: '0px 0px 0px 0px'                               //màn hình quét (100% 100%)
            }

            function wowEffect(entry){
                entry.style.visibility = 'visible';                         //hiển thị phần tử

                let animationName = entry.dataset.animate;                  //lấy tên animation
                let durations = entry.dataset.duration || 1;                //lấy thời gian thực hiện animation (mặc định là 1s)
                let timingFunction = entry.dataset.timing || 'ease-out';    //lấy kiểu thực hiện thời gian (mặc định là ease-out)
                let animationIterations = entry.dataset.type || 'forwards'; //lấy kiểu thực hiện animation (mặc định là forwards)
                let delays = entry.dataset.delay || 0;                      //lấy thời gian trễ (mặc định là 0)
                
                entry.style.animation = `${animationName} ${durations}s ${timingFunction} ${animationIterations} ${delays}s`;
            }

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {                            //khi phần tử không nằm trong viewport thì dừng function
                        return;
                    }
                    else {
                        wowEffect(entry.target);                            //chạy hàm wowEffect
                        observer.unobserve(entry.target);                   //sau khi chạy dừng quét màn hình phần tử đó
                    }
                })
            }, options)

            items.forEach(item => {
                item.style.visibility = 'hidden';                           //set ẩn mặc định cho phần tử
                observer.observe(item);                                     //thực hiện quét màn hình tất cả phần tử
            })
        }
    }
    wow.init();

    const counter = {
        init:function(){
            this.countUp();
        },
        countUp: function () {
            //Đếm lên 
            const items = document.querySelectorAll('[data-count]')
            let counter = 0;

            function countUp(item) {
                item.parentNode.classList.add('active');
                item.innerHTML = counter.toString();    //lấy giá trị max cần đếm
                counter++;
                if (counter < item.dataset.count) {     //kiểm tra khi đếm = max thì dừng lại
                    setTimeout(function () {
                        countUp(item);
                    }, 1)
                }
            }

            const options = {
                threshold: 1,
                rootMargin: "0px",
            };

            function pre(item) {
                item.classList.add('active');
            };

            const observer = new IntersectionObserver((entries) => {  //hiệu ứng cuộn chuột khi màn hình chứa phần tử đó
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    } else {
                        countUp(entry.target);
                        observer.unobserve(entry.target);
                    }
                })
            }, options);

            items.forEach(item => {
                observer.observe(item);
            })
        }
    }
    counter.init();
}