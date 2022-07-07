function searchAll() {
  let input = $("#search-input").val();

  $.ajax({
    url: "http://omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "330a0fca",
      s: input,
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;
        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `<div class="col-md-4 col-lg-4 mb-2"><div class="card" ">
           <img src="` +
              data.Poster +
              `" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title">` +
              data.Title +
              `</h5>
             <p class="card-text">` +
              data.Year +
              `</p>
             <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="` +
              data.imdbID +
              `">See detail</a>
           </div>
         </div>
         </div>`
          );
        });
      } else {
        $("#movie-list").html(`<h1 class="text-center">` + result.Error + `</h1>`);
      }
    },
  });
}
$("#search-button").on("click", function () {
  $("#movie-list").html("");
  searchAll();
});
$("#search-input").on("keyup", function (e) {
  if (e.keyCode === 13) {
    $("#movie-list").html("");
    searchAll();
  }
});
$("#movie-list").on("click", ".see-detail", function () {
  const id = $(this).data("id");

  $.ajax({
    type: "get",
    url: "http://omdbapi.com",
    data: {
      apikey: "330a0fca",
      i: id,
    },
    dataType: "json",
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
          <div class="container-fluid">
            <div class="row">
                <div class="col-lg-4 col-md-4 col-sm-4">
                  <img src="` +
            movie.Poster +
            `" class="img-fluid" alt="" />
                </div>
                <div class="col-lg-8 col-md-8 col-sm-8">
                  <ul class="list-group">
                  <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3></li>
                  <li class="list-group-item">Date :` +
            movie.Released +
            `</li>
                  <li class="list-group-item">Durasi :` +
            movie.Runtime +
            `</li>
                  <li class="list-group-item">Genre :` +
            movie.Genre +
            `</li>
                  <li class="list-group-item">Actors :` +
            movie.Actors +
            `</li>
                  <li class="list-group-item">Penghargaan :` +
            movie.Awards +
            `</li>
                  </ul>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          `
        );
      } else {
      }
    },
  });
});
