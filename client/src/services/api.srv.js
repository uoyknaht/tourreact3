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

  delete(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
          url: url,
          type: 'DELETE',
          success: () => {
              resolve();
          },
          error: () => {
            reject();
          }
      });
    });
  }

}

export default new ApiService();
