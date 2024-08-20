// Get modal element
const modal = document.getElementById("myModal");
// Get open modal button
const openModalBtn = document.getElementById("openModalBtn");
// Get close button
const closeBtn = document.getElementsByClassName("close")[0];

// Listen for open click
openModalBtn.addEventListener("click", function() {
    modal.style.display = "block";
});

// Listen for close click
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Listen for outside click
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
