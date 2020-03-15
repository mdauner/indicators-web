export interface Data {
  [date: string]: string;
}

export interface DataSet {
  id: number;
  country: string;
  indicator: Indicator;
  data: Data;
}

export type Indicator =
  | 'SP.POP.TOTL'
  | 'NY.GDP.MKTP.CD'
  | 'EN.ATM.CO2E.PC'
  | 'SP.DYN.LE00.IN'
  | 'TX.VAL.TECH.MF.ZS'
  | 'IP.PAT.NRES'
  | 'IP.PAT.RESD';
