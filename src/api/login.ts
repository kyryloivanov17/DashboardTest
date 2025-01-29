// export const fetchLogin = () => {
//     const url =
//       "http://ec2-52-23-205-94.compute-1.amazonaws.com:3000/api/auth/login"; // API endpoint
//     const data = {
//       email: "user@example.com",
//       password: "password123",
//     }; 
//     fetch(url, {
//       method: "POST", 
//       headers: {
//         "Content-Type": "application/json", 
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data?.access_token) {
//           return data?.access_token
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error); 
//       });
//   };

  export const fetchLogin = async () => {
    const url =
    "http://ec2-52-23-205-94.compute-1.amazonaws.com:3000/api/auth/login"; // API endpoint
  const data = {
    email: "user@example.com",
    password: "password123",
  }; 
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error('Failed to create post');
    return res.json(); // Return the created post data
  };