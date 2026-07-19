export interface Car {
  id: string;
  ref_number: string;
  make: string;
  model: string;
  year: number;
  price_usd: number;
  mileage: number | null;
  engine_cc: number | null;
  transmission: 'Automatic' | 'Manual' | 'CVT' | null;
  fuel_type: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric' | null;
  drive_type: '2WD' | '4WD' | 'AWD' | null;
  color: string | null;
  body_type: string | null;
  steering: string | null;
  doors: number | null;
  seats: number | null;
  chassis_number: string | null;
  engine_number: string | null;
  condition: 'Used' | 'New';
  grade: string | null;
  description: string | null;
  features: string[] | null;
  port_of_loading: string | null;
  status: 'Available' | 'Sold' | 'Reserved' | 'Pending';
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CarImage {
  id: string;
  car_id: string;
  url: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface CarWithImages extends Car {
  car_images: CarImage[];
}

export interface Inquiry {
  id: string;
  car_id: string | null;
  car_ref: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  country: string | null;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  created_at: string;
}

export interface ShippingRate {
  id: string;
  destination_country: string;
  destination_port: string;
  roro_price_usd: number | null;
  container_20ft_usd: number | null;
  container_40ft_usd: number | null;
  transit_days: number | null;
  notes: string | null;
  active: boolean;
  created_at: string;
}

export interface ExchangeRate {
  id: string;
  base_currency: string;
  target_currency: string;
  rate: number;
  updated_at: string;
}
