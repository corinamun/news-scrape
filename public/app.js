// grab articles in json form
$.getJSON("/articles", function(data) {
  // each individual one
  for (var i = 0; i < data.length; i++) {
    // display info
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#comments").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The headline of the article
      $("#comments").append("<h2>" + data.headline + "</h2>");
      // An input to enter a new headline
      $("#comments").append("<input id='headlineinput' name='headline' >");
      // A textarea to add a new comment
      $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

      // If there's a comment in the article
      if (data.comment) {
        // Place the title of the note in the title input
        $("#headlineinput").val(data.comment.headline);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savecomment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      headline: $("#headlineinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // when this is done
    .done(function(data) {
      // log response
      console.log(data);
      // empty comments section
      $("#comments").empty();
    });

  // remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
