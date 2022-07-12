const baseUrl = '/api/Tag';

export const getAllTags = () => {
    return fetch(baseUrl)
    .then((res)=> res.json())
}

export const addTag = (tag) => {
    return fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });
  };

  export const updateTag = (tag) => {
    return fetch(`${baseUrl}/edit/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag),
    });
  };

  export const deleteTag = (tagId) => {
    return fetch(`${baseUrl}/${tagId}`, {
      method: "DELETE",
      header: {
        "Content-Type": "application/json",
      }
    });
  };

  export const getTag = (id) => {
    return fetch(`${baseUrl}/${id}`)
    .then((res)=> res.json())
 
  }