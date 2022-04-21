export interface CarProps {
    id: string;
    brand: string;
    name: string;
    rent: {
      period: string;
      price: number;
    };
    thumbnail: string;
    fuel_type: string;
    accessories: CarAccessoriesProps[];
    about: string;
    photos: string[];
  };

  interface CarAccessoriesProps {
    type: string;
    name: string;
  }