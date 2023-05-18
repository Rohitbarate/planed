// import messageBox from "./messageBox/MessageBox";
const baseUrl = process.env.BASE_URL || 'https://todoapp-api-16rf.onrender.com/data/v1';

const registerNewUser = async user => {
  console.log(user);
  const newUser = {
    name: user.fName + ' ' + user.lName,
    email: user.email,
    mobileNo: user.mobileNo,
    photo: user.photo,
    password: user.password,
    provider: user.provider,
  };
  try {
    let response = await fetch(`${baseUrl}/user/register`, {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });

    let data = await response.json();
    console.log(data);
    // alert(JSON.stringify(data.message));
    return data;
  } catch (error) {
    console.log('frontend err', error);
  }
};

const loginUser = async user => {
  console.log(user);

  try {
    const res = await fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('token', data.token);
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.log('frontend err : ', error);
  }
};

const getUser = async user => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {message: {type: 'danger', msg: 'login to access this page..!'}};
  }
  const res = await fetch(`${baseUrl}/user/profile`, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'Auth-token': token,
    },
  });
  const data = await res.json();
  // console.log("token", data.user);
  return data;
};
const findUser = async user => {
  const res = await fetch(`${baseUrl}/user/finduser`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      // "Auth-token": token,
    },
  });
  const data = await res.json();
  console.log('found user : ', data.user);
  return data;
};

export {registerNewUser, loginUser, getUser, findUser};
