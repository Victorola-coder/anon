"use client";

function SaveUserToState({ user }: { user: User }) {
  if (user && typeof window !== "undefined")
    localStorage.setItem(user.username, JSON.stringify(user));
  return null;
}

export default SaveUserToState;
