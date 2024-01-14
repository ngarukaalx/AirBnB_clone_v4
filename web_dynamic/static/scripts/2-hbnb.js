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
      if (data.status == 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});
