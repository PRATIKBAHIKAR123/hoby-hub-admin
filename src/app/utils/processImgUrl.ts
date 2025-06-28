import { environment } from "src/environments/environment.prod";

   export function processImageUrl(url: string): string {
        if (!url) return '';
        
        // If the URL is already absolute, return it as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // If the URL is relative, prepend the API base URL
        return `${environment.imageUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }