const endPoint = 'https://opentdb.com/api_token.php?command=request';
const getToken = async () => {
  try {
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  } catch (err) {
    return 'erro';
  }
};

export default getToken;
