export type UserRole = {
  id: number
  name: string
  label: string
  created_at: string | null
  updated_at: string | null
}

export type UserBrand = {
  name: string
  domain: string
  logo: string
  support_page_url: string
  mail_from_name: string
  mail_from_address: string
}

export type TeamBrand = {
  id: number
  label: string
  created_at: string
  updated_at: string
}

export type TeamPivot = {
  user_id: number
  team_id: number
  team_role_id: number
}

export type NestedUser = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  phone_verified: boolean
  otp_enabled: boolean
  email_verified_at: string | null
  is_root: boolean
  blocked: boolean
  dark_theme: boolean
  created_at: string | null
  updated_at: string
  current_team_id: number | null
  chargebee_customer_id: string | null
  last_login: string | null
  laravel_through_key: number
  email_verified: boolean
  is_admin: boolean
}

export type Team = {
  id: number
  name: string
  slug: string
  allow_support_access: boolean
  reseller: boolean
  parent_team_id: number | null
  brand_id: number | null
  archived: boolean
  created_at: string
  updated_at: string
  chargebee_subscription_id: string | null
  subscription_status: string | null
  pivot: TeamPivot
  owner: NestedUser | null
  parent_team: Team | null
  brand?: TeamBrand
}

export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  phone_verified: boolean
  otp_enabled: boolean
  is_root: boolean
  blocked: boolean
  dark_theme: boolean
  created_at: string | null
  updated_at: string | null
  chargebee_customer_id: string | null
  last_login: string | null
  role: UserRole
  current_team: Team
  brand: UserBrand
  email_verified: boolean
  is_admin: boolean
  teams: Team[]
}

export type UserLoadingState = {
  getUser: boolean
}

export type UserErrorState = {
  getUser: unknown
}
