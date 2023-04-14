gsap.registerPlugin(Flip);

const links = document.querySelectorAll('.nav-item a');

const activeNav = document.querySelector('.active-nav');

links.forEach( (link) => {
    link.addEventListener('mouseover', () => {
        gsap.to(links, {color : '#white'});

        if(document.activeElement === link) 
        {
            gsap.to(link, {color : 'white'});
        }


        const state = Flip.getState(activeNav);
        link.appendChild(activeNav);
        Flip.from(state, {
            duration: 1.5,
            absolute: true,
            ease: 'elastic.out(1,0.5)',
        });

    });
});

const moonPath = "M18.5 27.5C18.5 42.6878 28 55 28 55C12.8122 55 0.5 42.6878 0.5 27.5C0.5 12.3122 12.8122 0 28 0C29.5 0 18.5 12.3122 18.5 27.5Z"

const sunPath = "M55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5Z"


const darkMode = document.querySelector('#darkMode');

let toggle = false;

darkMode.addEventListener('click', () => {
    const timeline = anime.timeline({
        duration : 750,
        easing : 'easeOutExpo'
    });
    timeline.add({
        targets: '.sun',
        d : [
            {value: toggle ? moonPath : sunPath}
        ]
    })
    .add({
        targets: '#darkMode',
        rotate: toggle ? 320 : 0
    }, '-= 350')
    .add({
        targets: 'main',
        backgroundColor: toggle ? 'rgb(0,0,0)' : 'rgb(255,255,255)',
        color: toggle ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
    }, '-=600')
    .add({
        targets: '#textchpt',
        color: toggle ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
    }, '-=600')
    .add({
        targets: '.footer a',
        color: toggle ? 'rgb(255,255,255)' : 'rgb(0,0,0)'
    }, '-=600')
    .add({
        targets: '.footer',
        borderTop: toggle ? 'solid white 1px' : 'solid black 1px'
    }, '-=600')
    .add({
        targets: '#chatgpttextphoto',
        borderTop: toggle ? 'solid white 1px' : 'solid black 1px'
    }, '-=600');
    if (!toggle)
    {
        toggle=true;
    }
    else
    {
        toggle=false;
    }
});

const text = document.querySelector('.vanillafancy');
const strText = text.textContent;

const splitText = strText.split('');
text.textContent = '';

for(let i = 0; i < splitText.length; i++)
{
    text.innerHTML += '<span>' + splitText[i] + '</span>';
}
let char = 0;
let timer = setInterval(onTick, 50);

function onTick(){
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char ++;
    if( char === splitText.length)
    {
        complete();
        return;
    }
}
function complete(){
    clearInterval(timer);
    timer = null;
}