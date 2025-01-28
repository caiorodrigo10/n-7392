export interface Deal {
  id: string;
  title: string;
  value: string;
  company: string;
  assignee: {
    name: string;
    avatar: string;
  };
  stageEnteredAt: Date;
  scheduledMeeting?: {
    date: string;
    time: string;
  };
}

export interface DealsState {
  lead: Deal[];
  qualification: Deal[];
  meet: Deal[];
  negotiation: Deal[];
  closed: Deal[];
  won: Deal[];
}