import getCookie from './csrf'

function getHeadersWithCSRF() {
    return {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken'),
        }
    }
}

export default getHeadersWithCSRF