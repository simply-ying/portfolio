function init() {
    const btnDarkEl = document.getElementById('btnDark');

    btnDarkEl.addEventListener('click', () => {
        document.querySelector('body').classList.toggle('dark');
    });
}

init();