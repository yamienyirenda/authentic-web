// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Dark/Light Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    // Save preference to localStorage
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId) || document.querySelector('header'); // Fallback to header for 'Home'
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active Navigation Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) { // Adjust offset for header height
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Enhanced Search Functionality
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');
const searchSuggestions = document.createElement "search-suggestions');
searchInput.parentElement.appendChild(searchSuggestions);

// Load recent searches from localStorage
const recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

const updateSuggestions = () => {
    searchSuggestions.innerHTML = '';
    if (searchInput.value.trim()) {
        const filteredSearches = recentSearches.filter(search => 
            search.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        filteredSearches.forEach(search => {
            const li = document.createElement('li');
            li.textContent = search;
            li.addEventListener('click', () => {
                searchInput.value = search;
                searchSuggestions.innerHTML = '';
                performSearch(search);
            });
            searchSuggestions.appendChild(li);
        });
        searchSuggestions.style.display = filteredSearches.length ? 'block' : 'none';
    } else {
        searchSuggestions.style.display = 'none';
    }
};

const performSearch = (query) => {
    if (query) {
        // Add to recent searches
        if (!recentSearches.includes(query)) {
            recentSearches.unshift(query);
            if (recentSearches.length > 5) recentSearches.pop(); // Limit to 5 recent searches
            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        }
        alert(`Searching for: ${query}`); // Replace with actual search logic
        searchInput.value = '';
        searchSuggestions.innerHTML = '';
        searchSuggestions.style.display = 'none';
    }
};

searchButton.addEventListener('click', () => {
    performSearch(searchInput.value.trim());
});

searchInput.addEventListener('input', updateSuggestions);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch(searchInput.value.trim());
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.style.display = 'none';
    }
});

// Live Chat Functionality
const chatToggle = document.getElementById('chat-toggle');
const chatDialog = document.getElementById('chat-dialog');
const chatClose = document.getElementById('chat-close');
const chatSend = document.getElementById('chat-send');
const chatInput = document.getElementById('chat-input');
const chatBody = document.querySelector('.chat-body');

chatToggle.addEventListener('click', () => {
    chatDialog.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatDialog.classList.remove('active');
});

chatSend.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        const messageEl = document.createElement('p');
        messageEl.textContent = `You: ${message}`;
        chatBody.appendChild(messageEl);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        // Placeholder response
        setTimeout(() => {
            const responseEl = document.createElement('p');
            responseEl.textContent = 'Zathu Izi: Thanks for your message! We’ll get back to you soon.';
            chatBody.appendChild(responseEl);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatSend.click();
    }
});

// Image Zoom Functionality
document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('fullscreen');
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.image-wrapper.fullscreen').forEach(wrapper => {
            wrapper.classList.remove('fullscreen');
        });
    }
});