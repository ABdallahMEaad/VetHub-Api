(function ($) {
  "use strict";

  $(document).ready(function() {
    $('select').niceSelect();
  });
  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });

$(document).ready(function() {
  $('select').niceSelect();
});

var review = $('.client_review_part');
if (review.length) {
  review.owlCarousel({
    items: 1,
    loop: true,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 5000,
    nav: false,
    smartSpeed: 2000,
  });
}

//------- Mailchimp js --------//  
function mailChimp() {
  $('#mc_embed_signup').find('form').ajaxChimp();
}
mailChimp();


}(jQuery));


// document.getElementById("login").addEventListener("submit" , function (event) {
//   event.preventDefault();
// })

var myHttp = new XMLHttpRequest();
async function Try() {
  let res = await fetch("http://vethub.runasp.net/api/Article/GetAllArticle" , {
    method:"GET", 
  });
  let soso = await res.json();
  console.log(soso);
}
  
Try()

document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  var formData = new FormData();
  var fileInput = document.getElementById('imageInput');
  var file = fileInput.files[0];
  formData.append('files', file, file.name);

  fetch('https://vethub-aimodel.onrender.com/predict/', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      var resultDiv = document.getElementById('result');
      var imageContainer = document.getElementById('image-container');
      var classificationResult = document.getElementById('classification-result');

      var img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.style.width = '256px';
      img.style.height = '256px';
      imageContainer.innerHTML = '';
      imageContainer.appendChild(img);

      classificationResult.innerHTML = '';
      data.forEach(item => {
          var div = document.createElement('div');
          div.innerHTML = `<strong>Name of the disease:</strong> ${item.predicted_class}<br>`;
          if (item.predicted_class !== "Normal") {
              div.innerHTML += `<strong>Cause:</strong> ${item.class_info.Cause}<br>`;
              div.innerHTML += `<strong>Symptoms:</strong> ${item.class_info.Symptoms}<br>`;
              div.innerHTML += `<strong>Transmission:</strong> ${item.class_info.Transmission}<br>`;
              div.innerHTML += `<strong>Prevention:</strong> ${item.class_info.Prevention}<br>`;
              div.innerHTML += `<strong>Treatment:</strong> ${item.class_info.Treatment}`;
          } else {
              div.innerHTML += `<strong></strong> ${item.class_info.Info}`;
          }
          classificationResult.appendChild(div);
      });
  })
  .catch(error => console.error('Error:', error));
});

