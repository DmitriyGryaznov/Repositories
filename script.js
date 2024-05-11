let userInput = document.querySelector('.userinput');
let output = document.querySelector('.output');
const autocompleteDropdown = document.querySelector('.autocompleteDropdown');
let newElem=document.querySelector('.outputs')
let searchQuery;
let arr;
let getArr;
let fiveItems;

//debounce
const debounce = (fn, debounceTime) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, debounceTime);
  };
};

//fetch
async function ask() {
  searchQuery = userInput.value;
  if (searchQuery.trim() === '') {
    autocompleteDropdown.innerHTML = '';
    return;
}
  let url = `https://api.github.com/search/repositories?q=${searchQuery}`;
  let fetched = await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      arr = data;
      console.log(arr);
    })
    .then((arr) => {
      return arr;
    })
    .catch((error) => {
      console.log(error);
    });

  
  autocompleteDropdown.innerHTML = '';
  fiveItems = arr.items.slice(0,5)
  fiveItems.forEach(item => {
    const suggestion = document.createElement('div');
    suggestion.textContent = item.name;
    suggestion.classList.add('suggestion')
    suggestion.addEventListener('click', function() {
        userInput.value = '';
        autocompleteDropdown.innerHTML = '';
        let newDiv = document.createElement('div');
        newDiv.innerHTML = 'Name: '+item.name+'<br>Owner: '+item.owner.login+'<br>Stars: '+item.stargazers_count
        output.appendChild(newDiv);
        let closeButtonDiv = document.createElement('div');
        let closeButton = document.createElement('button');
        closeButton.classList.add('close-button')
        closeButton.innerHTML='&#x2715';
        closeButton.addEventListener('click', function(){
          newDiv.remove()
        })
        newDiv.appendChild(closeButtonDiv)
        closeButtonDiv.appendChild(closeButton);
        newDiv.classList.add('option')
    });
  autocompleteDropdown.appendChild(suggestion);})

  document.addEventListener('click', function(event) {
    if (event.target.closest('.autocompleteDropdown')) {
      autocompleteDropdown.innerHTML = '';
    }
});
  console.log(arr);
  getArr=function(){
   console.log(arr)
   return(arr);
  }

  console.log(arr)
  return (arr)
};


let debouncedAsk= debounce(ask, 1000);

userInput.addEventListener('input', debouncedAsk);
console.log(arr);




