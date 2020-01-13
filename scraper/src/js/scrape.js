function response(document_root) {
  var html = '',
    node = document_root.firstChild;

  while (node) {
    switch (node.nodeType) {
    case Node.ELEMENT_NODE:
      // create temp container
      var div = document_root.createElement('div')
      div.innerHTML = node.outerHTML
      
      // get all '<script>' elements
      var elements = div.getElementsByTagName('script');
      
      // remove all '<script>' elements
      while (elements[0])
        elements[0].parentNode.removeChild(elements[0])

      // append content without '<script>' elements
      html += div.innerHTML;
      break;
      
    case Node.TEXT_NODE:
      html += node.nodeValue;
      break;
      
    case Node.CDATA_SECTION_NODE:
      html += '<![CDATA[' + node.nodeValue + ']]>';
      break;
      
    case Node.COMMENT_NODE:
      html += '<!--' + node.nodeValue + '-->';
      break;
      
    case Node.DOCUMENT_TYPE_NODE:
      html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
      break;
    }

    node = node.nextSibling;
  }
  
  return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: response(document)
});
