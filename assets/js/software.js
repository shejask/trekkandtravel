document.addEventListener('DOMContentLoaded', () => {
    const wallpaperElement = document.getElementById('wallpaper');
    const changeWallpaperButton = document.getElementById('changeWallpaper');

    const fetchRandomNatureImage = () => {
        fetch('https://picsum.photos/1920/1080?query=nature')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.url;
            })
            .then(imageUrl => {
                wallpaperElement.src = imageUrl;
            })
            .catch(error => console.error('Error fetching wallpaper:', error));
    };

    // Initial wallpaper load
    fetchRandomNatureImage();

    // Automatically change nature wallpaper every 30 seconds
    const intervalId = setInterval(fetchRandomNatureImage, 10000);

    // Uncomment the following lines if you want to stop the interval when the button is clicked
    // changeWallpaperButton.addEventListener('click', () => {
    //     clearInterval(intervalId);
    // });
});
