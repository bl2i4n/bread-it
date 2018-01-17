const headers = new Headers({
  'Authorization': 'jvg',
  'Content-Type': 'application/json'
});

const postHeaders = (data) => {
  return {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  };
};

export const fetchCategories = () => {
  return fetch(`http://localhost:3002/categories`, {headers})
    .then((res) => res.json())
    .then(({categories}) => categories);
};

export const fetchCategoryPosts = (category) => {
  return fetch(`http://localhost:3002/${category}/posts`, {headers})
    .then((res) => res.json());
};

export const fetchPosts = () => {
  return fetch(`http://localhost:3002/posts`, {headers})
    .then((res) => res.json());
};

export const fetchPostByID = (id) => {
  return fetch(`http://localhost:3002/posts/${id}`, {headers})
    .then((res) => res.json());
};

export const fetchPostComments = (id) => {
  return fetch(`http://localhost:3002/posts/${id}/comments`, {headers})
    .then((res) => res.json());
};

export const sendScoreUpdate = (id, type, option) => {
  const data = {option: option};
  return fetch(`http://localhost:3002/${type}/${id}`, postHeaders(data))
    .then((res) => res.json());
};

export const sendNewPost = (data) => {
  return fetch(`http://localhost:3002/posts`, postHeaders(data))
    .then((res) => res.json());
};
