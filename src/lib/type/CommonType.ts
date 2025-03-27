export interface CompanyMeta {
  name: string;
  description: string;
  white_logo: string;
  black_logo: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
  phone: string;
  website: string;
}

//   about part home page

export interface Subheading {
  title: string;
  description: string;
}

export interface Testimonial {
  image: string;
  text: string;
  author: string;
  position: string;
}

export interface InfoItem {
  heading: string;
  subheadings: Subheading[];

  image: string;
}

export interface User {
  name: string;
  image: string;
  id: string;
  email: string;
  username: string;
  qr_code: string;
  user_profile: {
    phone_prefix: string;
    date_of_birth: string;
    secondary_phone_number: string;
    secondary_email: string;
    country_code: string;
    country: string | null;
    address: string | null;
    city: string | null;
    street: string | null;
    zip_code: string | null;
    house_no: string | null;
    gender: string;
    display_picture: string;
    expertise: string;
    interest: string;
  };
  token: string;
  refresh: string;
}

export type MetaData = {
  links: { next: string | null; previous: string | null };
  count: number;
  page_number: number;
  total_pages: number;
};

export type BusinessListType = {
  id: string;
  name: string;
  image: string;
  banner: string;
  address: string;
};

export type CountryListType = {
  id: number;
  name: string;
  code: string;
  icon: string;
  prefix_number: string;
};
export type CityListType = {
  country: number;
  image: string;
  id: number;
  name: string;
};

export type CurrencyListType = {
  id: number;
  name: string;
  code: string;
  symbol: string;
  icon: string;
};

export type PagesDataType = {
  title: string;
  description: string;
  image: string | null;
};

export interface Blog {
  id: number;
  title: string;
  slug: string;
  image: string;
  short_description: string;
  body: string;
  author: string;
  publish: string;
  status: string;
}
