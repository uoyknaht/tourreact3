import $ from 'jquery';

class ApiService {

  get(url) {
    return new Promise((resolve) => {
      $.get(url, (response) => {
        resolve(response)
      });
    });
  }

  post(url, data) {
    return new Promise((resolve, reject) => {
      $.post({
          url: url,
          data: data,
          // dataType: 'json',
          //contentType: 'application/x-www-form-urlencoded',
          success: (response) => {
              resolve(response);
          },
          error: () => {
            reject();
          }
      });
    });
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
