export function getImageURL(url, size) {
    return fetch('/api/get-resized-image/' + url, {
        method: 'POST',
        body: JSON.stringify({
            'width': size,
        })
    })
        .then(response => response.blob())
        .then(images => {
            return URL.createObjectURL(images)
        })
}
