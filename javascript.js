//Create jquery to populate button function//
//add populatebuttons to reference jquery //

$(function () {
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("Page Loaded");
})
var searchArray = ['Dog', 'Cat', 'Bird'];
//.empty function to not repeat the buttons but to empty it evry time we create a new button//
//add type data to access the data type//
//Add .text to access text to add to the button//
function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);

    }
} 

//add jquery as reference to buttons//
//providing a query url//
//do a API call using ajax//
//create for loop to refrence through the data array//
//create reference to the div which needs to be modified//
//create variable called rating to give rating to the var that we will serach//
//create a variable p which is going to reference a paragraph tag//
//create 2 var, 1 for animated gifs and 1 for still gifs//
//crete var image to create reference to an image tag and modify it//
//add all the modifications to search div//
//add searchdiv to searches div within the html//
$(document).on('click','.searchButton',function(){
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=LlUbXVeu1i89scCgjxNvVObmq2FxlxrU&limit:10';
    $.ajax({url:queryURL,method:'GET'})
        .done(function(response){
            for(var i=0; i<response.data.length;i++){
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: '+rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');     
                image.attr('src',still);
                image.attr('data-still',still);
                image.attr('data-animated',animated);
                image.attr('data-state','still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);

            }

        })

})

//using jquery create a function to animate the images on click//
//inside the function create an if statement to let image be still or animate on click//
//add this.attr so that data-state is also animated//
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }

})

//using jquery create a function so that search button can add more searches//
//within the function create a new variable called newSearch//
//eq(0) grabs the first version  that is put in the submit button instead of just val(0)//
//add this to the searchArray//
//run populateButtons function again//

$('#search-form').on('click',function(e){
    e.preventDefault()
    
    var newSearch = $('input').eq(0).val();
  
    searchArray.push(newSearch);
    console.log(searchArray)
    populateButtons(searchArray,'searchButton','#buttonsArea');
   
})

