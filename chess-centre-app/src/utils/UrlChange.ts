export const searchQuery = (currentQuery, newQuery) => {
  const params = new URLSearchParams(currentQuery);
  if(newQuery) {
    for(const [key, value] of Object.entries(newQuery)) {
      params.set(key, value);
    }
  }
  for(let [key, value] of params) {
    if(!value || value === "undefined") {
      params.delete(key);
    }
  }
  return params.toString();
 
};

