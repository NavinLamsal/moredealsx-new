import FoodList from "@/components/morefood/restaurant/FoodList";

export interface ResturantListType {
  id: string;
  name: string;
  slug: string;
  is_open: boolean;
  offers: string;
  banner: string;
  address: string;
  review_count: number;
  restaurant_rating: number;
}

export interface CategoryListType {
  name: string;
  icon: string;
  slug: string;
  active?: boolean;
}

export interface Restaurant {
  id: string; // "cdb7f165-2ecd-4973-8661-77d92eab7dd5",
  logo: string; // "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/restaurants/logo/majestic4_kqufuj",
  restaurant_rating: number; // 5.0,
  review_count: number; // 1,
  open_hrs: string; // "Closed",
  country_code: string; // "NP",
  city_id: string; // "082e4210-a58c-42af-9dd7-3c30c5fd3022",
  currency_code: string; // "NPR",
  currency_symbol: string; // "Rs",
  name: string; // "Daju Bhai Bhati PasaL",
  email: string; // "10sujitkhanal@gmail.com",
  contact_no: string; // "9854672134",
  address: string; // "Lakeside 16th street Pokhara ,Nepal",
  short_description: string; // "kldhweofojp'w;S'LDFGHITLOER3[OEP'W;/SLNKXFVBJDHGIEROJ'WSm?X",
  long_description: string; // "DUEHROIQKDSNJFBVKGURHWIJEOW;Lskdljvbuhwreiq;woL/S",
  lat: number; // 28.0,
  lng: number; // 36.0,
  timezone: string; // "Asia/Kathmandu",
  has_delivery: boolean; // true,
  has_pickup: boolean; // true,
  has_dine: boolean; // true,
  is_open: boolean; // true,
  min_order: number; // 1000,
  delivery_per_km: number; // 10,
  delivery_time: string; // "20",
  website_link: string; // "http://sujit.com",
  facebook_link: string; // "http://sujit.com",
  instagram_link: string; // "http://sujit.com",
  slug: string; // "siddhartha-gautam",
  banner: string; // "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/restaurants/banner/majestic4_y7qpzj"
  cuisine: string[];
  positive_review_count: number;
  negative_review_count: number;
}

export interface OpeningHours {
  id: string; // "3e529175-63ce-4372-8218-73cb3e6f3079",
  day: string; // "5d5394de-9ade-4fd6-b4f1-de187d2faea8",
  from_time: string; // "11:54",
  to_time: string; // "12:25",
  is_open: string; // "Closed"
}

export interface FoodCuisine {
  id: number; // Unique identifier for the cuisine
  image?: string | null; // Optional image for the cuisine
  name: string; // Name of the cuisine
}

export interface RelatedFoodItem {
  name: string;
  id: string; // Unique identifier for the related food item
  variationType: string; // Type of variation (if applicable)
  value: string; // Value of the variation (if applicable)
  price: number; // Price of the related food item
  discount_price: number; // Optional discounted price for the related item
}

export interface Variation {
  name: string;
  id: string; // Unique identifier for the variation
  value: string; // Variation name or value (e.g., "Small", "Large")
  price: number; // Price for this variation
  discount_price: number; // Optional discounted price for the variation
}

export interface FoodListType {
  food_items: FoodtypeswithMenu[];
  id: string;
  name: string;
}

export interface FoodtypeswithMenu {
  id: string; // Unique identifier for the food item
  restaurant_id: string; // Identifier for the restaurant
  restaurant_slug: string;
  price: number; // Original price of the item
  dis_price: number; // Discounted price (if applicable)
  description: string; // Full description of the item
  shortDescription?: string; // Optional short description
  currency_symbol: string; // Symbol of the currency (e.g., "$")
  currency_code: string; // ISO currency code (e.g., "USD")
  discount_percentage: number; // Discount percentage applied (if any)
  discount_price: string;
  cuisine: FoodCuisine[]; // Array of cuisines associated with the food item
  variations: Record<string, Variation[]>; // Variations of the food item, grouped by type
  related_food_items: RelatedFoodItem[]; // Array of related food items
  has_variation: boolean;
  name: string; // Name of the food item
  image?: string | null; // Optional image URL for the food item
  ingredient?: string; // Optional ingredients list
}

export interface CartFoodItemsTypes {
  id: string;
  restaurant_id: string;
  restaurant_slug: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  currency_symbol: string;
  currency_code: string;
  related_food_item: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface CartFoodOfferTypes {
  id: string;
  restaurant_slug: string;
  name: string;
  image: string;
  price: number;
  description: string;
  currency_symbol: string;
  currency_code: string;
  quantity: number;
}

export interface OfferType {
  id: string; //"c1d5eb8f-d5f2-4834-bd28-b413f784ceba";
  name: string; // "Daju Bhai Bhati PasaL offer";
  price: string; // 800;
  description: string; // "authenic swedish dishes";
  banner: string;
  restaurant_slug: string; // "daju-bhai-bhati-pasal-offer";
  food_item: {
    id: string;
    name: string;
    variation_type: string;
    value: string;
    image: string;
    ingredients: string;
  }[];
  start_date: string; // "2025-03-20";
  end_date: string; // "2025-03-26";
  currency_symbol: string; // "Rs";
  currency_code: string; // "NPR";
}

export interface CheckoutFormTypes {
  step: number;
  deliverytype: string;
  receiverName: string;
  mobileNumber: string;
  receiverEmail: string;
  note: string;
  arrivalTime: string;
  location: string;
  lat: number;
  lon: number;
}

// export interface FoodOrderTypes {
//   restaurant_slug: string;
//   order_type: string;
//   items:{
//     food_item?: string;
//     quantity:number
//     offer?:string
//     related_food_item?: string[]
//   }[];
//   // offer_items: { [id: string]: orderItem };
//   full_name: string;
//   phone_no: string;
//   // payment_method: string;
//   address?: string;
//   lat?: string;
//   lng?: string;
//   pin: string;
//   arrival_time?: string;
//   platform: string;
//   note?: string;
// }

export interface FoodOrderTypes {
  restaurant: string;
  order_type: string;
  items: {
    food_item?: string;
    quantity: number;
    offer?: string;
    related_food_items?: string[];
  }[];
  receiver_name: string;
  phone_no: string;
  address?: string;
  lat?: string;
  lng?: string;
  pin: string;
  arrival_time?: string;
  platform: string;
  note?: string;
}

export interface MoreDealOrderTypes {
  restaurant_slug: string;
  order_type: string;
  items: {
    food_item?: string;
    quantity: number;
    offer?: string;
    related_food_item?: string[];
  }[];
  full_name: string;
  phone_no: string;
  payment_method: string;
  address?: string;
  lat?: string;
  lng?: string;
  pin: string;
  arrival_time?: string;
  platform: string;
  note?: string;
}

export interface orderItem {
  id: string;
  price: number;
  quantity: number;
}

export interface orderFoodItem {
  id: string;
  price: number;
  description: string;
  name: string;
  quantity: number;
  related_food_item: string[];
}

export interface Review {
  comment: string;
  created_at: string;
  id: string;
  image: string[];
  rating: number;
  restaurant: {
    id: string;
    logo: string;
    name: string;
    slug: string;
  };
  user: { first_name: string; last_name: string };
}

export interface ImagesList {
  id: string;
  image: string;
}

export type FoodItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
};

export type Order = {
  order_id: string;
  created: string; // ISO date format
  order_status: string;
  order_type: string;
  restaurant_name: string;
  items: OrderItem[];
};

export type OrderItem = {
  food_item?: OrderFoodItem;
  offer?: OrderOffer;
  related_food_items?: any[];
};

export type OrderFoodItem = {
  food_item_name: string;
  food_item_image: string;
  quantity: number;
};

export type OrderOffer = {
  offer_id: string;
  offer_name: string;
  quantity: number;
  offer_banner: string;
};

export interface Order_Restaurant {
  name: string;
  phone_number: string;
  lat: number;
  lng: number;
  address: string;
}

export interface OrderDetail_foodItem {
  name: string;
  image: string;
  quantity: number;
  price: number;
}
export interface OrderDetail_offerItem {
  offer_id: string;
  offer_name: string;
  quantity: number;
  offer_banner: string;
  offer_price: number;
}

export interface OrderDetail_RelatedFooditem {
  name: string;
  image: string;
}

export interface OrderDetail_orderItem {
  food_item: OrderDetail_foodItem;
  offer: OrderDetail_offerItem;
  related_food_items: OrderDetail_RelatedFooditem[];
}

export interface OrderDetail {
  order_id: string;
  restaurant: Order_Restaurant;
  receiver_name: string;
  email: string | null;
  arrival_time: string | null;
  phone_no: string;
  order_status: string;
  order_type: string;
  lat: number;
  lng: number;
  no_of_people: number | null;
  address: string;
  ordered_date: string;
  note: string | null;
  currency: string | null;
  payment_method: string;
  user_sent_amount: string;
  transaction_id: string | null;
  refferal_points_id: string | null;
  items: OrderDetail_orderItem[];
  order_total_price: number;
}
