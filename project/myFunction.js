function showTxt() {
    var nameField = document.getElementById("name").value;
    var identityField = document.getElementById("identity").value;
    var birthdayField = document.getElementById("birthday").value;
    var mobileField = document.getElementById("mobile").value;
    var emailField = document.getElementById("email").value;
    var rentTypeField = document.getElementById("rentType").value;
    var rentCountField = document.getElementById("rentCount").value;
  
    // Perform validation for required fields
    if (nameField.trim() === "") {
      alert("يرجى إدخال الاسم.");
      return;
    }
  
    if (identityField.trim() === "") {
      alert("يرجى إدخال رقم الهوية.");
      return;
    }
  
    if (birthdayField.trim() === "") {
      alert("يرجى إدخال تاريخ الميلاد.");
      return;
    }
  
    if (mobileField.trim() === "") {
      alert("يرجى إدخال رقم الموبايل.");
      return;
    }
  
    if (emailField.trim() === "") {
      alert("يرجى إدخال البريد الإلكتروني.");
      return;
    }
  
    if (rentTypeField.trim() === "") {
      alert("يرجى اختيار نوع الاجار.");
      return;
    }
  
    if (rentCountField.trim() === "") {
      alert("يرجى إدخال فترة الأجار.");
      return;
    }
  
    // If all required fields are filled, display the alert
    alert(
      "الاسم: " +
        nameField +
        "\n" +
        "رقم الهوية: " +
        identityField +
        "\n" +
        "الميلاد: " +
        birthdayField +
        "\n" +
        "الموبايل: " +
        mobileField +
        "\n" +
        "الإيميل: " +
        emailField +
        "\n" +
        "نوع الاجار: " +
        rentTypeField +
        "\n" +
        "فترة الأجار: " +
        rentCountField +
        "\n"
    );
  }
  
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("myCheckbox");
  const form = document.getElementById("contact_form");

  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      form.classList.remove("hidden");
    } else {
      form.classList.add("hidden");
    }
  });
});
function validateArabicInput(input) {
  const arabicRegex = /^[\u0600-\u06FF\s]+$/;
  const nameValidation = document.getElementById("name_validation");

  if (!arabicRegex.test(input.value)) {
    nameValidation.textContent = "يرجى إدخال أحرف عربية فقط.";
  } else {
    nameValidation.textContent = "";
  }
}
function validateIdentityInput(input) {
  const identityRegex = /^(0[1-9]|1[0-4])[0-9]{9}$/;
  const identityValidation = document.getElementById("identity_validation");

  if (!identityRegex.test(input.value)) {
    identityValidation.textContent =
      "يرجى إدخال رقم وطني صحيح (مثال: 01234567890).";
  } else {
    identityValidation.textContent = "";
  }
}
function validateMobileInput(input) {
  const mobileRegex = /^09[3-9][0-9]{7}$/;
  const mobileValidation = document.getElementById("mobile_validation");

  if (!mobileRegex.test(input.value)) {
    mobileValidation.textContent =
      "يرجى إدخال رقم موبايل صحيح (مثال: 0912345678).";
  } else {
    mobileValidation.textContent = "";
  }
}
function validateEmailInput(input) {
  const emailValidation = document.getElementById("email_validation");

  if (!input.validity.valid) {
    emailValidation.textContent = "يرجى إدخال عنوان بريد إلكتروني صحيح.";
  } else {
    emailValidation.textContent = "";
  }
}
