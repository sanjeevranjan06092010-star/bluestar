/* ==========================================================================
   BLUE SKY OTT - CORE JAVASCRIPT
   ========================================================================== */

// 1. App State
const state = {
  userName: '',
  activeTab: 'all', // all, tv, movies, sports
  searchQuery: '',
  carouselIndex: 0,
  carouselTimer: null,
  // Simulated Video Player state
  playerPlaying: false,
  playerDuration: 135, // in seconds (2h 15m)
  playerCurrentTime: 0,
  playerVolume: 80,
  playerMuted: false,
  playerInterval: null,
  currentItem: null,
  // Profile system
  profiles: [],
  activeProfile: null,
  manageProfilesMode: false
};

// 2. Media Database
const mediaData = [
  // --- SPORTS (Landscape Cards) ---
  {
    id: 'sport_1',
    type: 'sports',
    subType: 'live',
    title: 'India vs Pakistan - Asia Cup 2026',
    subtitle: 'Live • Cricket Stadium, Colombo',
    description: 'High-octane Asia Cup clash between arch-rivals India and Pakistan. Live scorecard updating from the field. Catch all the wickets, boundaries, and premium match action.',
    image: 'https://images.unsplash.com/photo-1531415080290-bc98545bab3c?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1531415080290-bc98545bab3c?auto=format&fit=crop&w=1200&q=80',
    rating: 'Live Match',
    year: '2026',
    duration: 'T20 Match',
    genres: 'Cricket • International • Live Sports',
    cast: 'Virat Kohli, Rohit Sharma, Babar Azam, Shaheen Afridi',
    liveScores: 'IND 158/3 (16.4 Overs) | Kohli 62*(41), Shaheen 2/32',
    isHero: true,
    heroLabel: 'Live Now'
  },
  {
    id: 'sport_2',
    type: 'sports',
    subType: 'live',
    title: 'Manchester United vs Liverpool',
    subtitle: 'Live • Old Trafford Stadium',
    description: 'The historic English football rivalry resumes live at Old Trafford. Liverpool is attacking aggressively while Man United holds a narrow lead in the second half.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    rating: 'Live Match',
    year: '2026',
    duration: '90 Mins',
    genres: 'Football • Premier League • Live Sports',
    cast: 'Bruno Fernandes, Marcus Rashford, Mohamed Salah, Luis Diaz',
    liveScores: 'MUN 2 - 1 LIV (82nd Min) | Salah 42\', Rashford 12\', Bruno 66\'(P)',
    isHero: true,
    heroLabel: 'Live Now'
  },
  {
    id: 'sport_3',
    type: 'sports',
    subType: 'live',
    title: 'Wimbledon Finals - Men\'s Singles',
    subtitle: 'Live • Centre Court, London',
    description: 'The pinnacle of grass court tennis. Carlos Alcaraz battles against the legendary Novak Djokovic in a thrilling five-setter masterpiece.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dce4a4953f?auto=format&fit=crop&w=800&q=80',
    rating: 'Live Match',
    year: '2026',
    duration: 'Set 5',
    genres: 'Tennis • Grand Slam • Tournament',
    cast: 'Carlos Alcaraz, Novak Djokovic',
    liveScores: 'Alcaraz 2 - 2 Djokovic | 6-4, 5-7, 6-3, 3-6, 4-2'
  },
  {
    id: 'sport_4',
    type: 'sports',
    subType: 'replay',
    title: 'Real Madrid vs Barcelona - La Liga Replay',
    subtitle: 'Replay • El Clasico Highlights',
    description: 'Missed El Clasico? Catch the full premium replay and extended highlights of the most watched club football match on earth.',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    rating: 'Highlights',
    year: '2026',
    duration: '22 Mins',
    genres: 'Football • La Liga • Spanish Club',
    cast: 'Vinicius Jr, Jude Bellingham, Robert Lewandowski, Pedri'
  },
  {
    id: 'sport_5',
    type: 'sports',
    subType: 'replay',
    title: 'Pro Kabaddi League - Panthers vs Mumba',
    subtitle: 'Highlights • High Speed Action',
    description: 'A spectacular raiding display by Jaipur Pink Panthers clinches a last-second victory against U Mumba in an adrenaline-filled contest.',
    image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=800&q=80',
    rating: 'Highlights',
    year: '2026',
    duration: '15 Mins',
    genres: 'Kabaddi • League Match • Indian Sports',
    cast: 'Arjun Deshwal, Guman Singh, Sunil Kumar'
  },

  // --- MOVIES (Portrait Cards) ---
  {
    id: 'movie_1',
    type: 'movies',
    title: 'The Nebula Project',
    subtitle: 'Sci-Fi • Blockbuster Movie',
    description: 'A daring expedition travels deep into an uncharted cosmic nebula to retrieve a forgotten energy source, discovering a complex alien biosphere in the process.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
    rating: 'IMDb 8.9',
    year: '2026',
    duration: '2h 15m',
    genres: 'Sci-Fi • Action • Space Adventure',
    cast: 'Jessica Chastain, Matthew McConaughey, Timothee Chalamet',
    isHero: true,
    heroLabel: 'Trending Movie'
  },
  {
    id: 'movie_2',
    type: 'movies',
    title: 'Echoes of Silence',
    subtitle: 'Mystery Thriller',
    description: 'An acoustic scientist investigating whale migrations in the deep arctic records a mysterious frequency sequence that seems to anticipate cataclysmic seismic events.',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.2',
    year: '2025',
    duration: '1h 58m',
    genres: 'Mystery • Thriller • Drama',
    cast: 'Cillian Murphy, Emily Blunt, Florence Pugh'
  },
  {
    id: 'movie_3',
    type: 'movies',
    title: 'Neon Dreams',
    subtitle: 'Cyberpunk Action',
    description: 'In the dystopian streets of Tokyo 2099, a cybernetically enhanced mercenary searches for a lost hard drive containing code that can shut down the ruling corporate AI.',
    image: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.8',
    year: '2026',
    duration: '2h 05m',
    genres: 'Cyberpunk • Action • Thriller',
    cast: 'Keanu Reeves, Ana de Armas, Simu Liu'
  },
  {
    id: 'movie_4',
    type: 'movies',
    title: 'The Last Guardian',
    subtitle: 'High Fantasy Epic',
    description: 'A young squire is chosen by the last living dragon to protect the legendary golden core from a rising shadow army led by a corrupted sorcerer.',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.5',
    year: '2025',
    duration: '2h 32m',
    genres: 'Fantasy • Adventure • Drama',
    cast: 'Ian McKellen, Cate Blanchett, Tom Holland'
  },
  {
    id: 'movie_5',
    type: 'movies',
    title: 'Love in Tokyo',
    subtitle: 'Romance & Drama',
    description: 'An American travel writer and a Japanese landscape architect find their worlds colliding over the course of one cherry blossom week in beautiful Tokyo.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.4',
    year: '2025',
    duration: '1h 45m',
    genres: 'Romance • Drama • Travel',
    cast: 'Emma Stone, Ken Watanabe, Steven Yeun'
  },

  // --- TV SHOWS (Portrait Cards) ---
  {
    id: 'tv_aajtak',
    type: 'tv',
    title: 'Aaj Tak',
    subtitle: 'Live • 24/7 News Channel',
    description: 'Aaj Tak is a leading Hindi news television channel in India. Watch Aaj Tak Live News Channel for latest news, breaking news, politics, business, and entertainment.',
    image: 'aaj_tak.png',
    bannerImage: 'aaj_tak.png',
    rating: 'LIVE',
    year: '2026',
    duration: 'Live Stream',
    genres: 'News • Live • Hindi',
    cast: 'Aaj Tak News Team',
    videoUrl: 'https://vglivessai.akamaized.net/sg/v1/manifest/611d79b11b77e2f571934fd80ca1413453772ac7/da9d350e-ac56-4320-8609-0c501da4fb5b/b31c9b98-2f04-48de-9216-b179a858695e/1.m3u8',
    isLive: true
  },
  {
    id: 'show_1',
    type: 'tv',
    title: 'Shadow Symphony',
    subtitle: 'Crime Drama Series',
    description: 'A classic detective and a brilliant street musician form an unlikely alliance to solve a series of mysterious orchestra-themed murders plaguing the elite of Vienna.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=1200&q=80',
    rating: 'IMDb 8.7',
    year: '2026',
    duration: 'Season 1 • 8 Episodes',
    genres: 'Crime • Mystery • Thriller',
    cast: 'Benedict Cumberbatch, Jenna Ortega, Mads Mikkelsen',
    isHero: true,
    heroLabel: 'Hot New Series'
  },
  {
    id: 'show_2',
    type: 'tv',
    title: 'Cyber City',
    subtitle: 'Anime Series',
    description: 'A young hacker gets recruited by a rebel cell looking to expose the digital class divide inside the glowing cyberpunk megacity Neo-Seoul.',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.6',
    year: '2025',
    duration: 'Season 2 • 12 Episodes',
    genres: 'Anime • Sci-Fi • Action',
    cast: 'Mamoru Miyano, Yuki Kaji, Kana Hanazawa'
  },
  {
    id: 'show_3',
    type: 'tv',
    title: 'House of Gold',
    subtitle: 'Historical Drama',
    description: 'An epic dynastic drama charting the rise and fall of a powerful banking family in 15th-century Florence during the height of the Renaissance.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.1',
    year: '2026',
    duration: 'Season 1 • 10 Episodes',
    genres: 'History • Drama • Politics',
    cast: 'Mads Mikkelsen, Pedro Pascal, Rebecca Ferguson'
  },
  {
    id: 'show_4',
    type: 'tv',
    title: 'Chef\'s Kitchen',
    subtitle: 'Culinary Reality Show',
    description: 'World-renowned chefs compete in high-pressure culinary challenges to earn a partnership at a three-Michelin-starred restaurant.',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.9',
    year: '2025',
    duration: 'Season 4 • 14 Episodes',
    genres: 'Reality • Food • Competition',
    cast: 'Gordon Ramsay, Massimo Bottura'
  },
  {
    id: 'show_5',
    type: 'tv',
    title: 'Code Red',
    subtitle: 'Cyber Action Comedy',
    description: 'When a small-town veterinary clinic accidentally downloads government espionage software, the local vets become highly targets of international agencies.',
    image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.5',
    year: '2026',
    duration: 'Season 1 • 6 Episodes',
    genres: 'Comedy • Action • Tech',
    cast: 'Ryan Reynolds, Awkwafina, Jack Black'
  },

  // --- ORIGINALS (Portrait Cards with Special Badges) ---
  {
    id: 'original_1',
    type: 'originals',
    title: 'Rising Star: The Kohli Story',
    subtitle: 'Documentary Special',
    description: 'An exclusive look into Virat Kohli\'s mental and physical training routines, childhood struggles, and his rise to international cricketing glory.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2026',
    duration: '1h 32m',
    genres: 'Documentary • Cricket • Biography',
    cast: 'Virat Kohli, Sachin Tendulkar, Anushka Sharma'
  },
  {
    id: 'original_2',
    type: 'originals',
    title: 'Into the Abyss',
    subtitle: 'Nature Exploration Series',
    description: 'Explore the deepest trenches of our oceans to discover fluorescent creature life forms and underwater volcanic networks never captured before in 4K.',
    image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2025',
    duration: 'Season 1 • 5 Episodes',
    genres: 'Nature • Science • Adventure',
    cast: 'David Attenborough'
  },
  {
    id: 'original_3',
    type: 'originals',
    title: 'Comedy Night Live',
    subtitle: 'Stand-up Comedy Showcase',
    description: 'Blue Sky\'s flagship stand-up series bringing together the funniest comedians from across the country for a night of absolute laughter.',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd6a?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2026',
    duration: '1h 15m',
    genres: 'Comedy • Standup • Stage',
    cast: 'Zakir Khan, Abhishek Upmanyu, Kanan Gill'
  },
  {
    id: 'original_4',
    type: 'originals',
    title: 'Virtual Reality',
    subtitle: 'Technology Docuseries',
    description: 'Delve into the future of humanity, examining how spatial computing, quantum intelligence, and simulated realities are redesigning our daily lives.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    rating: 'Originals',
    year: '2026',
    duration: 'Season 1 • 6 Episodes',
    genres: 'Technology • Science • Future',
    cast: 'Mark Zuckerberg, Palmer Luckey, Demis Hassabis'
  },
  {
    id: 'trending_1',
    type: 'tv',
    title: 'Khatron Ke Khiladi',
    hindiTitle: 'खतरों के खिलाड़ी',
    subtitle: 'Stunt Reality Show',
    description: 'Fear Factor: Khatron Ke Khiladi is an Indian stunt reality television series based on the American series Fear Factor. Contestants face their worst fears in high-octane stunts.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.1',
    year: '2026',
    duration: 'Season 14 • 20 Episodes',
    genres: 'Reality • Action • Adventure',
    cast: 'Rohit Shetty, Abhishek Kumar, Shalin Bhanot',
    isNewRelease: true,
    isTrending: true
  },
  {
    id: 'trending_2',
    type: 'tv',
    title: 'Yeh Rishta Kya Kehlata Hai',
    hindiTitle: 'ये रिश्ता क्या कहलाता है',
    subtitle: 'Family Drama Series',
    description: 'A long-running Indian television drama series that explores the values, relationships, and complexities of a large family in Udaipur.',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.2',
    year: '2026',
    duration: 'Season 1 • 3000+ Episodes',
    genres: 'Drama • Family • Romance',
    cast: 'Samridhii Shukla, Rohit Purohit',
    isTrending: true
  },
  {
    id: 'trending_3',
    type: 'tv',
    title: 'Anupama',
    hindiTitle: 'अनुपमा',
    subtitle: 'Drama Series',
    description: 'Anupamaa, a homemaker, sacrifices her ambitions and goals to raise her family. Homemaker Anupama feels devalued and decides to live life on her own terms.',
    image: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1608155686393-8fdd966d784d?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.5',
    year: '2026',
    duration: 'Season 1 • 1200+ Episodes',
    genres: 'Drama • Family • Women Empowerment',
    cast: 'Rupali Ganguly, Gaurav Khanna',
    isTrending: true
  },
  {
    id: 'trending_4',
    type: 'tv',
    title: 'Ye Fitoor Mera',
    hindiTitle: 'ये फ़ितूर तेरा',
    subtitle: 'Romantic Drama Series',
    description: 'A passionate love story of two individuals from different walks of life, fighting against society and their own internal conflicts to stay together.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.4',
    year: '2026',
    duration: 'Season 1 • 12 Episodes',
    genres: 'Romance • Drama • Passion',
    cast: 'Ranbir Kapoor, Alia Bhatt',
    isNewRelease: true,
    isTrending: true
  },
  {
    id: 'trending_5',
    type: 'tv',
    title: 'Dr. Aarambh',
    hindiTitle: 'Dr. आरंभ',
    subtitle: 'Medical Drama',
    description: 'Follow the life of Dr. Aarambh, a brilliant but unconventional surgeon, as he navigates the complex politics of a premier hospital while saving lives.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 8.6',
    year: '2026',
    duration: 'Season 1 • 10 Episodes',
    genres: 'Drama • Medical • Mystery',
    cast: 'Ayushmann Khurrana, Sobhita Dhulipala',
    isTrending: true
  },
  {
    id: 'trending_6',
    type: 'tv',
    title: 'Tum Dena Saath Mera',
    hindiTitle: 'तुम देना साथ मेरा',
    subtitle: 'Emotional Drama Series',
    description: 'A touching story of friendship, love, and loyalty that tests the bonds of a young couple through various life challenges and triumphs.',
    image: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=400&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?auto=format&fit=crop&w=800&q=80',
    rating: 'IMDb 7.9',
    year: '2026',
    duration: 'Season 1 • 45 Episodes',
    genres: 'Drama • Family • Friendship',
    cast: 'Kartik Aaryan, Kiara Advani',
    isTrending: true
  }
];

// 3. Initialization & Event Listeners
function initURLRouting() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'all';
  const search = params.get('search') || '';

  // Apply category
  state.activeTab = category;
  
  // Set navigation link active state in UI
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkCat = link.getAttribute('data-category');
    if (linkCat === category) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Apply search query
  if (search) {
    state.searchQuery = search;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = search;
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.remove('hidden');
    
    // Perform filtering
    filterContent();
  } else {
    handleCategoryFilter(category);
  }
}

function initWatchPage() {
  // Update header profile display
  const userDisplayName = document.getElementById('user-display-name');
  if (userDisplayName) {
    userDisplayName.textContent = state.activeProfile.name;
  }
  
  const profileAvatarBtn = document.getElementById('profile-dropdown-btn');
  if (profileAvatarBtn) {
    profileAvatarBtn.style.background = 'none';
    profileAvatarBtn.style.overflow = 'hidden';
    profileAvatarBtn.style.border = '1px solid rgba(255,255,255,0.15)';
    profileAvatarBtn.innerHTML = `<img src="${state.activeProfile.avatarUrl}" alt="Active Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
  }

  // Render quick switch dropdown section
  renderQuickSwitchList();

  // Get item ID
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');
  const item = mediaData.find(m => m.id === itemId);
  if (!item) {
    window.location.href = 'index.html';
    return;
  }

  state.currentItem = item;

  // Populate metadata details
  document.getElementById('watch-title').textContent = item.title;
  document.getElementById('watch-rating').textContent = item.rating;
  document.getElementById('watch-year').textContent = item.year;
  document.getElementById('watch-duration').textContent = item.duration;
  document.getElementById('watch-genres').textContent = item.genres;
  document.getElementById('watch-description').textContent = item.description;
  document.getElementById('watch-cast').textContent = item.cast || 'N/A';

  // Set up player background poster
  const posterBg = document.getElementById('player-poster-bg');
  if (posterBg) {
    posterBg.style.backgroundImage = `url('${item.bannerImage || item.image}')`;
  }
  
  const playerTag = document.getElementById('player-tag');
  if (playerTag) {
    playerTag.textContent = item.type === 'sports' ? 'Live Sports' : 'Blue Sky Premium';
  }

  // Setup Watchlist Button
  const watchlistBtn = document.getElementById('watch-watchlist-btn');
  if (watchlistBtn) {
    watchlistBtn.setAttribute('data-watchlist-id', item.id);
    if (isItemInWatchlist(item.id)) {
      watchlistBtn.classList.add('added');
      watchlistBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;color:#22c55e;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Added`;
    } else {
      watchlistBtn.classList.remove('added');
      watchlistBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Watchlist`;
    }
    
    watchlistBtn.onclick = () => {
      toggleWatchlist(item.id);
    };
  }

  // Reset player state & volume UI
  resetPlayerState();

  // Load recommendations
  renderWatchRecommendations(item);

  // Set up custom player events
  setupPlayerEvents();
  
  // Auto-play or show buffering spinner initially
  playVideo();
}

function renderWatchRecommendations(currentItem) {
  const grid = document.getElementById('watch-similar-grid');
  if (!grid) return;
  grid.innerHTML = '';

  // Get similar items
  const matches = mediaData.filter(item => item.type === currentItem.type && item.id !== currentItem.id).slice(0, 5);

  matches.forEach(item => {
    const card = document.createElement('div');
    card.className = 'similar-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="similar-overlay">
        <span class="similar-card-title">${item.title}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      window.location.href = `watch.html?id=${item.id}`;
    });
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isWatchPage = window.location.pathname.includes('watch.html');

  if (isWatchPage) {
    // Load profiles database
    loadProfiles();
    const activeProfileId = localStorage.getItem('bluesky_active_profile_id');
    if (activeProfileId) {
      const profile = state.profiles.find(p => p.id === activeProfileId);
      if (profile) {
        state.activeProfile = profile;
        state.userName = profile.name;
        initWatchPage();
      } else {
        window.location.href = 'index.html';
      }
    } else {
      window.location.href = 'index.html';
    }

    // Set up profile dropdown triggers
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const dropdownMenu = document.getElementById('profile-dropdown-menu');
    if (profileBtn) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      if (dropdownMenu) dropdownMenu.classList.remove('show');
    });

    // Logo home button click
    const logoBtn = document.getElementById('header-logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }
  } else {
    // Load profiles database
    loadProfiles();
    const activeProfileId = localStorage.getItem('bluesky_active_profile_id');
    const params = new URLSearchParams(window.location.search);
    
    if (activeProfileId) {
      const profile = state.profiles.find(p => p.id === activeProfileId);
      if (profile) {
        state.activeProfile = profile;
        state.userName = profile.name;
        const welcomeScreen = document.getElementById('welcome-screen');
        if (welcomeScreen) welcomeScreen.classList.add('hidden');
        switchToDashboard();
      } else {
        renderProfileSelection();
      }
    } else {
      if (params.get('addProfile') === 'true') {
        renderAddProfileForm();
      } else if (state.profiles && state.profiles.length > 0) {
        renderProfileSelection();
      } else {
        renderEnterNameForm();
      }
    }

    // Handle splash screen preloader timeout
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
      const splashShown = sessionStorage.getItem('bluesky_splash_shown');
      if (splashShown) {
        splashScreen.style.display = 'none';
        splashScreen.classList.add('hidden');
      } else {
        sessionStorage.setItem('bluesky_splash_shown', 'true');
        setTimeout(() => {
          splashScreen.classList.add('fade-out');
          setTimeout(() => {
            splashScreen.classList.add('hidden');
          }, 800); // Match transition duration (0.8s)
        }, 3000); // Splash screen display duration (3 seconds)
      }
    }
    
    // Set up profile dropdown triggers
    const profileBtn = document.getElementById('profile-dropdown-btn');
    const dropdownMenu = document.getElementById('profile-dropdown-menu');
    if (profileBtn) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
      });
    }

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      if (dropdownMenu) dropdownMenu.classList.remove('show');
    });

    // Logo home button click
    const logoBtn = document.getElementById('header-logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    // Set up navigation tab listeners with native reloads
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        window.location.href = `index.html?category=${category}`;
      });
    });

    // Set up search overlay triggers
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    if (searchToggleBtn) {
      searchToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openSearchOverlay();
      });
    }
    
    // Set up search overlay interaction events
    setupSearchOverlayEvents();

    // Reset filter button
    const resetBtn = document.getElementById('reset-filters-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    // Hero carousel control buttons
    document.getElementById('carousel-prev-btn').addEventListener('click', () => moveCarousel(-1));
    document.getElementById('carousel-next-btn').addEventListener('click', () => moveCarousel(1));

    // Modal setup
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-close-backdrop').addEventListener('click', closeModal);

    // Custom Video Player events
    setupPlayerEvents();
  }
});

// 4. Prime-style Dashboard Dashboard Transitions
function switchToDashboard() {
  if (!state.activeProfile) {
    const activeId = localStorage.getItem('bluesky_active_profile_id');
    const profiles = loadProfiles();
    state.activeProfile = profiles.find(p => p.id === activeId) || profiles[0];
    state.userName = state.activeProfile.name;
  }

  // Update names in the UI
  const userDisplayName = document.getElementById('user-display-name');
  if (userDisplayName) {
    userDisplayName.textContent = state.activeProfile.name;
  }
  const dropdownDisplayName = document.getElementById('dropdown-display-name');
  if (dropdownDisplayName) {
    dropdownDisplayName.textContent = state.activeProfile.name;
  }

  // Update avatar icon in header
  const profileAvatarBtn = document.getElementById('profile-dropdown-btn');
  if (profileAvatarBtn) {
    profileAvatarBtn.style.background = 'none';
    profileAvatarBtn.style.overflow = 'hidden';
    profileAvatarBtn.style.border = '1px solid rgba(255,255,255,0.15)';
    profileAvatarBtn.innerHTML = `<img src="${state.activeProfile.avatarUrl}" alt="Active Avatar" style="width: 100%; height: 100%; object-fit: cover;">`;
  }

  // Render quick switches
  renderQuickSwitchList();

  // Show dashboard container
  const dashboard = document.getElementById('main-dashboard');
  dashboard.classList.remove('hidden');

  // Load content
  initCarousel();
  initURLRouting();
}

// 5. Hero Widescreen Carousel Setup
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const indicators = document.getElementById('carousel-indicators');
  
  // Get items tagged for hero banner
  const heroItems = mediaData.filter(item => item.isHero);
  
  track.innerHTML = '';
  indicators.innerHTML = '';

  heroItems.forEach((item, index) => {
    // Generate slide
    const slide = document.createElement('div');
    slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
    slide.innerHTML = `
      <img src="${item.bannerImage || item.image}" alt="${item.title}" class="carousel-image">
      <div class="carousel-overlay">
        <div class="slide-category">
          ${item.subType === 'live' ? '<span class="live-indicator"></span>' : ''}
          ${item.heroLabel || item.type}
        </div>
        <h1 class="slide-title">${item.title}</h1>
        <p class="slide-description">${item.description}</p>
        <div class="slide-buttons">
          <button class="btn-watch" onclick="openDetails('${item.id}')">
            <svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;"><path d="M8 5v14l11-7z"></path></svg>
            Play Now
          </button>
          <button class="btn-watchlist ${isItemInWatchlist(item.id) ? 'added' : ''}" data-watchlist-id="${item.id}" onclick="toggleWatchlist('${item.id}')">
            ${isItemInWatchlist(item.id)
              ? `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;color:#22c55e;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Added`
              : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Watchlist`
            }
          </button>
        </div>
      </div>
    `;
    track.appendChild(slide);

    // Generate indicator dot
    const indicator = document.createElement('button');
    indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => setCarouselSlide(index));
    indicators.appendChild(indicator);
  });

  state.carouselIndex = 0;
  startCarouselAutoSlide();

  // Stop auto slide on hover
  const container = document.getElementById('hero-carousel-container');
  container.addEventListener('mouseenter', stopCarouselAutoSlide);
  container.addEventListener('mouseleave', startCarouselAutoSlide);
}

function startCarouselAutoSlide() {
  stopCarouselAutoSlide();
  state.carouselTimer = setInterval(() => {
    moveCarousel(1);
  }, 5000);
}

function stopCarouselAutoSlide() {
  if (state.carouselTimer) {
    clearInterval(state.carouselTimer);
    state.carouselTimer = null;
  }
}

function moveCarousel(direction) {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  if (slides.length === 0) return;

  slides[state.carouselIndex].classList.remove('active');
  indicators[state.carouselIndex].classList.remove('active');

  state.carouselIndex = (state.carouselIndex + direction + slides.length) % slides.length;

  slides[state.carouselIndex].classList.add('active');
  indicators[state.carouselIndex].classList.add('active');
}

function setCarouselSlide(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  if (slides.length === 0) return;

  slides[state.carouselIndex].classList.remove('active');
  indicators[state.carouselIndex].classList.remove('active');

  state.carouselIndex = index;

  slides[state.carouselIndex].classList.add('active');
  indicators[state.carouselIndex].classList.add('active');
}

// 6. Dynamic Dashboard Rows Generation
function renderDashboardRows() {
  const container = document.getElementById('rows-container');
  container.innerHTML = '';

  const rows = [
    { title: '🔴 Live Sports Action', category: 'sports', filterKey: 'sports' },
    { title: '🔥 Blockbuster Movies', category: 'movies', filterKey: 'movies' },
    { title: '📺 Popular TV Series', category: 'tv', filterKey: 'tv' },
    { title: '🌌 Blue Sky Originals', category: 'originals', filterKey: 'originals' }
  ];

  rows.forEach(row => {
    // If active tab doesn't match and tab is not 'all', skip row
    if (state.activeTab !== 'all' && state.activeTab !== row.filterKey) {
      return;
    }

    // Filter items for this row
    const items = mediaData.filter(item => item.type === row.filterKey);
    if (items.length === 0) return;

    // Create row structure
    const rowEl = document.createElement('div');
    rowEl.className = 'category-row';
    rowEl.innerHTML = `
      <div class="row-header">
        <h2 class="row-title">${row.title}</h2>
      </div>
      <div class="cards-container">
        <!-- Cards loaded dynamically -->
      </div>
    `;

    const cardsContainer = rowEl.querySelector('.cards-container');

    items.forEach(item => {
      const card = document.createElement('div');
      
      if (item.type === 'sports') {
        card.className = 'media-card landscape';
        card.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-overlay">
              <div class="card-details">
                <span class="card-badge ${item.subType === 'live' ? 'live' : 'replay'}">${item.subType === 'live' ? 'Live' : 'Replay'}</span>
                <p class="card-title">${item.title}</p>
                <p class="card-subtitle">${item.subtitle}</p>
                ${item.liveScores ? `<div class="live-scores"><span class="live-indicator"></span> <span>${item.liveScores}</span></div>` : ''}
              </div>
            </div>
          </div>
        `;
      } else {
        card.className = 'media-card portrait';
        card.innerHTML = `
          <div class="card-img-wrapper">
            <img src="${item.image}" alt="${item.title}">
            <div class="card-overlay">
              <div class="card-details">
                <span class="card-badge premium">${item.type === 'originals' ? 'Original' : item.rating}</span>
                <p class="card-title">${item.title}</p>
                <p class="card-subtitle">${item.genres.split('•')[0]}</p>
              </div>
            </div>
          </div>
        `;
      }

      card.addEventListener('click', () => openDetails(item.id));
      cardsContainer.appendChild(card);
    });

    container.appendChild(rowEl);
  });
}

// 7. Filtering and Search Logic
function handleCategoryFilter(category) {
  state.activeTab = category;
  
  // Clear search query on category switch
  state.searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
  document.getElementById('results-header').classList.add('hidden');

  const heroSection = document.getElementById('hero-carousel-container');
  if (heroSection) {
    if (category === 'all') {
      heroSection.classList.remove('hidden');
      startCarouselAutoSlide();
    } else {
      heroSection.classList.add('hidden');
      stopCarouselAutoSlide();
    }
  }

  renderDashboardRows();
}

function filterContent() {
  const query = state.searchQuery.toLowerCase();
  const resultsHeader = document.getElementById('results-header');
  const searchQueryText = document.getElementById('search-query-text');
  const heroSection = document.getElementById('hero-carousel-container');
  const rowsContainer = document.getElementById('rows-container');

  if (!query) {
    // If search is empty, reset back to normal tab layout
    resultsHeader.classList.add('hidden');
    if (state.activeTab === 'all') {
      heroSection.classList.remove('hidden');
      startCarouselAutoSlide();
    }
    renderDashboardRows();
    return;
  }

  // Hide carousel when searching
  heroSection.classList.add('hidden');
  stopCarouselAutoSlide();
  
  // Show search results indicator
  resultsHeader.classList.remove('hidden');
  searchQueryText.textContent = state.searchQuery;

  // Filter items matching name, description, tags, cast
  const filtered = mediaData.filter(item => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.genres.toLowerCase().includes(query) ||
      (item.cast && item.cast.toLowerCase().includes(query))
    );
  });

  // Display matching items in a Grid layout
  rowsContainer.innerHTML = '';
  
  if (filtered.length === 0) {
    rowsContainer.innerHTML = `
      <div style="text-align: center; padding: 80px 20px; color: var(--text-secondary);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 60px; height: 60px; color: var(--text-muted); margin-bottom: 15px;">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <h3 style="color: var(--text-primary); font-family: var(--font-title); margin-bottom: 8px;">No Results Found</h3>
        <p style="font-size: 14px;">We couldn't find any match for your search. Try checking your spelling or search other categories.</p>
      </div>
    `;
    return;
  }

  // Generate matching grid row
  const rowEl = document.createElement('div');
  rowEl.className = 'category-row';
  rowEl.innerHTML = `
    <div class="row-header">
      <h2 class="row-title">Search Results (${filtered.length})</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; padding: 15px 0;">
      <!-- Grid items loaded -->
    </div>
  `;

  const gridContainer = rowEl.querySelector('div:nth-child(2)');

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'media-card landscape'; // use landscape for consistency in grid
    card.style.width = '100%';
    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-overlay">
          <div class="card-details">
            <span class="card-badge premium">${item.type.toUpperCase()}</span>
            <p class="card-title">${item.title}</p>
            <p class="card-subtitle">${item.subtitle}</p>
          </div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openDetails(item.id));
    gridContainer.appendChild(card);
  });

  rowsContainer.appendChild(rowEl);
}

function resetFilters() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  state.searchQuery = '';
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
  document.getElementById('results-header').classList.add('hidden');
  
  // Collapse expandable search box
  const searchWrapper = document.getElementById('search-input-wrapper');
  if (searchWrapper) searchWrapper.classList.add('collapsed');
  
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(l => l.classList.remove('active'));
  if (navLinks[0]) navLinks[0].classList.add('active');
  
  state.activeTab = 'all';
  
  const heroSection = document.getElementById('hero-carousel-container');
  if (heroSection) {
    heroSection.classList.remove('hidden');
    startCarouselAutoSlide();
  }
  
  renderDashboardRows();
}

function toggleWatchlist(itemId) {
  const item = mediaData.find(m => m.id === itemId);
  if (!item) return;

  if (!state.activeProfile) return;
  if (!state.activeProfile.watchlist) state.activeProfile.watchlist = [];

  const idx = state.activeProfile.watchlist.indexOf(itemId);
  let isAdded = false;
  if (idx === -1) {
    state.activeProfile.watchlist.push(itemId);
    isAdded = true;
  } else {
    state.activeProfile.watchlist.splice(idx, 1);
    isAdded = false;
  }

  // Update profile list in local storage
  const profiles = loadProfiles();
  const profileIndex = profiles.findIndex(p => p.id === state.activeProfile.id);
  if (profileIndex !== -1) {
    profiles[profileIndex].watchlist = state.activeProfile.watchlist;
    localStorage.setItem('bluesky_profiles', JSON.stringify(profiles));
    state.profiles = profiles;
  }

  updateWatchlistButtonsUI(itemId, isAdded);
}

function updateWatchlistButtonsUI(itemId, isAdded) {
  const buttons = document.querySelectorAll(`[data-watchlist-id="${itemId}"]`);
  buttons.forEach(btn => {
    if (isAdded) {
      btn.classList.add('added');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" style="width:16px;height:16px;color:#22c55e;"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Added`;
    } else {
      btn.classList.remove('added');
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Watchlist`;
    }
  });
}

function isItemInWatchlist(itemId) {
  if (!state.activeProfile || !state.activeProfile.watchlist) return false;
  return state.activeProfile.watchlist.includes(itemId);
}

// 8. Detailed Modal Handlers
function openDetails(itemId) {
  window.location.href = `watch.html?id=${itemId}`;
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = ''; // Unlock scroll
  
  // Reset and pause player state
  pauseVideo();
  state.currentItem = null; // Prevent background reload of the stream
  resetPlayerState();

  // Resume carousel if on main dashboard
  if (state.activeTab === 'all' && !state.searchQuery) {
    startCarouselAutoSlide();
  }
}

function renderSimilarContent(currentItem) {
  const grid = document.getElementById('similar-grid');
  grid.innerHTML = '';

  // Get other items of similar type
  const matches = mediaData.filter(item => item.type === currentItem.type && item.id !== currentItem.id).slice(0, 4);

  matches.forEach(item => {
    const card = document.createElement('div');
    card.className = 'similar-card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="similar-overlay">
        <span class="similar-card-title">${item.title}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      // Transition details within modal
      openDetails(item.id);
    });
    grid.appendChild(card);
  });
}

// 9. Premium Custom Video Player Controls Logic
function setupPlayerEvents() {
  const playBtn = document.getElementById('player-play-btn');
  const skipBack = document.getElementById('player-skip-back');
  const skipForward = document.getElementById('player-skip-forward');
  const muteBtn = document.getElementById('player-mute-btn');
  const volumeSlider = document.getElementById('player-volume');
  const timelineSlider = document.getElementById('player-timeline');
  const videoDisplay = document.getElementById('video-display');
  const fullscreenBtn = document.getElementById('player-fullscreen-btn');

  // Play Pause triggers
  playBtn.addEventListener('click', togglePlayState);
  videoDisplay.addEventListener('click', togglePlayState);

  // Skip buttons
  skipBack.addEventListener('click', () => skipTime(-10));
  skipForward.addEventListener('click', () => skipTime(10));

  // Volume control sliders
  muteBtn.addEventListener('click', toggleMute);
  volumeSlider.addEventListener('input', (e) => {
    state.playerVolume = e.target.value;
    state.playerMuted = (state.playerVolume == 0);
    updateVolumeUI();
  });

  // Drag timeline slider
  timelineSlider.addEventListener('input', (e) => {
    const percent = e.target.value;
    const video = document.getElementById('main-video-player');
    if (state.currentItem && state.currentItem.videoUrl) {
      if (!state.currentItem.isLive && video.duration) {
        video.currentTime = (percent / 100) * video.duration;
      }
    } else {
      state.playerCurrentTime = Math.round((percent / 100) * state.playerDuration);
      updateTimelineUI();
    }
  });

  // Fullscreen trigger API
  fullscreenBtn.addEventListener('click', () => {
    const container = document.querySelector('.modal-player-container');
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) { /* Safari */
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) { /* IE11 */
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  // Set up real HTML5 video element listeners if it is used
  const video = document.getElementById('main-video-player');
  if (video) {
    video.addEventListener('play', () => {
      state.playerPlaying = true;
      updatePlayButtonUI();
      const display = document.getElementById('video-display');
      display.classList.add('playing');
    });
    video.addEventListener('pause', () => {
      state.playerPlaying = false;
      updatePlayButtonUI();
      const display = document.getElementById('video-display');
      display.classList.remove('playing');
    });
    video.addEventListener('waiting', () => {
      document.getElementById('video-spinner').classList.remove('hidden');
    });
    video.addEventListener('playing', () => {
      document.getElementById('video-spinner').classList.add('hidden');
    });
    video.addEventListener('timeupdate', () => {
      if (state.currentItem && state.currentItem.videoUrl && !state.currentItem.isLive) {
        state.playerCurrentTime = Math.round(video.currentTime);
        state.playerDuration = Math.round(video.duration || 0);
        updateTimelineUI();
      }
    });
  }
}

let hlsInstance = null;

function initRealVideoPlayer() {
  const video = document.getElementById('main-video-player');
  if (!video) return;

  const item = state.currentItem;
  if (item && item.videoUrl) {
    video.style.display = 'block';
    
    // Set initial volume & muted state from app state
    video.volume = state.playerVolume / 100;
    video.muted = state.playerMuted;

    // Load stream
    const videoUrl = item.videoUrl;
    if (Hls.isSupported()) {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      hlsInstance = new Hls({
        enableWorker: true,
        lowLatencyMode: true
      });
      hlsInstance.loadSource(videoUrl);
      hlsInstance.attachMedia(video);
      hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
        console.log("HLS Manifest parsed, ready to play");
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl;
    }
  } else {
    video.style.display = 'none';
    video.src = '';
    if (hlsInstance) {
      hlsInstance.destroy();
      hlsInstance = null;
    }
  }
}

function resetPlayerState() {
  state.playerPlaying = false;
  state.playerCurrentTime = 0;
  
  // Initialize or reset real video player
  initRealVideoPlayer();

  if (state.currentItem && state.currentItem.type === 'sports' && state.currentItem.subType === 'live') {
    state.playerDuration = 10800; // 3 hours in seconds for matches
  } else {
    state.playerDuration = 8100; // 2h 15m in seconds for typical movies
  }
  
  const timelineSlider = document.getElementById('player-timeline');
  if (timelineSlider) {
    timelineSlider.disabled = false;
  }
  
  updateTimelineUI();
  updatePlayButtonUI();
  
  const spinner = document.getElementById('video-spinner');
  spinner.classList.add('hidden');

  const playOverlay = document.getElementById('play-state-overlay');
  playOverlay.classList.remove('show');

  const display = document.getElementById('video-display');
  display.classList.remove('playing');
}

function togglePlayState() {
  if (state.playerPlaying) {
    pauseVideo();
  } else {
    playVideo();
  }
}

function playVideo() {
  const video = document.getElementById('main-video-player');
  if (state.currentItem && state.currentItem.videoUrl) {
    video.play().catch(err => {
      console.error("Playback failed:", err);
      // Fallback if browser blocks autoplay
      state.playerPlaying = false;
      updatePlayButtonUI();
    });
  } else {
    const spinner = document.getElementById('video-spinner');
    spinner.classList.remove('hidden');
    
    // Simulate buffering for 800ms
    setTimeout(() => {
      spinner.classList.add('hidden');
      state.playerPlaying = true;
      
      // Play state overlay animation pulse
      const playOverlay = document.getElementById('play-state-overlay');
      playOverlay.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>';
      playOverlay.classList.add('show');
      setTimeout(() => playOverlay.classList.remove('show'), 500);

      const display = document.getElementById('video-display');
      display.classList.add('playing');

      updatePlayButtonUI();
      
      // Start timeline progress
      clearInterval(state.playerInterval);
      state.playerInterval = setInterval(() => {
        state.playerCurrentTime++;
        if (state.playerCurrentTime >= state.playerDuration) {
          pauseVideo();
          state.playerCurrentTime = 0;
        }
        updateTimelineUI();
      }, 1000);
    }, 650);
  }
}

function pauseVideo() {
  const video = document.getElementById('main-video-player');
  if (state.currentItem && state.currentItem.videoUrl) {
    video.pause();
  } else {
    state.playerPlaying = false;
    clearInterval(state.playerInterval);
    
    const playOverlay = document.getElementById('play-state-overlay');
    playOverlay.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>';
    playOverlay.classList.add('show');
    setTimeout(() => playOverlay.classList.remove('show'), 500);

    const display = document.getElementById('video-display');
    display.classList.remove('playing');

    updatePlayButtonUI();
  }
}

function skipTime(seconds) {
  const video = document.getElementById('main-video-player');
  if (state.currentItem && state.currentItem.videoUrl) {
    if (!state.currentItem.isLive) {
      video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
    }
  } else {
    state.playerCurrentTime = Math.max(0, Math.min(state.playerDuration, state.playerCurrentTime + seconds));
    updateTimelineUI();
  }
}

function toggleMute() {
  state.playerMuted = !state.playerMuted;
  updateVolumeUI();
}

function updatePlayButtonUI() {
  const playBtn = document.getElementById('player-play-btn');
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');
  
  if (state.playerPlaying) {
    iconPlay.classList.add('hidden');
    iconPause.classList.remove('hidden');
  } else {
    iconPlay.classList.remove('hidden');
    iconPause.classList.add('hidden');
  }
}

function updateVolumeUI() {
  const muteBtn = document.getElementById('player-mute-btn');
  const iconVolume = muteBtn.querySelector('.icon-volume');
  const iconMuted = muteBtn.querySelector('.icon-muted');
  const volumeSlider = document.getElementById('player-volume');
  
  if (state.playerMuted) {
    iconVolume.classList.add('hidden');
    iconMuted.classList.remove('hidden');
    volumeSlider.value = 0;
  } else {
    iconVolume.classList.remove('hidden');
    iconMuted.classList.add('hidden');
    volumeSlider.value = state.playerVolume;
  }

  // Update actual video player volume if active
  const video = document.getElementById('main-video-player');
  if (video && state.currentItem && state.currentItem.videoUrl) {
    video.volume = state.playerMuted ? 0 : (state.playerVolume / 100);
    video.muted = state.playerMuted;
  }
}

function updateTimelineUI() {
  const currentTimeText = document.getElementById('player-time-current');
  const totalTimeText = document.getElementById('player-time-total');
  const timelineSlider = document.getElementById('player-timeline');
  const progressFill = document.getElementById('player-progress');

  if (state.currentItem && state.currentItem.isLive) {
    currentTimeText.textContent = "LIVE";
    totalTimeText.textContent = "Live Stream";
    timelineSlider.value = 100;
    progressFill.style.width = '100%';
    timelineSlider.disabled = true;
  } else {
    timelineSlider.disabled = false;
    // Format times as string (h:mm:ss or m:ss)
    currentTimeText.textContent = formatTime(state.playerCurrentTime);
    totalTimeText.textContent = formatTime(state.playerDuration);

    // Update slider position
    const percentage = (state.playerCurrentTime / state.playerDuration) * 100;
    timelineSlider.value = percentage || 0;
    progressFill.style.width = `${percentage}%`;
  }
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  
  const mStr = m.toString();
  const sStr = s.toString().padStart(2, '0');
  
  if (h > 0) {
    return `${h}:${mStr.padStart(2, '0')}:${sStr}`;
  }
  return `${m}:${sStr}`;
}

// ==========================================================================
// AMAZON PRIME STYLE PROFILE SELECTION AND MANAGEMENT SYSTEM
// ==========================================================================

// Global Chrome-style Loading helper
function showLoader(callback, duration = 1000) {
  const loader = document.getElementById('global-loader');
  if (!loader) {
    if (callback) callback();
    return;
  }
  loader.classList.remove('hidden');
  void loader.offsetWidth; // Trigger reflow for transition
  loader.classList.add('show');

  setTimeout(() => {
    if (callback) callback();
    setTimeout(() => {
      loader.classList.remove('show');
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 300);
    }, 200);
  }, duration);
}

// Generate the specific BLUE SKY logo from user screenshot
function generateBrandLogoSVG() {
  return `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" style="width: 170px; height: auto;">
    <!-- BLUE (Outlined Text) -->
    <text x="10" y="80" font-family="'Inter', sans-serif" font-weight="900" font-size="70" fill="none" stroke="#ffffff" stroke-width="2.5" letter-spacing="2">BLU</text>
    <!-- E in BLUE (Three horizontal bars) -->
    <g fill="#ffffff">
      <rect x="182" y="32" width="40" height="9" rx="1.5" />
      <rect x="182" y="51" width="34" height="9" rx="1.5" />
      <rect x="182" y="70" width="40" height="9" rx="1.5" />
    </g>
    <!-- SKY (Solid Hot Pink Text) -->
    <text x="238" y="80" font-family="'Inter', sans-serif" font-weight="900" font-size="70" fill="#e90064" letter-spacing="2">SKY</text>
  </svg>`;
}

// 1. Enter Your Name Page (First Entry Page)
function renderEnterNameForm() {
  const container = document.getElementById('welcome-container');
  if (!container) return;

  container.innerHTML = `
    <div class="profile-form-card" style="max-width: 400px; padding: 40px 30px;">
      <div style="display: flex; justify-content: center; margin-bottom: 25px;">
        ${generateBrandLogoSVG()}
      </div>
      <h2 style="margin-bottom: 20px; font-size: 24px; font-weight: 700; font-family: var(--font-title);">Enter your name</h2>
      <form onsubmit="event.preventDefault(); handleNameSubmit();">
        <div class="input-group" style="margin-bottom: 25px;">
          <input type="text" id="user-entry-name" autocomplete="off" placeholder=" " required minlength="2" maxlength="15">
          <label for="user-entry-name">Your Name</label>
          <div class="input-glow"></div>
        </div>
        <button type="submit" class="btn-primary" style="width: 100%; padding: 14px; border-radius: 8px; font-weight: 600; font-size: 15px; letter-spacing: 0.5px; font-family: var(--font-title);">
          Continue
        </button>
      </form>
    </div>
  `;

  setTimeout(() => {
    const input = document.getElementById('user-entry-name');
    if (input) input.focus();
  }, 100);
}

function handleNameSubmit() {
  const nameInput = document.getElementById('user-entry-name');
  const name = nameInput.value.trim();
  if (name.length < 2) return;

  const profiles = loadProfiles();
  // Check if profile with this name already exists
  let existingProfile = profiles.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!existingProfile) {
    // Create new profile with this name
    const avatarData = getUnusedAvatar(profiles, false);
    existingProfile = {
      id: 'p_' + Date.now(),
      name: name,
      avatarTemplateId: avatarData.avatarTemplateId,
      avatarUrl: avatarData.imageUrl,
      isKids: false,
      watchlist: []
    };
    profiles.push(existingProfile);
    localStorage.setItem('bluesky_profiles', JSON.stringify(profiles));
    state.profiles = profiles;
  }
  
  // Native redirect to index.html to show profile selection page
  window.location.href = 'index.html';
}

function generateBlueAvatarBase64() {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgBlue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#5fa5d9" />
        <stop offset="100%" stop-color="#175d9e" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bgBlue)" />
    <circle cx="50" cy="36" r="16" fill="#e1f0fa" />
    <path d="M 22,76 C 22,62 32,56 50,56 C 68,56 78,62 78,76 L 78,85 L 22,85 Z" fill="#e1f0fa" />
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

// Chubby star cartoon face (default Kids avatar)
function generateKidsAvatarBase64() {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f9b716" />
        <stop offset="100%" stop-color="#d47900" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bgGold)" />
    <path d="M 50,20 C 53,28 58,35 68,36 C 78,37 83,44 79,52 C 75,60 72,66 76,76 C 80,86 70,90 60,84 C 50,78 50,78 40,84 C 30,90 20,86 24,76 C 28,66 25,60 21,52 C 17,44 22,37 32,36 C 42,35 47,28 50,20 Z" fill="#ffe28a" />
    <circle cx="41" cy="48" r="4.5" fill="#442a08" />
    <circle cx="59" cy="48" r="4.5" fill="#442a08" />
    <ellipse cx="50" cy="57" rx="7" ry="5.5" fill="#442a08" />
    <circle cx="50" cy="55" r="2" fill="#ffe28a" />
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

function generateRedAvatarBase64() {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgRed" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#e65e53" />
        <stop offset="100%" stop-color="#a8251e" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bgRed)" />
    <circle cx="50" cy="36" r="16" fill="#fceae8" />
    <path d="M 22,76 C 22,62 32,56 50,56 C 68,56 78,62 78,76 L 78,85 L 22,85 Z" fill="#fceae8" />
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

function generateGreenAvatarBase64() {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGreen" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#5ec686" />
        <stop offset="100%" stop-color="#1e7845" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bgGreen)" />
    <circle cx="50" cy="36" r="16" fill="#ebf7ef" />
    <path d="M 22,76 C 22,62 32,56 50,56 C 68,56 78,62 78,76 L 78,85 L 22,85 Z" fill="#ebf7ef" />
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

function generatePurpleAvatarBase64() {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgPurple" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#b06ad9" />
        <stop offset="100%" stop-color="#63278f" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bgPurple)" />
    <circle cx="50" cy="36" r="16" fill="#f6eefa" />
    <path d="M 22,76 C 22,62 32,56 50,56 C 68,56 78,62 78,76 L 78,85 L 22,85 Z" fill="#f6eefa" />
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

function generateOrangeAvatarBase64() {
  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgOrange" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#f78f52" />
        <stop offset="100%" stop-color="#c45110" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#bgOrange)" />
    <circle cx="50" cy="36" r="16" fill="#fef2eb" />
    <path d="M 22,76 C 22,62 32,56 50,56 C 68,56 78,62 78,76 L 78,85 L 22,85 Z" fill="#fef2eb" />
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
}

const AVATAR_TEMPLATES = [
  { id: 'av_1', getUrl: generateBlueAvatarBase64, isKids: false },
  { id: 'av_2', getUrl: generateKidsAvatarBase64, isKids: true },
  { id: 'av_3', getUrl: generateRedAvatarBase64, isKids: false },
  { id: 'av_4', getUrl: generateGreenAvatarBase64, isKids: false },
  { id: 'av_5', getUrl: generatePurpleAvatarBase64, isKids: false },
  { id: 'av_6', getUrl: generateOrangeAvatarBase64, isKids: false }
];

function loadProfiles() {
  let profiles = JSON.parse(localStorage.getItem('bluesky_profiles'));
  const seeded = localStorage.getItem('bluesky_profiles_seeded');
  
  if (!profiles && !seeded) {
    // Seed default profiles matching user screenshots
    profiles = [
      { id: 'p_1', name: 'Ashish', avatarTemplateId: 'av_1', avatarUrl: generateBlueAvatarBase64(), isKids: false, watchlist: [] },
      { id: 'p_2', name: 'Kids', avatarTemplateId: 'av_2', avatarUrl: generateKidsAvatarBase64(), isKids: true, watchlist: [] }
    ];
    localStorage.setItem('bluesky_profiles', JSON.stringify(profiles));
    localStorage.setItem('bluesky_profiles_seeded', 'true');
  } else if (!profiles) {
    profiles = [];
  }
  state.profiles = profiles;
  return profiles;
}

function getUnusedAvatar(existingProfiles, isKidsSelected = false) {
  if (isKidsSelected) {
    return { avatarTemplateId: 'av_2', imageUrl: generateKidsAvatarBase64(), isKids: true };
  }
  const usedAvatarIds = existingProfiles.map(p => p.avatarTemplateId);
  // Find first unused silhouette avatar (skip av_2 since it is for Kids)
  const availableTemplate = AVATAR_TEMPLATES.find(t => t.id !== 'av_2' && !usedAvatarIds.includes(t.id));
  if (availableTemplate) {
    return { avatarTemplateId: availableTemplate.id, imageUrl: availableTemplate.getUrl(), isKids: false };
  }
  
  // Cycle non-kids templates if limit exceeded
  const idx = (existingProfiles.filter(p => !p.isKids).length) % 5;
  const templates = AVATAR_TEMPLATES.filter(t => t.id !== 'av_2');
  const template = templates[idx];
  return {
    avatarTemplateId: `custom_${Date.now()}_${idx}`,
    imageUrl: template.getUrl(),
    isKids: false
  };
}

function renderProfileSelection() {
  const container = document.getElementById('welcome-container');
  if (!container) return;

  const profiles = loadProfiles();
  
  let gridHTML = '';
  profiles.forEach(profile => {
    gridHTML += `
      <div class="profile-item" onclick="handleProfileClick('${profile.id}')">
        <div class="profile-avatar-wrapper" style="position: relative;">
          <div class="profile-avatar-card">
            <img src="${profile.avatarUrl}" alt="${profile.name}" style="width: 100%; height: 100%; object-fit: cover;">
            ${state.manageProfilesMode ? `
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; border-radius: 50%;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 32px; height: 32px; color: #fff;">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
            ` : ''}
          </div>
          ${state.manageProfilesMode ? `
            <button class="profile-direct-delete-btn" onclick="event.stopPropagation(); deleteProfile('${profile.id}')" title="Delete Profile">
              &times;
            </button>
          ` : ''}
        </div>
        <span class="profile-name-text">${profile.name}</span>
        ${profile.isKids ? `<span class="profile-kid-badge">KID</span>` : ''}
      </div>
    `;
  });

  if (profiles.length < 8 && !state.manageProfilesMode) {
    gridHTML += `
      <div class="profile-item" onclick="renderAddProfileForm()">
        <div class="profile-avatar-card add-card">
          <span>+</span>
        </div>
        <span class="profile-name-text">Add new</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="profile-selection-container">
      <h1 class="profile-selection-title">${state.manageProfilesMode ? 'Edit Profiles' : "Who's watching?"}</h1>
      <div class="profile-grid">
        ${gridHTML}
      </div>
      <button class="btn-profile-manage" onclick="toggleManageProfilesMode()">
        ${state.manageProfilesMode ? 'Done' : 'Edit profile'}
      </button>
      <div class="welcome-bottom-logo">
        ${generateBrandLogoSVG()}
      </div>
    </div>
  `;
}

function toggleManageProfilesMode() {
  state.manageProfilesMode = !state.manageProfilesMode;
  renderProfileSelection();
}

function handleProfileClick(profileId) {
  if (state.manageProfilesMode) {
    renderEditProfileForm(profileId);
  } else {
    selectProfile(profileId);
  }
}

// Transition helper for selecting profiles
function selectProfile(profileId) {
  const profiles = loadProfiles();
  const profile = profiles.find(p => p.id === profileId);
  if (!profile) return;

  localStorage.setItem('bluesky_active_profile_id', profile.id);
  localStorage.setItem('bluesky_username', profile.name);

  // Native reload to dashboard, spinning Chrome loader
  window.location.href = 'index.html';
}

function renderAddProfileForm() {
  const container = document.getElementById('welcome-container');
  if (!container) return;

  const profiles = loadProfiles();
  const nextAvatar = getUnusedAvatar(profiles, false);

  container.innerHTML = `
    <div class="profile-form-card">
      <h2 style="margin-bottom: 25px;">Create Profile</h2>
      <div class="form-avatar-preview" id="form-avatar-preview-box" style="background: none; overflow: hidden; border: 2px solid rgba(255,255,255,0.2);">
        <img id="form-avatar-preview-img" src="${nextAvatar.imageUrl}" alt="Avatar Preview" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <form onsubmit="event.preventDefault(); saveNewProfile();">
        <div class="input-group">
          <input type="text" id="new-profile-name" autocomplete="off" placeholder=" " required minlength="2" maxlength="15">
          <label for="new-profile-name">Profile Name</label>
          <div class="input-glow"></div>
        </div>
        
        <div class="kids-toggle-container" style="display: flex; align-items: center; justify-content: center; gap: 10px; margin: 20px 0 10px 0;">
          <input type="checkbox" id="profile-is-kids" style="width: 18px; height: 18px; cursor: pointer;" onchange="handleKidsCheckboxChange(this.checked)">
          <label for="profile-is-kids" style="font-size: 14px; color: var(--text-secondary); cursor: pointer; font-weight: 500;">Kids Profile?</label>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" onclick="cancelProfileForm()">Cancel</button>
          <button type="submit" class="btn-primary" style="flex: 1; padding: 15px; border-radius: 12px; font-weight: 600; font-size: 15px;">Save Profile</button>
        </div>
      </form>
    </div>
  `;

  // Global helper for checkbox changes inside the form
  window.handleKidsCheckboxChange = function(checked) {
    const previewImg = document.getElementById('form-avatar-preview-img');
    if (checked) {
      previewImg.src = generateKidsAvatarBase64();
    } else {
      const defaultUnused = getUnusedAvatar(profiles, false);
      previewImg.src = defaultUnused.imageUrl;
    }
  };

  setTimeout(() => {
    const input = document.getElementById('new-profile-name');
    if (input) input.focus();
  }, 100);
}

function renderEditProfileForm(profileId) {
  const container = document.getElementById('welcome-container');
  if (!container) return;

  const profiles = loadProfiles();
  const profile = profiles.find(p => p.id === profileId);
  if (!profile) return;

  container.innerHTML = `
    <div class="profile-form-card">
      <h2 style="margin-bottom: 25px;">Edit Profile</h2>
      <div class="form-avatar-preview" id="form-avatar-preview-box" style="background: none; overflow: hidden; border: 2px solid rgba(255,255,255,0.2);">
        <img id="form-avatar-preview-img" src="${profile.avatarUrl}" alt="Avatar Preview" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <form onsubmit="event.preventDefault(); updateProfile('${profile.id}');">
        <div class="input-group">
          <input type="text" id="edit-profile-name" autocomplete="off" placeholder=" " required minlength="2" maxlength="15" value="${profile.name}">
          <label for="edit-profile-name">Profile Name</label>
          <div class="input-glow"></div>
        </div>

        <div class="kids-toggle-container" style="display: flex; align-items: center; justify-content: center; gap: 10px; margin: 20px 0 10px 0;">
          <input type="checkbox" id="profile-is-kids" style="width: 18px; height: 18px; cursor: pointer;" ${profile.isKids ? 'checked' : ''} onchange="handleEditKidsCheckboxChange(this.checked)">
          <label for="profile-is-kids" style="font-size: 14px; color: var(--text-secondary); cursor: pointer; font-weight: 500;">Kids Profile?</label>
        </div>

        <div class="form-actions" style="flex-direction: column; gap: 10px;">
          <div style="display: flex; gap: 15px; width: 100%;">
            <button type="button" class="btn-secondary" onclick="cancelProfileForm()">Cancel</button>
            <button type="submit" class="btn-primary" style="flex: 1; padding: 15px; border-radius: 12px; font-weight: 600; font-size: 15px;">Save</button>
          </div>
          <button type="button" class="btn-secondary" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: var(--danger); border-radius: 12px; padding: 12px;" onclick="deleteProfile('${profile.id}')">
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  `;

  // Global helper for edit form checkbox changes
  window.handleEditKidsCheckboxChange = function(checked) {
    const previewImg = document.getElementById('form-avatar-preview-img');
    if (checked) {
      previewImg.src = generateKidsAvatarBase64();
    } else {
      if (profile.avatarTemplateId === 'av_2') {
        const defaultUnused = getUnusedAvatar(profiles.filter(p => p.id !== profileId), false);
        previewImg.src = defaultUnused.imageUrl;
      } else {
        previewImg.src = profile.avatarUrl;
      }
    }
  };

  setTimeout(() => {
    const input = document.getElementById('edit-profile-name');
    if (input) input.focus();
  }, 100);
}

function saveNewProfile() {
  const nameInput = document.getElementById('new-profile-name');
  const name = nameInput.value.trim();
  if (name.length < 2) return;

  const isKidsChecked = document.getElementById('profile-is-kids').checked;
  const profiles = loadProfiles();
  const avatarData = getUnusedAvatar(profiles, isKidsChecked);

  const newProfile = {
    id: 'p_' + Date.now(),
    name: name,
    avatarTemplateId: avatarData.avatarTemplateId,
    avatarUrl: avatarData.imageUrl,
    isKids: isKidsChecked,
    watchlist: []
  };

  profiles.push(newProfile);
  localStorage.setItem('bluesky_profiles', JSON.stringify(profiles));
  state.profiles = profiles;
  
  cancelProfileForm();
}

function updateProfile(profileId) {
  const nameInput = document.getElementById('edit-profile-name');
  const name = nameInput.value.trim();
  if (name.length < 2) return;

  const isKidsChecked = document.getElementById('profile-is-kids').checked;
  const profiles = loadProfiles();
  const profileIndex = profiles.findIndex(p => p.id === profileId);
  
  if (profileIndex !== -1) {
    const oldProfile = profiles[profileIndex];
    let newAvatarUrl = oldProfile.avatarUrl;
    let newTemplateId = oldProfile.avatarTemplateId;

    // If toggle kids changed, auto-update avatar accordingly
    if (isKidsChecked && !oldProfile.isKids) {
      newTemplateId = 'av_2';
      newAvatarUrl = generateKidsAvatarBase64();
    } else if (!isKidsChecked && oldProfile.isKids) {
      const defaultUnused = getUnusedAvatar(profiles.filter(p => p.id !== profileId), false);
      newTemplateId = defaultUnused.avatarTemplateId;
      newAvatarUrl = defaultUnused.imageUrl;
    }

    profiles[profileIndex].name = name;
    profiles[profileIndex].isKids = isKidsChecked;
    profiles[profileIndex].avatarTemplateId = newTemplateId;
    profiles[profileIndex].avatarUrl = newAvatarUrl;
    
    localStorage.setItem('bluesky_profiles', JSON.stringify(profiles));
    state.profiles = profiles;
  }

  cancelProfileForm();
}

function deleteProfile(profileId) {
  if (confirm('Are you sure you want to delete this profile? All its data will be lost.')) {
    let profiles = loadProfiles();
    profiles = profiles.filter(p => p.id !== profileId);
    localStorage.setItem('bluesky_profiles', JSON.stringify(profiles));
    state.profiles = profiles;
    
    const activeId = localStorage.getItem('bluesky_active_profile_id');
    if (activeId === profileId) {
      localStorage.removeItem('bluesky_active_profile_id');
      state.activeProfile = null;
      state.userName = '';
    }
    
    if (profiles.length === 0) {
      state.manageProfilesMode = false;
      renderEnterNameForm();
    } else {
      cancelProfileForm();
    }
  }
}

function cancelProfileForm() {
  window.location.href = 'index.html';
}

function renderQuickSwitchList() {
  const switchContainer = document.getElementById('other-profiles-list');
  if (!switchContainer) return;

  switchContainer.innerHTML = '';
  const profiles = loadProfiles();
  const otherProfiles = profiles.filter(p => p.id !== state.activeProfile.id);

  if (otherProfiles.length === 0) {
    switchContainer.innerHTML = '<p style="font-size:11px;color:#8197a4;padding-left:16px;margin:5px 0;">No other profiles</p>';
    return;
  }

  const title = document.createElement('p');
  title.className = 'dropdown-quick-switch-title';
  title.textContent = 'Switch Profile';
  switchContainer.appendChild(title);

  otherProfiles.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'profile-quick-switch-item';
    btn.innerHTML = `
      <div class="quick-switch-avatar" style="background: none; overflow: hidden;">
        <img src="${p.avatarUrl}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <span>${p.name}</span>
    `;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      localStorage.setItem('bluesky_active_profile_id', p.id);
      localStorage.setItem('bluesky_username', p.name);
      
      const isWatch = window.location.pathname.includes('watch.html');
      if (isWatch) {
        window.location.reload();
      } else {
        window.location.href = 'index.html';
      }
    });
    switchContainer.appendChild(btn);
  });
}

function showProfileSelector() {
  localStorage.removeItem('bluesky_active_profile_id');
  window.location.href = 'index.html';
}

function showAddProfileForm() {
  localStorage.removeItem('bluesky_active_profile_id');
  window.location.href = 'index.html?addProfile=true';
}

// 5. Sign Out Active Profile (returns directly to Enter name form with loader)
function signOutActiveProfile() {
  localStorage.removeItem('bluesky_active_profile_id');
  localStorage.removeItem('bluesky_username');
  state.activeProfile = null;
  state.userName = '';
  
  window.location.href = 'index.html';
}

function clearAllProfiles() {
  localStorage.removeItem('bluesky_profiles');
  localStorage.removeItem('bluesky_profiles_seeded');
  localStorage.removeItem('bluesky_active_profile_id');
  localStorage.removeItem('bluesky_username');
  location.reload();
}

// ==========================================================================
// DEDICATED SEARCH OVERLAY FUNCTIONS
// ==========================================================================
let activeSearchTag = 'India';

function openSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Lock background scroll
  
  const input = document.getElementById('overlay-search-input');
  if (input) {
    input.value = '';
    input.focus();
  }
  
  // Reset active tag to India
  activeSearchTag = 'India';
  const tags = document.querySelectorAll('.trending-tag');
  tags.forEach(tag => {
    if (tag.textContent.trim() === 'India') {
      tag.classList.add('active');
    } else {
      tag.classList.remove('active');
    }
  });
  
  renderSearchOverlayResults('');
}

function closeSearchOverlay() {
  const overlay = document.getElementById('search-overlay');
  if (!overlay) return;
  overlay.classList.add('hidden');
  document.body.style.overflow = ''; // Unlock scroll
  
  // Resume carousel if needed
  if (state.activeTab === 'all' && !state.searchQuery) {
    startCarouselAutoSlide();
  }
}

function setupSearchOverlayEvents() {
  const backBtn = document.getElementById('search-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', closeSearchOverlay);
  }
  
  const input = document.getElementById('overlay-search-input');
  const clearBtn = document.getElementById('overlay-clear-search-btn');
  if (input) {
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      if (val.trim()) {
        clearBtn.classList.remove('hidden');
      } else {
        clearBtn.classList.add('hidden');
      }
      renderSearchOverlayResults(val);
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.classList.add('hidden');
      renderSearchOverlayResults('');
      input.focus();
    });
  }
  
  // Chips filter selection
  const tags = document.querySelectorAll('.trending-tag');
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      activeSearchTag = tag.textContent.trim();
      
      const query = input ? input.value : '';
      renderSearchOverlayResults(query);
    });
  });
  
  // Mic voice assistant triggers
  const micBtn = document.querySelector('.search-mic-btn');
  if (micBtn) {
    micBtn.addEventListener('click', startVoiceSearch);
  }
  
  const voiceCancelBtn = document.getElementById('voice-cancel-btn');
  if (voiceCancelBtn) {
    voiceCancelBtn.addEventListener('click', () => {
      if (recognition) {
        recognition.stop();
      }
      showVoiceOverlay(false);
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchOverlay();
    }
  });
}

function renderSearchOverlayResults(query) {
  const grid = document.getElementById('overlay-search-results');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  // Filter mediaData
  const cleanQuery = query.trim().toLowerCase();
  
  let filtered = mediaData;
  
  // If there's an active tag filter
  if (activeSearchTag && !cleanQuery) {
    if (activeSearchTag === 'India') {
      // Show Hindi titles / Indian content
      filtered = mediaData.filter(item => item.hindiTitle || item.isTrending);
    } else if (activeSearchTag === 'Movies') {
      filtered = mediaData.filter(item => item.type === 'movies');
    } else if (activeSearchTag === 'Shows') {
      filtered = mediaData.filter(item => item.type === 'tv');
    } else if (activeSearchTag === 'Action') {
      filtered = mediaData.filter(item => item.genres.toLowerCase().includes('action'));
    } else if (activeSearchTag === 'Comedy') {
      filtered = mediaData.filter(item => item.genres.toLowerCase().includes('comedy'));
    } else if (activeSearchTag === 'Sports') {
      filtered = mediaData.filter(item => item.type === 'sports');
    }
  } else if (cleanQuery) {
    filtered = mediaData.filter(item => {
      return (
        item.title.toLowerCase().includes(cleanQuery) ||
        (item.hindiTitle && item.hindiTitle.toLowerCase().includes(cleanQuery)) ||
        item.subtitle.toLowerCase().includes(cleanQuery) ||
        item.description.toLowerCase().includes(cleanQuery) ||
        item.genres.toLowerCase().includes(cleanQuery) ||
        (item.cast && item.cast.toLowerCase().includes(cleanQuery))
      );
    });
  }
  
  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
        <h3 style="color: var(--text-primary); margin-bottom: 8px;">No results found</h3>
        <p style="font-size: 14px;">Try searching for something else or browse different tags.</p>
      </div>
    `;
    return;
  }
  
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'search-poster-card';
    card.innerHTML = `
      <div class="poster-img-wrapper">
        <img src="${item.image}" alt="${item.title}">
        ${item.isNewRelease ? `<span class="new-release-badge">NEW RELEASE</span>` : ''}
        <div class="poster-title-overlay">
          ${item.hindiTitle ? `<span class="poster-title-hindi">${item.hindiTitle}</span>` : ''}
          <span class="poster-title-english">${item.title}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => {
      closeSearchOverlay();
      openDetails(item.id);
    });
    grid.appendChild(card);
  });
}

let recognition = null;

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn("Speech Recognition API not supported in this browser.");
    return;
  }
  
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-IN'; // Optimized for Indian accents, names (Hinglish/Hindi)
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  
  recognition.onstart = () => {
    showVoiceOverlay(true, "Listening...");
  };
  
  recognition.onspeechend = () => {
    showVoiceOverlay(true, "Processing...");
  };
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    handleVoiceInputResult(transcript);
  };
  
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    let errorMsg = "Sorry, couldn't hear that.";
    if (event.error === 'not-allowed') {
      errorMsg = "Microphone permission denied.";
    }
    showVoiceOverlay(true, errorMsg);
    setTimeout(() => showVoiceOverlay(false), 2000);
  };
  
  recognition.onend = () => {
    const statusText = document.querySelector('.voice-status-text');
    if (statusText && (statusText.textContent === "Listening..." || statusText.textContent === "Processing...")) {
      showVoiceOverlay(false);
    }
  };
}

function startVoiceSearch() {
  if (!recognition) {
    setupSpeechRecognition();
  }
  
  if (!recognition) {
    alert("Speech recognition is not supported in your browser. Please try Chrome or Safari.");
    return;
  }
  
  try {
    recognition.start();
  } catch (e) {
    console.error("Speech recognition start failed:", e);
  }
}

function handleVoiceInputResult(transcript) {
  const input = document.getElementById('overlay-search-input');
  const clearBtn = document.getElementById('overlay-clear-search-btn');
  if (input) {
    input.value = transcript;
    if (clearBtn) {
      clearBtn.classList.remove('hidden');
    }
    renderSearchOverlayResults(transcript);
  }
  showVoiceOverlay(false);
}

function showVoiceOverlay(show, status = "Listening...") {
  const voiceOverlay = document.getElementById('voice-overlay');
  const statusText = document.querySelector('.voice-status-text');
  if (!voiceOverlay) return;
  
  if (show) {
    if (statusText) statusText.textContent = status;
    voiceOverlay.classList.remove('hidden');
  } else {
    voiceOverlay.classList.add('hidden');
  }
}
