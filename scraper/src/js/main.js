window.onload = onWindowLoad;

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    $('#content').append(request.source);
    $('#content a').bind("click.myDisable", function() { return false; });
  }
  
  $('#content').on('mouseover', (event) => {
    //tag = $(event.target);
    //$('#selectors').text(tag.prop('tagName').toLowerCase() + ':' + tag.attr('class'));
  });
  
  $(document).on('mousedown', (event) => {
    tag = $(event.target);

    if (event.which == 1) {
      $('#selectors').append('<li class="list-group-item">' + tag.prop('tagName').toLowerCase() + ':' + tag.attr('class') + '</li>');
    }
  });

});

function onWindowLoad() {
  var message = document.querySelector('#message');
  var response = $('#response')

  chrome.tabs.executeScript(null, {
    file: "/src/js/scrape.js"
  }, function() {
    if (chrome.runtime.lastError) {
      $('#content').text('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });

}
