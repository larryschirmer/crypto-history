export type Token = {
  name: string;
  amount: string;
  value: string;
};

export type Snapshot = {
  day: string;
  portfolio: Token[];
}

export type History = Snapshot[]; 
