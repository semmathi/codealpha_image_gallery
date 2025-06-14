const images = Array.from({ length: 12 }, (_, i) =>
  `https://via.placeholder.com/800x500?text=Image+${i + 1}`
);
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const imagesPerPage = 4;
let currentPage = 0;
let currentImageIndex = 0;

function renderGallery() {
  gallery.innerHTML = '';
  const start = currentPage * imagesPerPage;
  const end = start + imagesPerPage;
  const currentImages = images.slice(start, end);

  currentImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Image ${start + index + 1}`;
    img.onclick = () => openModal(start + index);
    gallery.appendChild(img);
  });

  document.getElementById('prevBtn').disabled = currentPage === 0;
  document.getElementById('nextBtn').disabled = end >= images.length;
}

function changePage(offset) {
  currentPage += offset;
  renderGallery();
}

function openModal(index) {
  currentImageIndex = index;
  modalImage.src = images[currentImageIndex];
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function navigate(offset) {
  currentImageIndex += offset;
  if (currentImageIndex < 0) currentImageIndex = images.length - 1;
  if (currentImageIndex >= images.length) currentImageIndex = 0;
  modalImage.src = images[currentImageIndex];
}

// Close modal when clicking outside image
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

renderGallery();
