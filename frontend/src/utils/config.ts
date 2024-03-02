export const apiUrl = 'http://localhost:3000';
export const headers = {
  'Content-Type': 'application/json',
  authorization: localStorage.getItem('jwt')
};
