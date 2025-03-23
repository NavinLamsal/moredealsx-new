export interface NetworkList {
  user: NetworkUser;
}

export interface NetworkUser {
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  display_picture: string;
}
