interface IRestaurant {
  id: number;
  name: string;
  averageRating: number;
  isKosher: boolean;
  cuisines: string[];
}

export default IRestaurant;
