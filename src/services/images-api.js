function fetchImages(searchTerm, pageNumber) {
  const key = '20958387-96a830a6962a2a719bbaccdc5';
    
  return fetch(`https://pixabay.com/api/?q=${searchTerm}&page=${pageNumber}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`There are no images corresponding to ${searchTerm}`));
  });
}

const api = {
  fetchImages,
};

export default api;