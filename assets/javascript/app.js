
var categories = ['maru the cat', 'nicolas cage', 'jean luc picard', 'felix the cat', 'sean connery', 'arnold schwarzenegger'];

    $('#addcategory').on('click', function(){		
	var category = $('#gif-input').val().trim();
	   if(category ===""){
	       alert('You need to type in a category!!!');
	}else{
	   categories.push(category);
	}
	       renderButtons();
	           return false;
	});

	function renderButtons(){ 
	$('#categorybutton').empty();

		for (var i = 0; i < categories.length; i++){
			
		  var newButtons = $('<button>')
		  newButtons.addClass('gifs');  
		  newButtons.attr('data-name', categories[i]);
		  newButtons.text(categories[i]); 
		  
          $('#categorybutton').append(newButtons);
	}
	}

	function displayGifs() {
		$('#gifthumbs').empty();
        var category = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + category + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
            .done(function(response) {
               

                console.log(response)

        var results = response.data;
          
                for (var i = 0; i < results.length; i++) {
                    var categoryDiv =  $('<div>');
                    categoryDiv.attr('class', 'frame');

        var p = $('<p>').text("This Gif is rated: "+ results[i].rating);
        var categoryImage = $('<img>');
        categoryImage.attr('src', results[i].images.fixed_height_still.url);
        categoryImage.attr('class', 'categorySet');
        categoryImage.attr('data-animate', results[i].images.fixed_height.url);
        categoryImage.attr('data-still', results[i].images.fixed_height_still.url);
        categoryImage.attr('data-state', 'still');
        categoryDiv.append(p);
        categoryDiv.append(categoryImage);

                    $('#gifthumbs').append(categoryDiv);
                    }
             });
    };
	$(document).on('click', '.gifs', displayGifs);



    function startStopGif(){
	   var state = $(this).attr('data-state'); 
	   
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
            }
        
	    };

$(document).on('click', '.categorySet', startStopGif);   

renderButtons();