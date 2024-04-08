// Funktion för att scrolla nedåt på sidan en liten bit efter en navigeringslänks mål är nått
function scrollaNer() {
    const headerHöjd = 0.08 * window.innerHeight;
    window.scrollBy(0, -headerHöjd);
}

// Lägg till händelselyssnare på alla länkar
document.addEventListener('DOMContentLoaded', function() {
    const länkar = document.querySelectorAll('.nav-links a');
    länkar.forEach(länk => {
        länk.addEventListener('click', function(händelse) {
            // Förhindra standardlänkbeteende
            händelse.preventDefault();
            // Hämta målavsnittets ID från href-attributet
            const målId = länk.getAttribute('href').substring(1);
            // Hämta målavsnittet
            const målElement = document.getElementById(målId);
            // Scrolla till målavsnittet
            if (målElement) {
                målElement.scrollIntoView();
                // Scrolla sidan nedåt med en mängd motsvarande -5vh
                scrollaNer();
            }
        });
    });
});
