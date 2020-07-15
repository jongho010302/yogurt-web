export interface Ticket {
  lessonType: string;
  lessonCount: string;
  title: string;
  availablePeriod: string;
  price: string;
  isSelling: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketState {
  ticketDetail: any;
  ticketList: Ticket[];
}