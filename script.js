// NEW: Initialize Firebase Auth
const auth = firebase.auth();

// NEW: Add the listener that checks for login status
auth.onAuthStateChanged(user => {
  if (user) {
    // --- USER IS LOGGED IN ---
    console.log("User is logged in:", user.email);

    const videos = [
      { id: "1", title: "Learn HTML in 10 Minutes", videoId: "UB1O30fR-EE", channel: "Web Dev Simplified", views: "1.2M", time: "1 month ago" },
      { id: "2", title: "CSS Crash Course for Beginners", videoId: "yfoY53QXEnI", channel: "Traversy Media", views: "500K", time: "3 weeks ago" },
      { id: "3", title: "JavaScript Tutorial for Beginners", videoId: "W6NZfCO5SIk", channel: "freeCodeCamp", views: "10M", time: "1 year ago" },
      { id: "4", title: "Responsive Web Design Tutorial 2024", videoId: "srvUrASNj0s", channel: "Design Hub", views: "25K", time: "5 days ago" },
      { id: "5", title: "Flexbox in CSS Explained Simply", videoId: "JJSoEo8JSnc", channel: "Web Dev Simplified", views: "80K", time: "2 months ago" },
      { id: "6", title: "CSS Grid Crash Course", videoId: "jV8B24rSN5o", channel: "Traversy Media", views: "300K", time: "6 months ago" },
      { id: "7", title: "JavaScript ES6 Features", videoId: "NCwa_xi0Uuc", channel: "Programming with Mosh", views: "1.3M", time: "8 months ago" },
      { id: "8", title: "VS Code Tips & Tricks 2025", videoId: "fnPhJHN0jTE", channel: "TechWorld", views: "150K", time: "2 weeks ago" },
      { id: "9", title: "React Crash Course 2025", videoId: "w7ejDZ8SWv8", channel: "Traversy Media", views: "4M", time: "2 years ago" },
      { id: "10", title: "Build a Portfolio Website", videoId: "xV7S8BhIeBo", channel: "Kevin Powell", views: "900K", time: "1 year ago" },
      { id: "11", title: "Python in 100 Seconds", videoId: "x7X9w_GIm1s", channel: "Fireship", views: "2.2M", time: "11 months ago" },
      { id: "12", title: "C Programming Full Course", videoId: "KJgsSFOSQv0", channel: "freeCodeCamp", views: "4.8M", time: "2 years ago" },
      { id: "13", title: "Java Full Course 2025", videoId: "GoXwIVyNvX0", channel: "Bro Code", views: "1.1M", time: "4 months ago" },
      { id: "14", title: "SQL Crash Course", videoId: "HXV3zeQKqGY", channel: "freeCodeCamp", views: "700K", time: "1 year ago" },
      { id: "15", title: "Git & GitHub for Beginners", videoId: "RGOj5yH7evk", channel: "freeCodeCamp", views: "3M", time: "2 years ago" },
      { id: "16", title: "AI Tools Every Developer Should Know", videoId: "C8v1dX_t8Z8", channel: "Tech With Tim", views: "95K", time: "1 week ago" },
      { id: "17", title: "Tailwind CSS Full Tutorial", videoId: "dFgzHOX84xQ", channel: "Traversy Media", views: "400K", time: "3 months ago" },
      { id: "18", title: "How the Internet Works", videoId: "7_LPdttKXPc", channel: "Code.org", views: "2.8M", time: "3 years ago" },
      { id: "19", title: "Understanding APIs in 10 Minutes", videoId: "GZvSYJDk-us", channel: "Fireship", views: "1.5M", time: "9 months ago" },
      { id: "20", title: "Top Programming Languages 2025", videoId: "yT6W0Wy8pYk", channel: "Tech Trends", views: "80K", time: "5 days ago" }
    ];

    let likedVideos = JSON.parse(localStorage.getItem("likedVideos")) || [];
    let watchLater = JSON.parse(localStorage.getItem("watchLater")) || [];

    // Attach functions to 'window' to make them global
    window.loadVideos = function(filter = "home") {
      const feed = document.getElementById("video-feed");
      feed.innerHTML = "";
      
      document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove('active'));
      const activeLi = document.querySelector(`.sidebar li[data-filter="${filter}"]`);
      if (activeLi) activeLi.classList.add('active');

      let list = videos;
      if (filter === "liked") list = videos.filter(v => likedVideos.includes(v.id));
      if (filter === "watchLater") list = videos.filter(v => watchLater.includes(v.id));

      if (list.length === 0) {
        let message = "No videos to show.";
        if (filter === "liked") message = "You haven't liked any videos yet.";
        if (filter === "watchLater") message = "You have no videos in your Watch Later list.";
        feed.innerHTML = `<p class="no-videos-message">${message}</p>`;
        return;
      }

      list.forEach(v => {
        const card = document.createElement("div");
        const isLiked = likedVideos.includes(v.id);
        const isSaved = watchLater.includes(v.id);
        card.className = "video-card";
        
        card.innerHTML = `
          <div class="video-thumb">
            <a href="https://www.youtube.com/watch?v=${v.videoId}" target="_blank">
              <img src="https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg" alt="${v.title}">
            </a>
          </div>
          <div class="video-info">
            <h4>
              <a href="https://www.youtube.com/watch?v=${v.videoId}" target="_blank">
                ${v.title}
              </a>
            </h4>
            <p class="channel">${v.channel}</p>
            <p class="views-time">${v.views} views • ${v.time}</p>
            <div class="video-actions">
              <button class="like ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${v.id}')">❤️ Like</button>
              <button class="watchlater ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); toggleWatchLater('${v.id}')">⏰ Watch Later</button>
            </div>
          </div>`;
        feed.appendChild(card);
      });
    }

    window.toggleLike = function(id) {
      likedVideos = likedVideos.includes(id) ? likedVideos.filter(v => v !== id) : [...likedVideos, id];
      localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
      const activeFilter = document.querySelector(".sidebar li.active").dataset.filter;
      loadVideos(activeFilter);
    }

    window.toggleWatchLater = function(id) {
      watchLater = watchLater.includes(id) ? watchLater.filter(v => v !== id) : [...watchLater, id];
      localStorage.setItem("watchLater", JSON.stringify(watchLater));
      const activeFilter = document.querySelector(".sidebar li.active").dataset.filter;
      loadVideos(activeFilter);
    }

    window.searchVideos = function() {
      const q = document.getElementById("search").value.toLowerCase();
      const results = videos.filter(v => v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q));
      const feed = document.getElementById("video-feed");
      feed.innerHTML = "";

      document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove('active'));

      if (results.length === 0) {
        feed.innerHTML = `<p class="no-videos-message">No results for "${q}".</p>`;
        return;
      }

      results.forEach(v => {
        const card = document.createElement("div");
        const isLiked = likedVideos.includes(v.id);
        const isSaved = watchLater.includes(v.id);
        card.className = "video-card";
        
        card.innerHTML = `
          <div class="video-thumb">
            <a href="https://www.youtube.com/watch?v=${v.videoId}" target="_blank">
              <img src="https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg" alt="${v.title}">
            </a>
          </div>
          <div class="video-info">
            <h4>
              <a href="https://www.youtube.com/watch?v=${v.videoId}"
                ${v.title}
              </a>
            </h4>
            <p class="channel">${v.channel}</p>
            <p class="views-time">${v.views} views • ${v.time}</p>
            <div class="video-actions">
              <button class="like ${isLiked ? 'liked' : ''}" onclick="event.stopPropagation(); toggleLike('${v.id}')">❤️ Like</button>
              <button class="watchlater ${isSaved ? 'saved' : ''}" onclick="event.stopPropagation(); toggleWatchLater('${v.id}')">⏰ Watch Later</button>
            </div>
          </div>`;
        feed.appendChild(card);
      });
    }

    // This code now runs as soon as auth is confirmed.
    
    // 1. Load the videos first
    loadVideos("home");

    // 2. --- LOGOUT BUTTON LOGIC ---
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        auth.signOut().then(() => {
          console.log('User signed out');
          alert('You have been logged out.');
          // onAuthStateChanged will see the change and redirect
        }).catch(error => {
          console.error('Sign out error:', error);
        });
      });
    }
    // --- END OF LOGOUT LOGIC ---

  } else {
    // --- USER IS NOT LOGGED IN ---
    console.log("No user is logged in. Redirecting...");
    
    if (!window.location.pathname.endsWith('login.html')) {
      window.location.href = 'login.html';
    }
  }
});