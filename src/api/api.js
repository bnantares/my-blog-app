import axios from "axios";

export const postsAPI = {

  getPosts(limit = 3, skip = 0) {
    return axios.get(
      `https://cdn.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries?access_token=${process.env.REACT_APP_DELIVERY_API_KEY}&content_type=${process.env.REACT_APP_CONTENT_TYPE_KEY}&limit=${limit}&skip=${skip}`
    )
    .then((response) => response.data);
  },

  createPost(title, body) {

    const data = {
      fields: {
        title: {
          'en-US': title,
        },
        body: {
          'en-US': body,
        },
      },
    }

    return axios.post(
      `https://api.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries`,
      data,
      {
        headers: {
          authorization: `Bearer ${process.env.REACT_APP_CONTENT_API_KEY}`,
          'content-type':
            'application/vnd.contentful.management.v1+json',
          'X-Contentful-Content-Type': 'blogPost',
        },
      }
    )
  },


  publishPost(postId, contentfulVersion) {
    return axios.request({
      url: `https://api.contentful.com/spaces/${process.env.REACT_APP_SPACE_KEY}/environments/${process.env.REACT_APP_ENV_KEY}/entries/${postId}/published`,
      method: 'PUT',
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_CONTENT_API_KEY}`,
        'X-Contentful-Version': contentfulVersion,
      },
    })
  },

};
