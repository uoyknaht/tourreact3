import $ from 'jquery';

class ApiService {

  get(url) {
    return new Promise((resolve) => {
      $.get(url, (response) => {
        resolve(response)
      });
    });
  }

  post() {

  }
  
}

export default new ApiService();
