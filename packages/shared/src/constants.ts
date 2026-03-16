export const USER_ROLES = ['customer', 'provider', 'admin'] as const;

export const SERVICE_CATEGORIES = [
  'plumbing',
  'electrical',
  'appliance_repair',
  'computer_help',
  'phone_repair',
  'tv_mounting',
  'car_battery_help',
  'oil_change_help',
  'tire_help',
  'furniture_assembly',
  'handyman',
] as const;

export const REQUEST_STATUSES = [
  'open',
  'matched',
  'accepted',
  'in_progress',
  'completed',
  'canceled',
] as const;

export const URGENCY_LEVELS = ['low', 'medium', 'high', 'asap'] as const;

export const AVAILABILITY_STATUSES = ['available', 'busy', 'offline'] as const;

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  appliance_repair: 'Appliance Repair',
  computer_help: 'Computer Help',
  phone_repair: 'Phone Repair',
  tv_mounting: 'TV Mounting',
  car_battery_help: 'Car Battery Help',
  oil_change_help: 'Oil Change Help',
  tire_help: 'Tire Help',
  furniture_assembly: 'Furniture Assembly',
  handyman: 'Handyman',
};

export type UserRole = (typeof USER_ROLES)[number];
export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];
export type RequestStatus = (typeof REQUEST_STATUSES)[number];
export type UrgencyLevel = (typeof URGENCY_LEVELS)[number];
export type AvailabilityStatus = (typeof AVAILABILITY_STATUSES)[number];
