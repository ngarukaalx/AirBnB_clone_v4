// wait for DOM to load
$(document).ready(function () {
  const amenityId = [];
  const amenityCheckd = [];
  // declare a varible to store on where to listen
  const checked = $('input[type="checkbox"]');
  // listen to the changes on ech input checkbox
  checked.change((event) => {
    // if checked add name an id to amenityId[] and name to amenityCheckd
    if (event.target.checked) {
      amenityId.push($(event.target).parent().data('id'));
      amenityCheckd.push($(event.target).parent().data('name'));
    // else pop out if unchecked
    } else {
      const index = amenityId.indexOf($(event.target).parent().data('id'));
      amenityId.splice(index, 1);
      amenityCheckd.splice(index, 1);
    }
    // update h4 with new checked
    $('.amenities h4').text(amenityCheckd.join(', '));
  });
  // make a request using ajax in the background
  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    method: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
  // creates places loading from frontend
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({}),
    success: function (data) {
      $.each(data, function (i, currentPlace) {
        const articles = $('<article>');
        const titleBox = $('<div>').addClass('title_box');
        const title = $('<h2>').text(currentPlace.name);
        const price = $('<div>').addClass('price_by_night').text('$' + currentPlace.price_by_night);
        const info = $('<div>').addClass('information');
        const guest = $('<div>').addClass('max_guest').text(currentPlace.max_guest + ' Guests');
        const rooms = $('<div>').addClass('number_rooms').text(currentPlace.number_rooms + ' Rooms');
        const bathrooms = $('<div>').addClass('number_bathrooms').text(currentPlace.number_bathrooms + ' Bathrooms');
        const user = $('<div>').addClass('user').html('<b>Owner</b>: ' + currentPlace.first_name + ' ' + currentPlace.last_name);
        const desc = $('<div>').addClass('description').html(currentPlace.description);
        titleBox.append(title, price);
        info.append(guest, rooms, bathrooms);
        articles.append(titleBox, info, user, desc);
        $('.places').append(articles);
      });
    }
  });
});
