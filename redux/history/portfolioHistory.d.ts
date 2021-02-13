export type Token = {
  name: string;
  amount: number;
  value: number;
};

export type Snapshot = {
  day: string;
  portfolio: Token[];
}

export type History = Snapshot[]; 
