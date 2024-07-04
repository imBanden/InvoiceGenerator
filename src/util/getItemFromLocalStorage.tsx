const getItemFromLocalStorage = () => {
  const storedUserData = localStorage.getItem("userData");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

  return parsedUserData;
};

export default getItemFromLocalStorage;
