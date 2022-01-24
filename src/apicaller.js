import { API } from './config'
console.log(API, 'is API')
export const signup = (phoneNumber, name, email, password) => {
  return fetch(`${API}/user/signup`, {
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

export const getFood = (token) => {
  return fetch(`${API}/restaurant/food`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const getHotel = () => {
  if (typeof window === 'undefined') return false
  return JSON.parse(window.localStorage.getItem('hotel'))
}
export const setHotel = (hotel) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('hotel', JSON.stringify(hotel))
}

export const getFoodById = (id) => {
  return fetch(`${API}/restaurant/food/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const getcartItem = () => {
  if (typeof window === 'undefined') return false
  return JSON.parse(window.localStorage.getItem('cart'))
}
export const addInCart = (food) => {
  if (typeof window === 'undefined') return
  const item = getcartItem() || []
  let alredayOrderd = false
  item.forEach((curfood) => {
    if (curfood._id === food._id) {
      alredayOrderd = true
    }
  })
  if (!alredayOrderd) {
    item.push({ ...food, qty: 1 })
  }
  window.localStorage.setItem('cart', JSON.stringify(item))
}

export const isFoodInCart = (food) => {
  const cartItem = getcartItem()
  if (!cartItem || cartItem.length === 0) return false
  let isPresent = false
  cartItem.forEach((curItem) => {
    if (food._id === curItem._id) isPresent = true
  })
  return isPresent
}

export const increaseQuantity = (food) => {
  const cartItem = getcartItem()
  cartItem.forEach((curfood) => {
    if (food._id === curfood._id) {
      curfood.qty += 1
    }
  })
  window.localStorage.setItem('cart', JSON.stringify(cartItem))
}

export const decreaseQuantity = (food) => {
  let cartItem = getcartItem()
  cartItem = cartItem.filter((curfood) => {
    if (food._id === curfood._id) {
      curfood.qty -= 1
    }
    if (curfood.qty !== 0) return curfood
  })
  window.localStorage.setItem('cart', JSON.stringify(cartItem))
}

export const getFoodQtyInCart = (food) => {
  const cartItem = getcartItem()
  if (!cartItem) return 0
  const curFood = cartItem.find((curfood) => curfood._id === food._id)
  if (!curFood) return 0
  return curFood.qty
}

export const getUser = () => {
  if (typeof window === 'undefined') return false
  if (!window.localStorage.getItem('user')) return false
  return JSON.parse(window.localStorage.getItem('user'))
}

export const getCurrentLocation = () => {
  if (typeof window === 'undefined') return
  if (!window.localStorage.getItem('Coordinates')) return
  return JSON.parse(window.localStorage.getItem('Coordinates'))
}

export const setUserCoordinates = (coords) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem('Coordinates', JSON.stringify(coords))
}
export const getUserCoordinates = () => {
  if (typeof window === 'undefined') return
  return JSON.parse(window.localStorage.getItem('Coordinates'))
}

export const getDeliveryLocation = () => {
  if (typeof window === 'undefined') return false
  if (!window.localStorage.getItem('deliveryLocation')) return false
  return JSON.parse(window.localStorage.getItem('deliveryLocation'))
}

export const setDeliveryLocation = (location) => {
  let locations = getDeliveryLocation() || []
  if (!locations) locations = []
  let alreadyExist = false
  locations.forEach((curlocation) => {
    if (curlocation.lat === location.lat && curlocation.long === location.long)
      alreadyExist = true
  })
  if (alreadyExist) return
  locations.push({ ...location, opted: false })
  window.localStorage.setItem('deliveryLocation', JSON.stringify(locations))
}

export const setDeliveryCoorrd = (coords) => {
  window.localStorage.setItem('deliveryCoords', JSON.stringify(coords))
}
export const getDeliveryCoorrd = (coords) => {
  if (typeof window === 'undefined') return false
  return JSON.parse(window.localStorage.getItem('deliveryCoords'))
}

export const createPayment = (amount, token, userId) => {
  return fetch(`${API}/razor/order/${userId}/${amount}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const makeOrder = (
  razorpayPaymentId,
  orderid,
  razorpaySignature,
  cartItem,
  userId,
  order,
  token
) => {
  console.log('USER ID IS ', userId)
  return fetch(`${API}/razor/createOrder/${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      cartItem,
      razorpayPaymentId,
      orderid,
      razorpaySignature,
      order
    })
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const getOrder = (userId, token) => {
  return fetch(`${API}/user/order/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}

export const getHotelDetails = (hotelId) => {
  return fetch(`${API}/restaurant/address/${hotelId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err))
}
