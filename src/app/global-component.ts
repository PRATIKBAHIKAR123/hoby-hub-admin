export const GlobalComponent = {
    // Api Calling
    API_URL : 'https://api-node.themesbrand.website/',
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"https://api-node.themesbrand.website/auth/",

    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // Customers Api
    customer:'apps/customer',

    GOOGLE_MAPS_API_KEY: 'AIzaSyBu5_sJSqh-SG1-GjuFsbG6KVuNzs6vuSA',
   
}