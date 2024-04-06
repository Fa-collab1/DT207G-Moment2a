
// Funktion för att växla synligheten för dropdown-menyn
function växlaDropdown() {
    const dropdownContainerCopy = document.getElementById('dropdownContainerCopy');
    dropdownContainerCopy.classList.toggle('dold');
}

// Lägg till händelselyssnare när DOM-innehållet har laddats
document.addEventListener('DOMContentLoaded', function() {
    // Lägg till händelselyssnare för att klicka på knappen för att växla dropdown-menyn
    document.getElementById('dropdownToggle').addEventListener('click', växlaDropdown);
});
