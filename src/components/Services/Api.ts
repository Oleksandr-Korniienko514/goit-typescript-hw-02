import axios from 'axios';

interface ImageData {
    hits: {
        id: number;
        webformatURL: string;
        largeImageURL: string;
        tags: string;
    }[];
}

export const fetchImages = async (query: string, page = 1, controller?: AbortController): Promise<ImageData> => {
    const API_KEY = '45213588-1347783919d0c1f7f1631233d';
    const BASE_URL = 'https://pixabay.com/api/';

    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                page: page,
                per_page: 12,
            },
            signal: controller ? controller.signal : undefined,
        });

        return response.data;
    } catch {
        throw new Error('Failed to fetch images');
    }
};

export default fetchImages;
