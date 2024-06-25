require('dotenv').config();
const apiKey = process.env.GOOGLE_API_KEY;

const AxiosBuilder = require('../config/AxiosClient');
const axiosClient = new AxiosBuilder(apiKey).getClient();


class GoogleBooks {
    constructor() {
        this.baseUrl = 'https://www.googleapis.com/books/v1/volumes';
    }

    // Extract the information out of the google's response payload
    flattenResponse(response){
        //creates an array of objects with the volume data
        const volumeArray = response.data.items.flatMap(item => item.volumeInfo);
        const finalArray = volumeArray.map( 
            ({title, authors = [], categories = []}) => 
            ({
                title,
                authors: authors.join(', '),
                categories: categories.join(', ')
            })); 
        return finalArray;  
    }

    async getBooksByTitle(title) {
        try {
            const response = await axiosClient.get(`${this.baseUrl}?q=intitle:${title}`);

            // Somehow the request failed
            if(response.status !== 200 || !response.data || response.data.items === 0) {             
                console.error(`Error fetching books by title: ${title}`);
                return [];
            }
            
            console.log(`Successfully retrieved books by title: ${title}`);
            return this.flattenResponse(response);
        } catch (error) {
            console.error(`Error fetching books by title: ${title}`, error);
            throw error;
        }
    }

    async getBooksByAuthor(author) {
        try {
            const response = await axiosClient.get(`${this.baseUrl}?q=inauthor:"${author}"`);

            // Somehow the request failed
            if(response.status !== 200 || !response.data || response.data.items === 0) {             
                console.error(`Error fetching books by author: ${author}`, error);
                return [];
            }

            console.log(`Successfully retrieved books by author: ${author}`);
            return this.flattenResponse(response);
        } catch (error) {
            console.error(`Error fetching books by author: ${author}`, error);
            throw error;
        }
    }

    async getBooksByGenre(genre) {
        try {
            const response = await axiosClient.get(`${this.baseUrl}?q=subject:${genre}`);
            
            // Somehow the request failed
            if(response.status !== 200 || !response.data || response.data.items === 0) {             
                console.error(`Error fetching books by genre: ${genre}`, error);
                return [];
            }
            
            console.log(`Successfully retrieved books by genre: ${genre}`);
            return this.flattenResponse(response);
        } catch (error) {
            console.error(`Error fetching books by genre: ${genre}`, error);
            throw error;
        }
    }
}

module.exports = new GoogleBooks();
