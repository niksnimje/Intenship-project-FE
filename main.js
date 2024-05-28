

$(document).ready(function(){
    $("#flip").click(function(){
      $("#panel").slideToggle("slow");
    });
  });
  



  jQuery(document).ready(function($){
    //set animation timing
    var animationDelay = 5000,
      //loading bar effect
      barAnimationDelay = 5000,
      barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
      //letters effect
      lettersDelay = 500,
      //type effect
      typeLettersDelay = 150,
      selectionDuration = 5000,
      typeAnimationDelay = selectionDuration + 800,
      //clip effect 
      revealDuration = 600,
      revealAnimationDelay = 1500;
    
    initHeadline();
    
  
    function initHeadline() {
      //insert <i> element for each letter of a changing word
      singleLetters($('.cd-headline.letters').find('b'));
      //initialise headline animation
      animateHeadline($('.cd-headline'));
    }
  
    function singleLetters($words) {
      $words.each(function(){
        var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
        for (i in letters) {
          if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
          letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
        }
          var newLetters = letters.join('');
          word.html(newLetters).css('opacity', 1);
      });
    }
  
    function animateHeadline($headlines) {
      var duration = animationDelay;
      $headlines.each(function(){
        var headline = $(this);
        
        if(headline.hasClass('loading-bar')) {
          duration = barAnimationDelay;
          setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
        } else if (headline.hasClass('clip')){
          var spanWrapper = headline.find('.cd-words-wrapper'),
            newWidth = spanWrapper.width() + 10
          spanWrapper.css('width', newWidth);
        } else if (!headline.hasClass('type') ) {
          //assign to .cd-words-wrapper the width of its longest word
          var words = headline.find('.cd-words-wrapper b'),
            width = 0;
          words.each(function(){
            var wordWidth = $(this).width();
              if (wordWidth > width) width = wordWidth;
          });
          headline.find('.cd-words-wrapper').css('width', width);
        };
  
        //trigger animation
        setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
      });
    }
  
    function hideWord($word) {
      var nextWord = takeNext($word);
      
      if($word.parents('.cd-headline').hasClass('type')) {
        var parentSpan = $word.parent('.cd-words-wrapper');
        parentSpan.addClass('selected').removeClass('waiting');	
        setTimeout(function(){ 
          parentSpan.removeClass('selected'); 
          $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
        }, selectionDuration);
        setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);
      
      } else if($word.parents('.cd-headline').hasClass('letters')) {
        var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
        hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
        showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);
  
      }  else if($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
          switchWord($word, nextWord);
          showWord(nextWord);
        });
  
      } else if ($word.parents('.cd-headline').hasClass('loading-bar')){
        $word.parents('.cd-words-wrapper').removeClass('is-loading');
        switchWord($word, nextWord);
        setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
        setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
  
      } else {
        switchWord($word, nextWord);
        setTimeout(function(){ hideWord(nextWord) }, animationDelay);
      }
    }
  
    function showWord($word, $duration) {
      if($word.parents('.cd-headline').hasClass('type')) {
        showLetter($word.find('i').eq(0), $word, false, $duration);
        $word.addClass('is-visible').removeClass('is-hidden');
  
      }  else if($word.parents('.cd-headline').hasClass('clip')) {
        $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){ 
          setTimeout(function(){ hideWord($word) }, revealAnimationDelay); 
        });
      }
    }
  
    function hideLetter($letter, $word, $bool, $duration) {
      $letter.removeClass('in').addClass('out');
      
      if(!$letter.is(':last-child')) {
         setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);  
      } else if($bool) { 
         setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
      }
  
      if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
        var nextWord = takeNext($word);
        switchWord($word, nextWord);
      } 
    }
  
    function showLetter($letter, $word, $bool, $duration) {
      $letter.addClass('in').removeClass('out');
      
      if(!$letter.is(':last-child')) { 
        setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration); 
      } else { 
        if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
        if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
      }
    }
  
    function takeNext($word) {
      return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
    }
  
    function takePrev($word) {
      return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
    }
  
    function switchWord($oldWord, $newWord) {
      $oldWord.removeClass('is-visible').addClass('is-hidden');
      $newWord.removeClass('is-hidden').addClass('is-visible');
    }
  });



  let products = [];
  let products2 = [];
  let products3 = [];
  let products4 = [];
  
  document.addEventListener('DOMContentLoaded', () => {
      // Fetch products for the first row
      fetch('https://intenship-project-be.onrender.com/products')
          .then(response => response.json())
          .then(data => {
              products = data;
              displayProducts(products, 'products-container');
          })
          .catch(error => console.error('Error fetching products:', error));
  
      // Fetch products for the second row
      fetch('https://intenship-project-be.onrender.com/product_2')
          .then(response => response.json())
          .then(data => {
              products2 = data;
              displayProducts(products2, 'products-container-2');
          })
          .catch(error => console.error('Error fetching products:', error));
  
      // Fetch products for the third row
      fetch('https://intenship-project-be.onrender.com/product_3')
          .then(response => response.json())
          .then(data => {
              products3 = data;
              displayProducts(products3, 'products-container-3');
          })
          .catch(error => console.error('Error fetching products:', error));
  
      // Fetch products for the fourth row
      fetch('https://intenship-project-be.onrender.com/product_4')
          .then(response => response.json())
          .then(data => {
              products4 = data;
              displayProducts(products4, 'products-container-4');
          })
          .catch(error => console.error('Error fetching products:', error));
  
      // Add event listeners for sorting
      document.getElementById('sort-asc').addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Sorting Low to High');
          sortProducts('asc');
      });
  
      document.getElementById('sort-desc').addEventListener('click', (e) => {
          e.preventDefault();
          console.log('Sorting High to Low');
          sortProducts('desc');
      });
  });
  
  function displayProducts(products, containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = products.map(product => createProductHTML(product, containerId)).join('');
  }
  
  function createProductHTML(product, containerId) {
      const { id, title, image, hoverImage, price, founder, category } = product;
      return `
      <a class="a-all-product" href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&hoverImage=${encodeURIComponent(hoverImage)}">
          <div class="product" onmouseover="changeImage('${containerId}-img-${id}', '${hoverImage}')" onmouseout="changeImage('${containerId}-img-${id}', '${image}')">
              <img id="${containerId}-img-${id}" src="${image}" alt="${title}">
              <div class="product1-con">
                  <h3>${title}</h3>
                  <p>Price: £ ${price}</p>
                  <a href="" class="Addtocard ms-4" id="Add_TO_Cart22">Add To Bag</a>
              </div>
          </div>
      </a>
      `;
  }
  
  

  let addtocart = document.getElementById("cart-page1")
  addtocart.addEventListener("click",(e)=>{
    e.preventDefault()
    alert("Ho Gya Hai !!")
  })



  function changeImage(imgId, newSrc) {
      const img = document.getElementById(imgId);
      img.src = newSrc;
  }
  
  function sortProducts(order) {
      const allProducts = [...products];
      if (order === 'asc') {
          allProducts.sort((a, b) => a.price - b.price);
      } else if (order === 'desc') {
          allProducts.sort((a, b) => b.price - a.price);
      }
  
      console.log('Sorted Products:', allProducts);
  
      // Display sorted products in respective containers
      displayProducts(allProducts.slice(0, products.length), 'products-container');
      
  }
  