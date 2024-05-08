export const getUser = (users, userId) => {
  if(users){
    let user = users.find((user) => user._id === userId);
    if(user)
      return user;
    else
      return undefined;
  }
};

export const renderUserEmail= (users, userId) => {
  let user = getUser(users, userId);
  if(user && user.email)
    return user.email;
  else
    return undefined;
};