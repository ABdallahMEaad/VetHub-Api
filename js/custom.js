// Questions Api
async function fetchQuestions() {
  try {
      const response = await fetch('http://vethub.runasp.net/api/Question/GetAllQuestions');
      const data = await response.json();
      
      const questionsContainer = document.getElementById('questions');
      questionsContainer.innerHTML = ''; // مسح أي محتوى سابق

      data.data.forEach((question) => {
          // تحويل التاريخ من سلسلة إلى كائن Date
          const date = new Date(question.dateOfCreation);

          // الحصول على التنسيق الطبيعي للتاريخ والوقت
          const formattedDate = date.toLocaleDateString();
          const formattedTime = date.toLocaleTimeString();

          questionsContainer.innerHTML += `
              <div class="question border border-primary rounded mb-5 bg-secondary">
                <h2 class="text-white w-50 mt-3 d-flex ml-3 " style="font-size: 16px;">${question.user.name}</h2>
                <p class="text-warning d-flex justify-content-end" style="font-size:12px;">${formattedDate}${formattedTime}</p>
                <p class="text-white" style="font-size: 20px; font-weight:bold;  text-align:center;">${question.content}</p>
              </div>`;
      });
  } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('questions').innerText = 'Error fetching data.';
  }
}
fetchQuestions();


// join us api
function submitJoinUs() {
  var nameInput = document.querySelector("#nameInput");
  var emailInput = document.querySelector("#emailInput");
  var phoneInput = document.querySelector("#phoneInput");
  var dobInput = document.querySelector("#dobInput");
  var genderSelect = document.querySelector("#genderSelect");
  var specializationInput = document.querySelector("#specializationInput");
  var fileInput = document.querySelector("#fileInput");
  
  // Ensure userId exists in localStorage
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (!userId) {
      alert("User ID not found. Please log in first.");
      return;
  }

  // Check if any field is empty
  if (!nameInput.value || !emailInput.value || !phoneInput.value || !specializationInput.value || !fileInput.files[0]) {
      alert("Please fill in all fields.");
      return;
  }

  if (genderSelect.value === "Male"){
    genderSelect = true
 }else{
   genderSelect = false
 }

  const formdata = new FormData();
  formdata.append("Name", nameInput.value);
  formdata.append("Email", emailInput.value);
  formdata.append("PhoneNumber", phoneInput.value);
  formdata.append("Gender", genderSelect.value);
  formdata.append("Specialization", specializationInput.value);
  formdata.append("CV", fileInput.files[0], fileInput.files[0].name);
  formdata.append("DateOfBirth", dobInput.value);

  const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow"
  };

  fetch(`http://vethub.runasp.net/api/Join/JoinUs?userId=${userId}`, requestOptions)
      .then(response => {
          if (!response.ok) {
              return response.text().then(text => { throw new Error(text) });
          }
          return response.json();
      })
      .then(result => {
          console.log(result);
          alert('Your application has been submitted successfully.');
      })
      .catch(error => {
          console.error('Error:', error);
      });
}

// Contact us api
(async function() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
await  fetch(`http://vethub.runasp.net/api/User/GetUserByEmail?email=${JSON.parse(localStorage.getItem("user")).email}`, requestOptions)
    .then((response) => response.json())
    .then((result) => localStorage.setItem("userId",result))
    .catch((error) => console.error(error));
}
)();
function submitForm() {
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    if (!name || !phone || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
  
    const formdata = new FormData();
    formdata.append("Email", email);
    formdata.append("Name", name);
    formdata.append("PhoneNumber", phone);
    formdata.append("Message", message);
  
    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
    };
  
  
    fetch(`http://vethub.runasp.net/api/ContactUs/AddContactUs?userId=${JSON.parse(localStorage.getItem("userId"))}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            alert('Your message has been sent successfully.');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error sending your message.');
        });
  }

//  Article api
async function fetchArticles() {
  try {
      const response = await fetch('http://vethub.runasp.net/api/Article/GetAllArticle');
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
          const articlesContainer = document.getElementById('articles');
          data.data.forEach((article, index) => {
              articlesContainer.innerHTML += `
                  <div class="blog">
                      <h3 class="text-primary mb-3 mt-2" style="font-size:30px">${article.title}</h3>
                      <a href="single-blog.html" onclick="showArticle(${index}); return false;">
                          <img class="mb-3" src="${article.imageUrl}" alt="">
                      </a>
                      <p class="mb-5" style="font-size: 20px; font-weight:bold">${article.description}</p>
                  </div>`;
          });
      } else {
          document.getElementById('articles').innerText = 'No articles found.';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('articles').innerText = 'Error fetching data.';
  }
}

function showArticle(index) {
  localStorage.setItem('selectedArticleIndex', index);
  window.location.href = 'single-blog.html';
}

fetchArticles();

// Single Article
async function fetchAndDisplayArticle() {
  try {
      const response = await fetch('http://vethub.runasp.net/api/Article/GetAllArticle');
      const data = await response.json();
      
      const selectedIndex = localStorage.getItem('selectedArticleIndex');
      if (data.data && selectedIndex !== null && selectedIndex < data.data.length) {
          const article = data.data[selectedIndex];
          
          document.getElementById('article').innerHTML = `
              <h2 class="h2sty">${article.title}</h2>
              <img class="imgsty" src="${article.imageUrl}" alt="">
              <p style="font-size: 35px; color: #414246; font-weight: bold;">${article.description.slice(0,50)}</p>
              <p style="font-size: 20px; color: #414246;">${article.content.split(".")[0]}</p>
              <p style="font-size: 20px; color: #414246;">${article.content.split(".")[1]}</p>
              <p style="font-size: 20px; color: #414246;">${article.content.split(".")[2]}</p>
              <p style="font-size: 20px; color: #414246;">${article.content.split(".")[3]}</p>
              <p style="font-size: 20px; color: #414246;">${article.content.split(".")[4]}</p>`;
      } else {
          document.getElementById('article').innerText = 'Article not found.';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('article').innerText = 'Error fetching data.';
  }
}
fetchAndDisplayArticle();

// Small Articles

async function fetchAndDisplayArticle() {
  try {
      const response = await fetch('http://vethub.runasp.net/api/Article/GetAllArticle');
      const data = await response.json();
      
      const selectedIndex = localStorage.getItem('selectedArticleIndex');
      if (data.data && selectedIndex !== null && selectedIndex < data.data.length) {
          const article = data.data[selectedIndex];
          
          // Convert timeOfArticle to Date object
          const timeOfArticle = new Date(article.timeOfArticle).toLocaleString();

          document.getElementById('article').innerHTML = `
            <h2 class="h2sty">${article.title}</h2>
            <img class="imgsty" src="${article.imageUrl}" alt="">
            <p class="text-dark mt-2 d-flex justify-content-end" style="font-size:15px">${timeOfArticle}</p>
            <p style="font-size: 35px; color: #414246; font-weight: bold;">${article.description.slice(0, 50)}</p>
            <p style="font-size: 20px; color: #414246;">${article.content.split(".")[0]}</p>
            <p style="font-size: 20px; color: #414246;">${article.content.split(".")[1]}</p>
            <p style="font-size: 20px; color: #414246;">${article.content.split(".")[2]}</p>
            <p style="font-size: 20px; color: #414246;">${article.content.split(".")[3]}</p>
            <p style="font-size: 20px; color: #414246;">${article.content.split(".")[4]}</p>`;
          
          // Display related articles
          const relatedArticlesContainer = document.getElementById('related-articles');
          relatedArticlesContainer.innerHTML = '';
          data.data.forEach((relatedArticle, index) => {
              if (index !== selectedIndex) { // Exclude the current article
                  const timeOfArticle = new Date(relatedArticle.timeOfArticle).toLocaleString();

                  relatedArticlesContainer.innerHTML += `
                      <div class="col-md-12 blog  w-50">
                        <div class="w-100">
                          <a href="#" onclick="showArticle(${index}); return false;">
                          <img class="w-100" src="${relatedArticle.imageUrl}" alt="">
                          </a>
                          <h3 class="text-primary mt-2" style="font-size:20px; font-weight:bold;">${relatedArticle.title}</h3>
                          <p class="text-dark mt-2 d-flex justify-content-end" style="font-size:15px">${timeOfArticle}</p>
                        </div>
                      </div>`;
              }
          });
      } else {
          document.getElementById('article').innerText = 'Article not found.';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('article').innerText = 'Error fetching data.';
  }
}

function showArticle(index) {
  localStorage.setItem('selectedArticleIndex', index);
  window.location.href = 'single-blog.html'; // إعادة توجيه إلى نفس الصفحة لعرض المقال الجديد
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayArticle);




// User Login and Logout Functions
function userLogin() {
  const user = localStorage.getItem("user");
  if (user) {
    document.getElementById("loginLink").classList.add("d-none");
    document.getElementById("logoutLink").classList.add("d-block");
    const userName = JSON.parse(user).displayName;
    const span = document.getElementById("welcomeMessage");
    span.classList.add("d-block");
    span.innerHTML = `Welcome, ${userName}`;
  }
}
function userLogout() {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userHistory");
    document.getElementById("loginLink").classList.add("d-block");
    document.getElementById("logoutLink").classList.remove("d-block");
    const span = document.getElementById("welcomeMessage");
    span.classList.remove("d-block");
    span.innerHTML = '';
    location.href = "index.html"
  }
}
userLogin();

// Login API Call
document.getElementById("login").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const email = formData.get('Email');
  const password = formData.get('Password');

  // Validate email and password
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  let isValid = true;

  if (!email) {
    emailError.textContent = "Email is required";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (!password) {
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (!isValidPassword(password)) {
    passwordError.textContent = "Wrong Password";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // Apply error styles to input fields if validation fails
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!isValid) {
    emailInput.parentElement.classList.add("error");
    passwordInput.parentElement.classList.add("error");
  } else {
    emailInput.parentElement.classList.remove("error");
    passwordInput.parentElement.classList.remove("error");

    try {
      const response = await fetch("http://vethub.runasp.net/api/Accounts/Login", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to sign in. Please check your credentials and try again.");
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error while signing in:", error.message);
      // You can display an error message to the user here if needed
    }
  }
});
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return passwordRegex.test(password);
}

// Form Validation for Sign Up
const registerBtn = document.getElementById('register');
registerBtn.addEventListener('click', () => {
  container.classList.add("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup");

  const name = document.getElementById("name");
  const nameError = document.getElementById("name_error");

  const email = document.getElementById("email");
  const emailError = document.getElementById("email_error");

  const phone = document.getElementById("phone");
  const phoneError = document.getElementById("phone_error");

  const password = document.getElementById("pass");
  const passwordError = document.getElementById("password_error");

  const rePassword = document.getElementById("repass");
  const rePasswordError = document.getElementById("repassword_error");


  // Validation functions
  const showError = (input, message) => {
    input.nextElementSibling.innerHTML = message;
    input.nextElementSibling.style.color = 'red';
  };

  const clearError = (input) => {
    input.nextElementSibling.innerHTML = '';
  };

  const validateNotEmpty = (input, message) => {
    if (input.value.trim() === '') {
      showError(input, message);
      return false;
    } else {
      clearError(input);
      return true;
    }
  };

  const validatePattern = (input, pattern, message) => {
    if (!pattern.test(input.value)) {
      showError(input, message);
      return false;
    } else {
      clearError(input);
      return true;
    }
  };

  const validateEquality = (input1, input2, message) => {
    if (input1.value !== input2.value) {
      showError(input2, message);
      return false;
    } else {
      clearError(input2);
      return true;
    }
  };

  // Real-time validation on keyup
  name.addEventListener("keyup", () => {
    validateNotEmpty(name, 'Name is required');
  });

  email.addEventListener("keyup", () => {
    validatePattern(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is incorrect');
  });

  phone.addEventListener("keyup", () => {
    validatePattern(phone, /^(010|011|012|015)\d{8}$/, 'Phone should start with 010, 011, 012, or 015');
  });

  password.addEventListener("keyup", () => {
    validatePattern(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{3,}$/, 'Password should have a lowercase letter, an uppercase letter, a number, and a special character');
  });

  rePassword.addEventListener("keyup", () => {
    validateEquality(password, rePassword, 'Passwords do not match');
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateNotEmpty(name, 'Name is required')) valid = false;
    if (!validatePattern(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is incorrect')) valid = false;
    if (!validatePattern(phone, /^(010|011|012|015)\d{8}$/, 'Phone should start with 010, 011, 012, or 015')) valid = false;
    if (!validatePattern(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{3,}$/, 'Password should have a lowercase letter, an uppercase letter, a number, and a special character')) valid = false;
    if (!validateEquality(password, rePassword, 'Passwords do not match')) valid = false;

    if (valid) {
      const formData = new FormData();
      formData.append("Name", name.value);
      formData.append("Email", email.value);
      formData.append("Phone", phone.value);
      formData.append("Password", password.value);
      formData.append("RePassword", rePassword.value);

      try {
        const response = await fetch("http://vethub.runasp.net/api/Accounts/Register", {
          method: "POST",
          body: formData,
          redirect: "follow"
        });

        if (response.ok) {
          window.location.href = "Sign.html";
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  });
});

// join us as a doctr
document.getElementById('doctorForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  
  try {
    const response = await fetch('http://vethub.runasp.net/api/Join/JoinUs', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    const responseData = await response.json();
    // يمكنك إضافة رمز هنا لتوجيه المستخدم بناءً على الاستجابة من الـ API
    console.log('Data submitted successfully:', responseData);
  } catch (error) {
    console.error('Error submitting data:', error);
  }
});
function submited() {
  alert("We are very pleased to have you join the VetHub team and benefit from your experience, We will review your data and contact you as soon as possible.")
  location.href = "#join us"
}

// loading screen
$(document).ready(function(){
  $(".spinner").fadeOut(1000,function(){
    $(".loading").remove()
    $("body").css("overflow-y","auto")
  })
})

