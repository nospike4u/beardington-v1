export const renderProfile = async () => {
  const app = document.getElementById("app");
  app.innerHTML = "<p>Loading profile...</p>";
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    updateProfile(userData);

    return `
      <div data-id="${userData.id}">
        <img src="${userData.name}" alt="${userData.name}" width="100">
        <div class="item-info">
          <h2>${userData.name}</h2>
        </div>
        <button class="delete-btn">Remove</button>
      </div>
    `;
  } catch (error) {
    app.innerHTML = `<p class="error">Failed to load profile: ${error.message}</p>`;
  }
};

const updateProfile = (userId) => {
  const app = document.getElementById("app");

  if (!userId || userId.length === 0) {
    app.innerHTML = `
      <section class="profile-section">
        <h1>Your Profile</h1>
        <p>We could not find your profile!</p>
      </section>`;
    return;
  }
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const userId = e.target.dataset.id;
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 1 }),
    });
    if (response.ok) {
      alert("Profile deleted");
      // sign user out and put on product listings page.
    }
  }

});
