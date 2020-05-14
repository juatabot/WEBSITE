export function getImageURL(url) {
    return fetch('/api/get-image/' + url)
        .then(response => response.blob())
        .then(images => {
            return URL.createObjectURL(images)
        })
}

