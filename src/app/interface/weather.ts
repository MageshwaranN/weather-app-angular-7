export interface Weather {
  date: string;
  climate: Climate[];
}

export interface Climate {
  hours: string;
  state: string;
  temperature: number;
}
