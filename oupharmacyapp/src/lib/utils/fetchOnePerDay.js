export function fetchOncePerDay(url, onDataLoaded) {
    return new Promise((resolve, reject) => {
      // Get the current date
      const today = new Date().toISOString().slice(0, 10);
  
      // Check if the last fetch was executed before today
      const lastFetchDate = localStorage.getItem("lastFetchDate");
      if (!lastFetchDate || lastFetchDate < today) {
        // Execute the fetch API
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // Save the fetched data
            localStorage.setItem("data", JSON.stringify(data));
  
            // Update the last fetch date
            localStorage.setItem("lastFetchDate", today);
            
            // Call the callback function with the fetched data
            onDataLoaded(data);

            // Resolve the promise with the fetched data
            resolve(data);
          })
          .catch((error) => reject(error));
      } else {
        // Get the data from localStorage
        const data = JSON.parse(localStorage.getItem("data"));

        // Call the callback function with the fetched data
        onDataLoaded(data);
        
        // Resolve the promise with the fetched data
        resolve(data);
      }
    });
  }