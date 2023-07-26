
// is called to load the navigation bar into a html page
// code sourced from ChatGPT
function loadNav() {
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      const navContainer = document.getElementById('nav-container');
      navContainer.innerHTML = data;
    });
}


/* function is used to open/close small screen navigation menu
*/
function toggleNavBar() {
  var navBar = document.getElementById("nav");
  navBar.style.transition = "height 2s";
  
  // check if the screen is small by checking the display of nav
  if (navBar.style.display == "flex") {
    navBar.style.height = "94%";
    // timeout allows for height transitions to run
    setTimeout(function() {
      navBar.style.height = "0%";
    }, 100);
    setTimeout(function() {
      document.getElementById("nav").style.display = "none";
    }, 2000);
    document.getElementById("openNav").innerHTML = "OPEN";
  } else {
    navBar.style.height = "0%";
    setTimeout(function() {
      navBar.style.height = "94%";
    }, 100);
    
    document.getElementById("nav").style.display = "flex";
    document.getElementById("openNav").innerHTML = "CLOSE";
    
  }
}


// responsible for closing pop confirmtaion
function closeModal() {
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'none';
  modal.remove();
  window.location.href = "index.html";
}

// responsible for closing pop up error message
function errorCloseModal() {
  const modal = document.getElementById('confirmationModal');
  modal.remove();
}


// creates popup when booking 3 form is submitted
function showConfirmation(event) {
  event.preventDefault(); // Prevent form submission
  // Get form inputs
  const firstName = document.getElementById('fname').value;
  const lastName = document.getElementById('lname').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const frequency = document.getElementById('frequency').value;
  const length = document.getElementById('length').value;

  // sourced from GeeksForGeeks
  // Get selected tutor, subject, and location from URL
  const urlParams = new URLSearchParams(window.location.search);
  const selectedTutor = urlParams.get('tutor');
  const selectedSubject = urlParams.get('subjects');
  const selectedLocation = urlParams.get('location');

  // Create the content for the confirmation modal
  const modalContent = `
    <strong>First Name:</strong> ${firstName}<br>
    <strong>Last Name:</strong> ${lastName}<br>
    <strong>Contact Phone:</strong> ${phone}<br>
    <strong>Contact Email:</strong> ${email}<br>
    <strong>Session Frequency:</strong> ${frequency}<br>
    <strong>Session Length:</strong> ${length}<br><br>
    <strong>Selected Tutor:</strong> ${selectedTutor}<br>
    <strong>Selected Subject:</strong> ${selectedSubject}<br>
    <strong>Selected Location:</strong> ${selectedLocation}<br>
  `;
  // Update the modal content with the form inputs
  document.getElementById('modalContent').innerHTML = modalContent;

  // Display the confirmation modal
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'block';
}


// create and show confirmation pop-up for contact page form
function showMessageSent(event) {
  //event.preventDefault(); // Prevent form submission

  // Get form inputs
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Create the content for the confirmation modal
  const modalContent = `
    <strong> Name:</strong> ${name}<br>
    <strong>Contact Phone:</strong> ${phone}<br>
    <strong>Contact Email:</strong> ${email}<br>
    <strong>Message Sent:</strong> ${message}<br>
  `;
  // Update the modal content with the form inputs
  document.getElementById('modalContent').innerHTML = modalContent;

  // Display the confirmation modal
  const modal = document.getElementById('confirmationModal');
  modal.style.display = 'block';

}


/* This function allows users to see subpages in small screen navigation menu */
function showHiddenPages(idval) {
  const navDisplay = getComputedStyle(document.getElementById("nav")).flexDirection;
  //command only runs if the nav bar is in the small screenform
  if (navDisplay == "column") {
    var pageToShow = document.getElementById(idval);
    var goBackButton = document.createElement("button");
    goBackButton.textContent = "X";
    goBackButton.id = "goBackToMainNavMenu";
    goBackButton.style.width = "10%";
    goBackButton.style.marginLeft = "88%";
    goBackButton.onclick = () => goBack(idval);

    var firstChildOfPage = pageToShow.firstChild;
    pageToShow.insertBefore(goBackButton, firstChildOfPage);
    pageToShow.style.display = "flex";
    pageToShow.style.flexDirection = "column";
    pageToShow.style.position = "fixed";
    pageToShow.style.top = "0px";
    pageToShow.style.height = "100%";
    pageToShow.style.zIndex = "999999";
    pageToShow.style.backgroundColor = "#414BB2" ;
    pageToShow.style.transition = "width 2s";
    pageToShow.style.width = 0 + "%";
    setTimeout(function() {
      pageToShow.style.width = "100%";
    }, 100);
  } 
}

/*This function defines the action of the X button for the small 
  screen navigation bar. It allows users to move from the subpage 
  view back to whole navigation menu view*/ 
function goBack(idval) {
  var pageToShow = document.getElementById(idval);
  pageToShow.style.width = "94%";
  setTimeout(function() {
    pageToShow.style.width = "0%";
  }, 100);
  setTimeout(function() {
    pageToShow.style.display = "none";
  }, 1500);
  //delete the goBack Button
  pageToShow.removeChild(pageToShow.firstChild);
}


// function can be called to generate an error pop-up on any page
function showPopUpErrorMessage(message, errorTitle) {
  var modal = document.createElement("div");
  modal.id = 'confirmationModal';
  modal.classList.add("modal");

  // Display the confirmation modal
  modal.style.display = 'block';

  // Create the content for the confirmation modal
  const modalContent = `
  <div class="modal-content">
    <h2>${errorTitle}</h2>
    <p id="modalContent">${message}</p>
    <button type="button" onclick="errorCloseModal()">Close</button>
  </div>
  `;
  // Update the modal content with the form inputs
  modal.innerHTML = modalContent;

  document.body.appendChild(modal);

}
