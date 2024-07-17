

function FetchCountries() {
    return fetch(import.meta.env.VITE_API_KEY, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Auth-Key": import.meta.env.VITE_API_AUTH_KEY,
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {  // .catch block to handle fetch errors
        console.error('Fetch error:', err);
        throw err;
      });
  }
  
  export default FetchCountries;
  