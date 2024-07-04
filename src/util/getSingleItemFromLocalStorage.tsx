const getSingleItemFromLocalStorage = (item: string) => {
  const storedUserData = localStorage.getItem("userData");
  const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

  return parsedUserData[item];
};

export default getSingleItemFromLocalStorage;
