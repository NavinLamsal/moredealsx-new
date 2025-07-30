import axios from "axios";
import {
  Blog,
  BusinessListType,
  CityListType,
  CompanyMeta,
  CountryListType,
  CurrencyListType,
  MetaData,
  PagesDataType,
  StatData,
} from "../type/CommonType";
import { EventDetails } from "../type/moreclub/Event";
import {
  Offer,
  OfferDetails,
  OfferResponse,
  OfferType,
} from "./PublicCommonClient";

export const getMetadata = async () => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}meta/company/information/`)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}helpcenter/company/information/`,
      { next: { tags: ["company information"], revalidate: 300 } }
    );

    const data = await res.json();
    return data.data as CompanyMeta;
  } catch (err) {
    const error = err as Error;
    return {
      name: "More Deals Club",
      description: "Save and Make Money with MoreDeals Club.",
      white_logo:
        "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/company_logos/Members_Club_1_kom9cy",
      black_logo:
        "https://res.cloudinary.com/dcsd8ukzn/image/upload/v1/media/company_logos/Members_Club_2_zfzc9k",
      address: "Nordenskiöldsgatan 87, 115 21 Stockholm,Sverige",
      city: "Stockholm",
      state: "Swden",
      zipcode: "11521",
      email: "info@moredealsclub.com",
      phone: "+46 76 327 76 40",
      website: "https://moredealsclub.com",
    };
  }
};

export const getBusinessList = async () => {
  try {
    // const res = await fetch(`https://moretrek.com/api/business/all/types/`)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}business/types/list/`
    );
    const data = await res.json();

    return data.data as BusinessListType[];
  } catch (err) {
    const error = err as Error;
    return [];
  }
};

export const getCountryList = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}country/list/`, {
      next: { tags: ["country list"], revalidate: 300 },
    });
    const data = await res.json();
    return data.data as CountryListType[];
  } catch (err) {
    const error = err as Error;
    return [];
  }
};

export const getCurrencyList = async (country: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}currency/list/?country=${country}`,
      { next: { tags: [`country list for ${country}`], revalidate: 300 } }
    );
    const data = await res.json();
    return data.data as CurrencyListType[];
  } catch (err) {
    const error = err as Error;
    return [];
  }
};

export const getCityList = async (country: string) => {
  // ${process.env.NEXT_PUBLIC_API_URL}country/${country}/by-id/cities/list/
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}country/${country}/cities/list/`,
      { next: { tags: [`cities list for ${country}`], revalidate: 300 } }
    );
    const data = await res.json();
    return data.data as CityListType[];
  } catch (err) {
    const error = err as Error;
    return [];
  }
};

export const getlegalPages = async (pagetype: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}helpcenter/${pagetype}/`,
      { next: { tags: [`${pagetype}`], revalidate: 300 } }
    );
    const data = await res.json();

    return data.data as PagesDataType[];
  } catch (err) {
    const error = err as Error;
    return [];
  }
};

export const getStatdata = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}helpcenter/home/data/`,
      { next: { tags: [`Stat Data`], revalidate: 300 } }
    );
    const data = await res.json();
    return data.data as StatData;
  } catch (err) {
    const error = err as Error;
    return {
      customer: 0,
      business: 0,
      lead: 0,
      verified_business: 0,
    };
  }
};

interface BlogResponse {
  data: Blog[];
  meta: MetaData;
}

export const fetchBlogs = async (
  pageParam: number = 1,
  searchQuery: string = ""
): Promise<BlogResponse> => {
  const endpoint = searchQuery
    ? `${process.env.NEXT_PUBLIC_API_URL}blogs/search/`
    : `${process.env.NEXT_PUBLIC_API_URL}blogs/list/`;

  const response = await axios.get(endpoint, {
    params: {
      title: searchQuery || undefined,
      page: pageParam,
    },
  });

  return {
    data: response.data.data,
    meta: {
      links: { next: null, previous: null },
      count: 10,
      page_number: pageParam,
      total_pages: pageParam,
    }, // ✅ Return pagination metadata
  };
};

export const fetchRecommendationBlogs = async (
  pageParam: number = 1,
  title?: string
): Promise<BlogResponse> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}blogs/similar/blog/`;

  const response = await axios.get(endpoint, {
    params: {
      slug: title,
      page: pageParam,
    },
  });

  return {
    data: response.data.data,
    meta: {
      links: { next: null, previous: null },
      count: 10,
      page_number: pageParam,
      total_pages: pageParam,
    }, // ✅ Return pagination metadata
  };
};

export const getBlogDetails = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}blogs/${slug}/detail/`,
      { next: { tags: [`Blog Detail for ${slug}`], revalidate: 300 } }
    );
    const data = await res.json();
    return data.data as Blog;
  } catch (err) {
    const error = err as Error;
    return {} as Blog;
  }
};

export const getOfferDetails = async (id: string) => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}moreoffers/${slug}/details/`, { next: { tags: [`Offer Detail for ${slug}`] ,revalidate: 300 }})
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}offers/details/${id}/ `,
      { next: { tags: [`Offer Detail for ${id}`], revalidate: 300 } }
    );
    console.log(res);
    const data = await res.json();
    console.log("offerDetail", data);
    return data.data as OfferType;
  } catch (err) {
    const error = err as Error;
    return {} as OfferType;
  }
};

export const fetchRecommendationOffers = async (
  pageParam: number = 1,
  title?: string
): Promise<{ data: Offer[]; meta: MetaData }> => {
  const endpoint = `${process.env.NEXT_PUBLIC_API_URL}moreoffers/list/`;

  const response = await axios.get(endpoint, {
    params: {
      slug: title,
      page: pageParam,
    },
  });

  return {
    data: response.data.data,
    meta: {
      links: { next: null, previous: null },
      count: 10,
      page_number: pageParam,
      total_pages: pageParam,
    }, // ✅ Return pagination metadata
  };
};

export const getEventDetails = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}events/${slug}/details/`,
      { next: { tags: [`Events Detail of ${slug}`], revalidate: 200 } }
    );
    const data = await res.json();
    return data.data as EventDetails;
  } catch (err) {
    const error = err as Error;
    return {} as EventDetails;
  }
};
