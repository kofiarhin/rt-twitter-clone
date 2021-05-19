const follow = (currentUser, user) => {

    if(!currentUser.following) {

        currentUser.following = [];

        currentUser.following.push(user.id);

    } else {

                currentUser.following.push(user.id)
    }

    return currentUser;

}
export {
    follow
}