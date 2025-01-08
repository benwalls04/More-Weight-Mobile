/*

const signUp = async (username, password) => {
  if (validInput(username) && validInput(password)){
    try {
      // FIXME: dummy data
      const inputData = {};
      await axios.post('https://more-weight.com/new-user', {inputs: inputData, username: username, password: password}).then(response => {
        setRoutine(response.data);
        setUsername(username);
        setIsNew(false);
        setIsAuth(true);
        //navigate('/edit');
      })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return error.response.data.message
      } else {
        return "error";
      }
    }
  } else {
    return "please enter a valid username and password";
  }
}

*/