function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Add any other custom headers as needed
            },
          })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data); // Resolve the Promise with the response data
            })
            .catch(error => {
                reject(error); // Reject the Promise with any errors
            });
    });
}

fetchData('https://27e9-195-154-119-28.ngrok-free.app/hello').then(console.log).catch(console.error)

let elements = [...document.querySelectorAll('[data-crudui]')]
elements.forEach(el=>{
    // Define the double-click event handler function
const handleDoubleClick = (event) => {
    console.log('Double-clicked!', event.target);
    // Add your logic for handling the double-click event here
  };
  
  // Bind the double-click event handler to the element
  el.addEventListener('dblclick', handleDoubleClick);
  el.style.userSelect = 'none';
  el.style.cursor = 'pointer';
})