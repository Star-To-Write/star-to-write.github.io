const menuToggle = document.getElementById('menuToggle');         // Hamburger menu button
const navMenu = document.getElementById('navMenu');               // Main navigation menu container
const submissionsToggle = document.getElementById('submissionsToggle'); // "Submissions" dropdown trigger
const subsList = document.getElementById('subsList');             // Submissions dropdown list
const overlay = document.getElementById('overlay');               // Screen overlay for mobile menu


// pressing hamburger menu
menuToggle.addEventListener('click', () => {
  // Toggle hamburger "active" state and menu visibility
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('show');

  // Ensure submissions dropdown is closed when main menu toggles
  if (subsList.classList.contains('show')) {
    subsList.classList.remove('show');
  }

  // Show or hide overlay depending on menu state
  if (navMenu.classList.contains('show')) {
    overlay.classList.remove('d-none');
  } else {
    overlay.classList.add('d-none');    
  }
});


// Submissions submenu
submissionsToggle.addEventListener('click', (e) => {
  e.preventDefault(); // prevent javascript from being naughty naughty
  subsList.classList.toggle('show');
});


overlay.addEventListener('click', () => {
  overlay.classList.add('d-none');   // Hide overlay
  navMenu.classList.remove('show');  // Hide main menu
  subsList.classList.remove('show'); // Hide submissions dropdown
  menuToggle.classList.remove('active'); // Reset hamburger icon
});

// yes i know this is janky, yes i know there must be a better way, i did this at 3am and i woke up at 6am the day before <3
const navbar = document.querySelector('.nav-scroll');
let scrollThreshold = 200; // scroll distance before auto-hide kicks in
let lastScroll = 0;        // tracks last scroll position

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  // If near the top of the page, always show navbar
  if (currentScroll < scrollThreshold) {
    navbar.classList.remove('nav-hidden');
    lastScroll = currentScroll;
    return;
  }

  // Hide navbar when scrolling down
  if (currentScroll > lastScroll) {
    navbar.classList.add('nav-hidden');

  // Show navbar when scrolling up
  } else if (currentScroll < lastScroll) {
    navbar.classList.remove('nav-hidden');
  }

  // Update last scroll position
  lastScroll = currentScroll;
});


// Helper: slugify title to create URL-friendly string
function slugify(text) {
  return text.toLowerCase()
    .replace(/\s+/g, '-')         // spaces to dash
    .replace(/[^\w-]/g, '')       // remove special chars except dash
    .replace(/--+/g, '-')         // collapse multiple dashes
    .replace(/^-+|-+$/g, '');     // trim dashes from start/end
}

// I dont't believe there will be a situation where we need to agg. all the posts
// TODO: feel free to refactor it, this is the best i can think of
async function getSubmissionsByType(type) {
  // const res = await fetch(`/api/getSubmissionsByType?type=${type}`)
  // console.log(res)
  // const data =  await res.json();
  // console.log(data)
  return [
    {
      "id": 4,
      "title": "Test Submission",
      "content": "This is a test submission content.",
      "submission_type": "poetry",
      "disclaimer": "This is a test disclaimer.",
      "author": "John Doe",
      "author_instagram": null,
      "author_bio": null,
      "created_at": "2025-08-11T07:52:17.314Z",
      "comments": []
    },
    {
      "id": 1,
      "title": "The Dawn of Spring",
      "content": "<p>This is a beautiful poem about spring.</p>",
      "submission_type": "poetry",
      "disclaimer": null,
      "author": "Jane Doe",
      "author_instagram": "@jane_doe",
      "author_bio": "Jane Doe is a writer.",
      "created_at": "2025-08-01T07:44:43.266Z",
      "comments": [
        {
          "id": 1,
          "subs_id": 1,
          "parent_id": null,
          "author": "Alice",
          "content": "Beautiful poem! Really loved the imagery.",
          "created_at": "2025-08-02T07:44:43.569Z"
        },
        {
          "id": 2,
          "subs_id": 1,
          "parent_id": null,
          "author": "Bob",
          "content": "Makes me feel hopeful.",
          "created_at": "2025-08-03T07:44:43.569Z"
        },
        {
          "id": 3,
          "subs_id": 1,
          "parent_id": 1,
          "author": "Jane Doe",
          "content": "Thank you so much, Alice!",
          "created_at": "2025-08-04T07:44:43.877Z"
        },
        {
          "id": 4,
          "subs_id": 1,
          "parent_id": 1,
          "author": "Charlie",
          "content": "I agree with Alice.",
          "created_at": "2025-08-04T07:44:43.877Z"
        }
      ]
    }
  ]
}

function parsePath() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  return {
    subType: parts[0] || null,
    slug: parts[1] || null
  };
}

// subType = submission type (listed in the api index if you wish to know)
async function renderSubmissions() {
  const { subType, slug } = parsePath();
  // fetch the submissions
  const postData = await getSubmissionsByType(subType)

  const list = document.getElementById('subs-list')
  console.log(list)
  list.innerHTML = ''; // Clear existing list
  // TODO: add the middle link then slug /poetry/slug
  postData.forEach(post => {
    const slug = slugify(post.title);
    console.log("Generating post for slug:", slug, "with data:", post)
    const postDiv = document.createElement('div')
    postDiv.innerHTML= `
            <span class="pe-3">${new Date(post.created_at).toLocaleDateString()}</span><span><a href="/${subType}/${slug}" class="post-link">${post.comments.length} COMMENTS</a></span>
        <h2 class="fs-4"><a href="/${subType}/${slug}" class="post-link">${post.title}</a></h2>
        <div class="text-center desc">
          <p>
            ${post.content}
          </p>
        </div>
        <div>
          <h3 class="heading fs-4 mt-3">AUTHOR</h3>
          <p class="fw-bold desc">
            ${post.author}<br />${post.author_instagram} on Instagram
          </p>
          <h3 class="heading fs-4 mt-3">AUTHOR BIO</h3>
          <p class="desc">
            ${post.author_bio || 'No bio available.'}
          </p>
        </div>
        <div class="fs-6 pb-4">
          <span class="pe-3"><a href="/${subType}/${slug}" class="post-link">${post.comments.length} COMMENTS</a></span><i class="bi bi-share"></i
          ><span class="ps-2">SHARE</span>
        </div>
    
    `;
    list.appendChild(postDiv)
  });

  document.querySelectorAll('.post-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      history.pushState({}, '', link.getAttribute('href'))
      renderView();
    })
  })
}

async function renderOnePost() {
  const { subType, slug } = parsePath();
  const postData = await getSubmissionsByType(subType)

  const post = postData.find(p => slugify(p.title) === slug)

  if (!post) {
    document.getElementById('sub-view').innerHTML = "<p>Post not found.</p>"
    return
  }

  document.getElementById('sub-view').innerHTML = `
            <span class="pe-3">${new Date(post.created_at).toLocaleDateString()}</span><span>${post.comments.length} COMMENTS</span>
        <h2 class="fs-4"><a href="/${subType}/${slug}" class="post-link">${post.title}</a></h2>
        <div class="text-center desc">
          <p>
            ${post.content}
          </p>
        </div>
        <div>
          <h3 class="heading fs-4 mt-3">AUTHOR</h3>
          <p class="fw-bold desc">
            ${post.author}<br />${post.author_instagram} on Instagram
          </p>
          <h3 class="heading fs-4 mt-3">AUTHOR BIO</h3>
          <p class="desc">
            ${post.author_bio || 'No bio available.'}
          </p>
        </div>
        <div class="fs-6">
          <span class="pe-3"><a href="/${subType}/${slug}" class="post-link">${post.comments.length} COMMENTS</a></span><i class="bi bi-share"></i
          ><span class="ps-2">SHARE</span>
        </div>

  `


}

async function renderView() {
  const { subType, slug } = parsePath();

  const postData = await getSubmissionsByType(subType)



  if (slug && postData.some(post => slugify(post.title) === slug)) {
    document.getElementById('subs-list').style.display = 'none';
    document.getElementById('sub-view').style.display = 'block';
    renderOnePost(slug);
  } else {
    document.getElementById('subs-list').style.display = 'block';
    document.getElementById('sub-view').style.display = 'none';
    renderSubmissions();
  }
}

// Handle back/forward
window.addEventListener('popstate', renderView);

// Initial load
renderView();

window.renderSubmissions = renderSubmissions; // Expose function globally for testing