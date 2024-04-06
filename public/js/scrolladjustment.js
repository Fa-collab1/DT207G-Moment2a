// Funktion för att scrolla nedåt på sidan med en mängd motsvarande -8vh
function scrollaNerMed5vh() {
    const headerHöjd = 0.08 * window.innerHeight;
    window.scrollBy(0, -headerHöjd);
}

// Lägg till händelselyssnare på alla länkar
document.addEventListener('DOMContentLoaded', function() {
    const länkar = document.querySelectorAll('a');
    länkar.forEach(länk => {
        länk.addEventListener('click', function(händelse) {
            // Förhindra standardlänkbeteende
            händelse.preventDefault();
            // Hämta målavsnittets ID från href-attributet
            const målId = länk.getAttribute('href').substring(1);
            // Scrolla till målavsnittet
            document.getElementById(målId).scrollIntoView();
            // Scrolla sidan nedåt med en mängd motsvarande -5vh
            scrollaNerMed5vh();
        });
    });
});
