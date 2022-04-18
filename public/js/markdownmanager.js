markdow_input = document.querySelector("#Markdown");
markdow_show = document.querySelector("#markdownshow");
markdow_input.addEventListener("input", (e) => {
  // console.log(e.target.value);
  // updateMarkdown(e.target.value);
  debounce(updateMarkdown(e.target.value));
});

function debounce(callback, delay = 100) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

const updateMarkdown = debounce((text) => {
  const res = marked.parse(text);
  markdow_show.innerHTML = res;
  //   console.log(res);
  //   console.log(markdow_show);
});
