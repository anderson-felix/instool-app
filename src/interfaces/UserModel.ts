export interface User {
  username: string;
  full_name: string;
  biography: string;
  profile_pic_url: string;
  external_url: string;
  is_joined_recently: boolean;
  is_private: boolean;
  has_channel: boolean;
  is_business_account: boolean;
  business_category_name: string;
  follow: number;
  followed_by: number;
  timeline_media_count: number;
  error?:string
}