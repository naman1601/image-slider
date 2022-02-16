const images = ['./images/1.jpg', './images/2.jpg', './images/3.jpg'];

function Timer(fn, t) {
    var timerObj = setInterval(fn, t);

    this.stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }
        return this;
    }

    this.start = function () {
        if (!timerObj) {
            this.stop();
            timerObj = setInterval(fn, t);
        }
        return this;
    }

    this.reset = function (newT = t) {
        t = newT;
        return this.stop().start();
    }
}

let autoMove;

function moveToImage(index) {
    const activeImage = document.querySelector('.active-image');
    const activeNav = document.querySelector('.active-nav');

    activeImage.classList.remove('active-image');
    activeNav.classList.remove('active-nav');

    const nextImage = document.querySelector('#img' + index);
    const nextNav = document.querySelector('#nav' + index);

    nextImage.classList.add('active-image');
    nextNav.classList.add('active-nav');
}

function moveImage(direction) {
    const activeImage = document.querySelector('.active-image');
    const activeImageIndex = activeImage.dataset.index;
    const nextImageIndex = (parseInt(activeImageIndex) + direction + images.length) % images.length;
    moveToImage(nextImageIndex);
}

function createLeftArrow() {
    const leftArrowContainer = document.createElement('div');
    leftArrowContainer.classList.add('arrow-container');

    const leftArrow = document.createElement('img');
    leftArrow.src = './images/left.png';

    leftArrow.addEventListener('click', () => {
        moveImage(-1);
        autoMove.reset();
    });

    leftArrowContainer.appendChild(leftArrow);
    return leftArrowContainer;
}

function createRightArrow() {
    const rightArrowContainer = document.createElement('div');
    rightArrowContainer.classList.add('arrow-container');

    const rightArrow = document.createElement('img');
    rightArrow.src = './images/right.png';

    rightArrow.addEventListener('click', () => {
        moveImage(1);
        autoMove.reset();
    });

    rightArrowContainer.appendChild(rightArrow);
    return rightArrowContainer;
}

function createImages() {
    const imagesContainer = document.createElement('div');
    imagesContainer.classList.add('images-container');

    let imageIndex = 0;

    images.forEach(image => {
        const imageElement = document.createElement('img');
        imageElement.id = 'img' + imageIndex;
        imageElement.dataset.index = imageIndex;
        imageElement.src = image;
        imagesContainer.appendChild(imageElement);
        imageIndex++;
    });

    return imagesContainer;
}

function createContent() {
    const content = document.createElement('div');
    content.classList.add('content');
    content.appendChild(createLeftArrow());
    content.appendChild(createImages());
    content.appendChild(createRightArrow());
    return content;
}

function createNavBar() {
    const navBar = document.createElement('nav');
    navBar.classList.add('navbar');

    for(let i = 0; i < images.length; i++) {
        const navButton = document.createElement('div');
        navButton.classList.add('nav-button');
        navButton.dataset.index = i;
        navButton.id = 'nav' + i;

        navButton.addEventListener('click', () => {
            moveToImage(i);
            autoMove.reset();
        });

        navBar.appendChild(navButton);
    }

    return navBar;
}

function createContainer() {
    const container = document.createElement('div');
    container.classList.add('container');
    container.appendChild(createContent());
    container.appendChild(createNavBar());
    return container;
}

function startUp() {
    const main = document.querySelector('.main');
    main.appendChild(createContainer());
}

startUp();
document.querySelector('#img0').classList.add('active-image');
document.querySelector('#nav0').classList.add('active-nav');
autoMove = new Timer(() => {moveImage(1)} , 5000);
autoMove.start();