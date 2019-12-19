(function() {

    let style = document.getElementById('theme');
    let themeButtons = document.querySelectorAll('.theme');

    style.href = `css/${window.localStorage.getItem('theme') || 'light'}.css`;

    for (let tb of themeButtons) {
        tb.addEventListener('click', function() {
            let theme = tb.dataset.theme;
            window.localStorage.setItem('theme', theme);
            style.href = `css/${theme}.css`;
        })
    }

})();
