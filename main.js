//form / input variables
const form = document.getElementById("form");
const enterName = document.getElementById("name");
const enterEmail = document.getElementById("email");
const enterPhone = document.getElementById("phone");
const enterCompany = document.getElementById("company");
const submit = document.querySelector(".btn-signup");

// membership / dropdown menu
const membership = document.querySelector(".membership");
const membershipHeader = document.querySelector(".membership__header");
const membershipDropdown = document.querySelector(".membership__dropdown");
const membershipItems = document.querySelectorAll(".membership__item");
const timerCardWrapper = document.querySelector(".timer-card__wrapper");
const accent = document.querySelector(".accent");

//countdown timer
function updateTimer() {
  // offset date from future to current
  const futureDate = Date.parse("Nov 4, 2022 01:30:00");
  const currentDate = new Date();
  const offSetDate = futureDate - currentDate;

  // convert into days
  let days = Math.floor(offSetDate / (1000 * 60 * 60 * 24));
  let hours = Math.floor(offSetDate / (1000 * 60 * 60));
  let mins = Math.floor(offSetDate / (1000 * 60));
  let secs = Math.floor(offSetDate / 1000);

  let d = days;
  let h = hours - days * 24;
  let m = mins - hours * 60;
  let s = secs - mins * 60;

  timerCardWrapper.innerHTML = ` <div class="timer-card">
         <h3 class="countdown">${d}<span class="time">Days</span></h3>
        </div> 
        <div class="timer-card">
          <h3 class="countdown">${h}<span class="time">Hours</span></h3>
       </div> 
        <div class="timer-card">
          <h3 class="countdown">${m}<span class="time">Min</span></h3>
       </div> 
        <div class="timer-card">
         <h3 class="countdown">${s}<span class="time">Sec</span></h3>
        </div>`;
}

// const showDate = new Date().toUTCString().slice(5, 16);
// accent.innerHTML = showDate.innerHTML;

setInterval("updateTimer()", 1000);

// membership / dropdown menu
membershipHeader.addEventListener("click", (_) => {
  if (!membership.classList.contains("selected")) {
    membership.classList.add("selected");
    membershipDropdown.style.height = `${membershipDropdown.scrollHeight}px`;
  } else if (membership.classList.contains("selected")) {
    membership.classList.remove("selected");
    membershipDropdown.style.height = null;
  }
});

membershipItems.forEach((membershipItem) => {
  membershipItem.addEventListener("click", (_) => {
    if (membershipItem.classList.contains("checked")) {
      membershipItem.classList.remove("checked");
    } else {
      membershipItems.forEach((membershipItem) =>
        membershipItem.classList.remove("checked")
      );
      membershipItem.classList.add("checked");
    }
    membershipHeader.innerHTML = membershipItem.innerHTML;
  });
});

function check() {
  if (checkInputs() === true) {
    submitForm();
  }
}

// form
submit.addEventListener("click", check(e));
e.preventDefaults();

function checkInputs() {
  const nameValue = enterName.value.trim();
  const emailValue = enterEmail.value.trim();
  const phoneValue = enterPhone.value.trim();
  const companyValue = enterCompany.value.trim();

  if (nameValue === "") {
    addErrorMsg(enterName);
  } else {
    removeErrorMsg(enterName);
  }

  if (!validateEmail(emailValue)) {
    addErrorMsg(enterEmail);
  } else {
    removeErrorMsg(enterEmail);
  }

  if (phoneValue === "") {
    addErrorMsg(enterPhone);
  } else {
    removeErrorMsg(enterPhone);
  }

  if (companyValue === "") {
    addErrorMsg(enterCompany);
  } else {
    removeErrorMsg(enterCompany);
  }
}

function addErrorMsg(input) {
  input.classList.add("error");
}

function removeErrorMsg(input) {
  input.classList.remove("error");
}

function validateEmail(validateValue) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    validateValue
  );
}

function submitForm(queryType) {
  document.getElementById("activeDropdown").value = queryType;
  document.getElementById("form").submit();
}
