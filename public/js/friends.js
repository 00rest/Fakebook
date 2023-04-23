const showAllFriendsHandler = async () => {
    fetch("/api/users/all")
    .then((response) => {
        if (response.ok) {document.location.replace('/api/users/all')}   
    })
    .catch((err) => { console.log(err) });
};


// Following button functionality
const followingHandler = async (event) => {
    if (event) {
      const response = await fetch(`/follow`, {
        method: 'POST',
        body: JSON.stringify({ followee_user_id: event.user_id }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        alert(`${event.user_name} is followed`);
      } else {
        alert('Failed to follow user');
      }
    }
  };

  
  document.querySelector('#all-users').addEventListener('click', showAllFriendsHandler);
