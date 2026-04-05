window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const mainElement = document.getElementById("movie-list");

    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);

      for (const movie of movies) {
        const movieCard = document.createElement("article");
        movieCard.className = "movie-card";
        movieCard.id = movie.imdbID;

        if (movie.Poster) {
          const img = document.createElement("img");
          img.src = movie.Poster;
          img.alt = "Poster von " + movie.Title;
          img.className = "movie-poster";
          movieCard.appendChild(img);
        }

        const infoSection = document.createElement("div");
        infoSection.className = "movie-info";

        const header = document.createElement("header");
        const title = document.createElement("h2");
        title.textContent = movie.Title;
        header.appendChild(title);
        infoSection.appendChild(header);

        const details = document.createElement("section");
        details.className = "movie-details";

        let genresArray = Array.isArray(movie.Genres) ? movie.Genres : (movie.Genre ? movie.Genre.split(", ") : []);
        let directorsStr = Array.isArray(movie.Directors) ? movie.Directors.join(", ") : (movie.Director || "");
        let actorsStr = Array.isArray(movie.Actors) ? movie.Actors.join(", ") : (movie.Actors || "");

        details.innerHTML = `
          <p><strong>Veröffentlicht:</strong> ${movie.Released}</p>
          <p><strong>Dauer:</strong> ${movie.Runtime} min</p>
          <div class="genres-wrapper">
              <strong>Genres:</strong> 
              ${genresArray.map(genre => `<span class="genre-badge">${genre.trim()}</span>`).join("")}
          </div>
          <p><strong>Regie:</strong> ${directorsStr}</p>
          <p><strong>Darsteller:</strong> ${actorsStr}</p>
        `;
        infoSection.appendChild(details);

        const plotSection = document.createElement("section");
        const plotText = document.createElement("p");
        plotText.className = "movie-plot";
        plotText.textContent = movie.Plot;
        plotSection.appendChild(plotText);
        infoSection.appendChild(plotSection);

        const ratings = document.createElement("aside");
        ratings.className = "movie-ratings";
        ratings.innerHTML = `
          <div class="ratings-info">
            <p><strong>IMDb:</strong> ${movie.imdbRating}</p>
            <p><strong>Metascore:</strong> ${movie.Metascore}</p>
          </div>
        `;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit Movie";
        editButton.className = "btn-edit";
        editButton.onclick = function() {
          location.href = `edit.html?imdbID=${movie.imdbID}`;
        };

        ratings.appendChild(editButton);
        infoSection.appendChild(ratings);
        movieCard.appendChild(infoSection);
        mainElement.appendChild(movieCard);
      }
    } else {
      mainElement.append("Fehler beim Laden der Daten.");
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};