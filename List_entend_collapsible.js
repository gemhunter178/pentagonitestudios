// collapsibles, following example on https://www.w3schools.com/howto/howto_js_collapsible.asp
var collapseList = document.getElementsByClassName('listCollapsible');
for (let i = 0; i < collapseList.length; i++) {
  collapseList[i].addEventListener('click', function () {
    this.classList.toggle('listActive');
    let content = this.nextElementSibling;
    while (content && !content.classList.contains('listHover')) {
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.style.padding = '0 18px';
        content.style.borderBottom = '0';
      } else {
        content.style.maxHeight = content.scrollHeight * 2 + "px";
        content.style.padding = '8px 18px';
        content.style.borderBottom = '1px solid #ddd';
      }
      content = content.nextElementSibling;
    }
  });
}