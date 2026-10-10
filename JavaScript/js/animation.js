function nextStep(step) {
    // Ihisha zose
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active');
    });
    // Erekana iyakurikiyeho
    document.getElementById('card' + step).classList.add('active');
}