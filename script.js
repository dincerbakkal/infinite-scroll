const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'CHMKShS4-TBNqraT_oB7mMITCwZQ5ZvGp2BiKCTImzk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;

    }
}
// Helper Function to Set Attributes on Dom Elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
//Create Elements For Links & Photos, Add TO Dom
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        const img = document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}
//Get Photos
async function getPhotos(){
    try {
        
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    } catch (error) {
        
    }
}
//Check to see if scrolling near bottom of page,Load More Photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
        
    }
})

//On Load
getPhotos();