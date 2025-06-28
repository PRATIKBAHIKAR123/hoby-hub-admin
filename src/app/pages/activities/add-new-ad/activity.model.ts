export interface LocationData {
  id: string;
  address: string;
  area: string;
  city: string; 
  state: string;
  country: string;
  pincode: string;
  latitude: string;
  longitude: string;
  road: string;
}

export interface Contact {
  id: string;
  tutorFirstName: string;
  tutorLastName: string;
  tutorCountryCode: string;
  tutorPhoneNo: string;
  whatsappCountryCode: string;
  whatsappNo: string;
  tutorIntro?: string;
  tutorEmailID: string;
  contactType?: {
    primary: boolean;
    secondary: boolean;
    billing: boolean;
  }
}

export interface Category {
  id: number;
  title: string;
  subcategories: SubCategory[];
}

export interface SubCategory {
  id: number; 
  title: string;
  categoryId: number;
}

export interface ClassCourseDetails {
  id: number;
  title: string;
  subCategoryID: string;
  categoryID: string;
  timingsFrom: string;
  timingsTo: string;
  day: string;
  type: 'Online' | 'Offline';
  ageFrom: number;
  ageTo: number;
  sessionFrom: number;
  sessionTo: number;
  gender: string;
  fromPrice: number;
  toPrice: number;
  location: LocationData;
  contact: Contact;
  weekdays: string[];
  experienceLevel: string;
  className: string;
}

export interface Activity {
    id: number;
    vendorId: number;
    type: string;
    categoryId: number;
    subCategoryId: string | null;
    title: string;
    description: string;
    thumbnailImage: string;
    sessionCountFrom: number;
    sessionCountTo: number;
    ageRestrictionFrom: number;
    ageRestrictionTo: number;
    rate: number;
    currency: string | null;
    address: string | null;
    road: string | null;
    area: string;
    state: string;
    city: string;
    pincode: string;
    country: string;
    longitude: string | null;
    latitude: string | null;
    companyName: string;
    tutorFirstName: string | null;
    tutorLastName: string | null;
    tutorEmailID: string | null;
    tutorCountryCode: string | null;
    tutorPhoneNo: string | null;
    whatsappCountryCode: string | null;
    whatsappNo: string | null;
    tutorIntro: string | null;
    website: string | null;
    classLevel: string | null;
    instagramAcc: string | null;
    youtubeAcc: string | null;
    profileImage: string | null;
    sinceYear: string | null;
    gstNo: string | null;
    iconActivityType: string | null;
    approved: boolean;
    approvedDateTime: string | null;
    isCreatedByAdmin: boolean;
    createdDate: string | null;
    viewCount: number;
    images: string[];
    classDetails: ClassCourseDetails[] | null;
    courseDetails: any[] | null;
}

export interface VendorActivity {
    id: number;
    vendorId: number;
    type: string;
    categoryId: number;
    subCategoryId: number | null;
    title: string;
    description: string;
    thumbnailImage: string;
    sessionCountFrom: number;
    sessionCountTo: number;
    ageRestrictionFrom: number;
    ageRestrictionTo: number;
    area: string;
    state: string;
    city: string;
    pincode: string;
    country: string;
    viewCount: number;
    distanceInKm: number;
}