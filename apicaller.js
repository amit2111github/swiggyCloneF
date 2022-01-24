const helper = {
  signInAndVerifyOTP: (phoneNumber, name, email, password, otp) => {
    return fetch(`http://localhost:5000/user/signup/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ phoneNumber, name, email, password, otp })
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
  },
  signup: (phoneNumber, name, email, password) => {
    return fetch(`http://localhost:5000/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ phoneNumber, name, email, password })
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err)
      })
  }
}
export default helper
