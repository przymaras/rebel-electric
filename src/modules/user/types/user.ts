export interface IUser {
  _id: string;
  password: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  yearOfBirth: string;
  gender: string;
  description: string;
  avatarImage: string;
  coverImage: string;
  testsResults: string;
  profileViewsCount: string;
  profileLikesCount: string;
  profileVehiclesCount: string;
  badges: string[];
}
