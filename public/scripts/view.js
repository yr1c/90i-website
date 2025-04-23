
    let viewCount = localStorage.getItem('viewCount') ? parseInt(localStorage.getItem('viewCount')) : 0;
    viewCount++;

    localStorage.setItem('viewCount', viewCount);

    const counterElement = document.getElementById('viewCounter');
    const viewCountText = document.getElementById('viewCountText');
    viewCountText.innerText = `${viewCount}`;

    function fadeInCounter() {
      counterElement.style.display = 'flex';
      setTimeout(() => {
        counterElement.classList.add('visible');
      }, 10);
    }

    fadeInCounter();