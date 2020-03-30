const ul = document.querySelector(".images");
const pager = document.querySelector(".links div");

let currentPage = 1;

//misc
pagerGenerate(1, 5, 1);
fetchImages(1);
function hookHandler(node) {
  for (child of node.children) {
    child.addEventListener("click", handleClick);
  }
}
//pager generator
function pagerGenerate(start, end, active) {
  let next = createNode("li");
  let previous = createNode("li");
  let node = document.createDocumentFragment();

  next.textContent = "Next";
  previous.textContent = "Previous";

  if (active <= 1) {
    previous.className = "disabled";
  } else {
    previous.dataset.page = active - 1;
  }

  if (active >= 50) {
    next.className = "disabled";
  } else {
    next.dataset.page = active + 1;
  }

  node.appendChild(previous);

  let pagerArray = [...Array(end + 1 - start).keys()].map(i => start + i);

  pagerArray.forEach(index => {
    let li = createNode("li");
    li.dataset.page = index;
    li.textContent = index;

    if (index == active) {
      li.className = "active";
    }

    node.appendChild(li);
  });

  node.appendChild(next);

  pager.innerHTML = "";
  pager.append(node);
  hookHandler(pager);
}

//utility functions
function fetchImages(start, limit = 10) {
  const url = `http://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=11`;
  console.log(url);
  fetch(url)
    .then(data => {
      return data.json();
    })
    .then(data => {
      ul.innerHTML = "";
      data.map(each => {
        let card = imageCard(each.url, each.title);
        append(ul, card);
      });
    });
}

//click handler
function handleClick(e) {
  let index = Number(e.target.dataset.page);
  if (currentPage == index) {
    return;
  } else {
    currentPage = index;
  }

  let start, end;
  if (index <= 3) {
    start = 1;
    end = 5;
  } else if (index + 2 >= 50) {
    start = 50 - 4;
    end = 50;
  } else {
    start = index - 2;
    end = index + 2;
  }
  ul.innerHTML = "loading...";

  fetchImages(index);
  pagerGenerate(start, end, index);
}

//helper functions
function createNode(tag) {
  return document.createElement(tag);
}

function append(parent, el) {
  return parent.appendChild(el);
}

function imageCard(imgSrc, caption) {
  let li = createNode("li");
  let figure = createNode("figure");
  let figcaption = createNode("figcaption");
  let img = createNode("img");

  img.setAttribute("src", imgSrc);
  figcaption.textContent = caption;

  append(figure, img);
  append(figure, figcaption);
  append(li, figure);

  return li;
}
