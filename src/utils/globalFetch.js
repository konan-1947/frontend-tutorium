// // file: src/utils/globalFetch.js
// (function () {
//     const originalFetch = window.fetch;
  
//     window.fetch = async function (url, options = {}) {
//       const response = await originalFetch(url, {
//         ...options,
//         credentials: "include", // Để gửi cookie khi gọi API
//       });
  
//       if (response.status === 401) {
//         window.location.href = "/login"; // Chuyển hướng toàn bộ ứng dụng khi gặp lỗi 401
//         return Promise.reject(new Error("Unauthorized"));
//       }
  
//       return response;
//     };
//   })();