const BASE_URL = 'http://localhost:3050';

export async function addContactToMailchimp (emailId:string) {
    try {
        const response = await window.fetch(BASE_URL + '/audience/contacts', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailId
            })
        });
        const result = await response.json()

        return result
    } catch (error){
        throw error
    }
}