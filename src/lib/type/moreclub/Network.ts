export interface NetworkList {
  id: string;
  user: NetworkUser;
  created: string;
}

export interface NetworkUser {
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  display_picture: string;
  user_id: string;
}
