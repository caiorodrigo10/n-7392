export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Contact extends BaseEntity {
  name: string;
  email: string;
  location: string;
  flag: string;
  status: "Active" | "Inactive" | "Pending";
  balance: number;
  department: string;
  role: string;
  joinDate: string;
  lastActive: string;
  performance: "Excellent" | "Good" | "Average" | "Poor";
}

export interface Company extends BaseEntity {
  name: string;
  industry: string;
  location: string;
  employees: number;
  revenue: number;
  status: "Active" | "Inactive";
}

export interface Deal extends BaseEntity {
  title: string;
  value: number;
  stage: "Lead" | "Proposal" | "Negotiation" | "Closed";
  company: string;
  contact: string;
  closeDate: string;
}