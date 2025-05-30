const LINK_GOOGLE_AVIS = "https://search.google.com/local/writereview?placeid=ChIJk7lYVgcvjEcRU3hWKJlSMjk";
const SCRIPT_URL      = "https://script.google.com/macros/s/AKfycbyI7TskOreDLZkAmwa71CdJcwXQTb8K_lowkXAaP-PIsyz3i39QMGW_3cKGqPyoAn16Dw/exec";

const stars          = document.querySelectorAll('.star');
const ratingSection  = document.getElementById('ratingSection');
const commentSection = document.getElementById('commentSection');
const thankyouSection= document.getElementById('thankyouSection');
const submitBtn      = document.getElementById('submitComment');
const commentInput   = document.getElementById('comment');

let selectedRating = 0;

stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = +star.dataset.value;
    stars.forEach(s => s.classList.toggle('selected', +s.dataset.value <= selectedRating));
    if (selectedRating === 5) {
      setTimeout(() => window.location.href = LINK_GOOGLE_AVIS, 300);
    } else {
      ratingSection.classList.add('fade-out');
      setTimeout(() => {
        ratingSection.style.display = 'none';
        commentSection.style.display = 'block';
        requestAnimationFrame(() => commentSection.classList.add('show'));
      }, 800);
    }
  });
});

submitBtn.addEventListener('click', () => {
  const comment = commentInput.value.trim();
  if (!comment) return alert('Écrivez un commentaire.');
  // Étape 3
  commentSection.classList.add('fade-out');
  setTimeout(() => {
    commentSection.style.display = 'none';
    thankyouSection.style.display = 'block';
    requestAnimationFrame(() => thankyouSection.classList.add('show'));
  }, 600);
  
  // Envoi du commentaire
  const data = new FormData();
  data.append('rating', selectedRating);
  data.append('comment', comment);
  fetch(SCRIPT_URL, { method:'POST', body:data, mode:'no-cors' });
});

