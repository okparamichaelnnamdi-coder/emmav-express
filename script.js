// EMMAV Express interactive demonstration features.
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');
document.getElementById('trackButton').addEventListener('click', () => {
  const reference = trackingInput.value.trim().toUpperCase();
  if (!reference) {
    trackingResult.textContent = 'Please enter a tracking number.';
    return;
  }
  if (reference !== 'EMX-2048' && !reference.startsWith('EMX-')) {
    trackingResult.textContent = 'Reference not recognised. Try the demo number EMX-2048.';
    return;
  }
  trackingResult.innerHTML = `<strong>Sample tracking: ${reference}</strong><ol><li>Booking received</li><li>Package processed</li><li>In transit</li><li>Delivered (sample status)</li></ol><small>This is a demonstration timeline, not live tracking.</small>`;
});

function makeReference(prefix) {
  return prefix + '-' + Math.floor(1000 + Math.random() * 9000);
}
document.getElementById('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const reference = makeReference('EMX');
  document.getElementById('bookingMessage').textContent =
    `Sample booking created. Your demonstration reference is ${reference}. No courier has been dispatched.`;
  form.reset();
});

document.getElementById('partnerForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  document.getElementById('partnerMessage').textContent =
    `Thank you. Your sample partnership enquiry reference is ${makeReference('PART')}. This enquiry was not sent.`;
  form.reset();
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  document.getElementById('contactFormMessage').textContent =
    'Your form entries passed browser validation. This demonstration does not send or store your message.';
  form.reset();
});

function calculateEstimate() {
  const distance = Number(document.getElementById('distance').value);
  const sizeFactor = Number(document.getElementById('calcSize').value);
  const serviceFactor = Number(document.getElementById('calcService').value);
  const output = document.getElementById('estimateValue');
  if (!Number.isFinite(distance) || distance < 1 || distance > 2000) {
    output.textContent = 'Enter 1–2000 km';
    return;
  }
  // Illustrative classroom formula: base fee + distance charge, adjusted by size and service.
  const estimate = Math.round((1000 + distance * 100) * sizeFactor * serviceFactor / 100) * 100;
  output.textContent = '₦' + estimate.toLocaleString('en-NG');
}
document.getElementById('calculateButton').addEventListener('click', calculateEstimate);
['distance', 'calcSize', 'calcService'].forEach(id =>
  document.getElementById(id).addEventListener('change', calculateEstimate)
);
document.getElementById('year').textContent = new Date().getFullYear();
calculateEstimate();
