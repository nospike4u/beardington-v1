export const renderProfile = async () => {
  const app = document.getElementById("app");
  app.innerHTML = "<p>Loading profile...</p>";
  try {
    console.log("Fetching user profile...");
    const response = await fetch(`/api/users/2`);
    console.log("Fetch response:", response);
    const userData = await response.json();
    console.log("User data:", userData);
    updateProfile(userData);
  } catch (error) {
    console.error("Profile fetch error:", error);
    app.innerHTML = `<p class="error">Failed to load profile: ${error.message}</p>`;
  }
};

const updateProfile = (user) => {
  const app = document.getElementById("app");
  if (!user || !user.id) {
    app.innerHTML = `
      <section class="profile-section">
        <h1>Your Profile</h1>
        <p>We could not find your profile!</p>
      </section>`;
    return;
  }
  app.innerHTML = `
  <section class="profile-section">
  <h1>Your Profile</h1>
  <div class="profile-card">
      <div>
        <img src="/assets/profile-icon-blue-background-512x512.png" alt="profile image" width="32">
      </div>
      <div>
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Billing Address:</strong> ${user.billing_address}</p>
      <p><strong>Shipping Address:</strong> ${user.shipping_address}</p>
      <!-- Add more fields as needed -->
      <button class="delete-btn" data-id="${user.id}">Delete Profile</button>
      </div>
      </div>  
    </section>
  `;
};

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const userId = e.target.dataset.id;
    const response = await fetch(`/api/users/2`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: 2 }),
    });
    if (response.ok) {
      alert("Profile deleted");
      // sign user out and put on product listings page.
    }
  }
});
