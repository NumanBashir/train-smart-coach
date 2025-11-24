export interface Category {
  technical: string[];
  tactical: string[];
  physical: string[];
  gameSituations: string[];
}

export interface Equipment {
  name: string;
  quantity: number;
  bibColorQuantities: number[];
}

export interface Drill {
  _id: string;
  title: string;
  description: string;
  images: string[];
  ageGroup: string[];
  category: Category;
  minPlayers: number;
  maxPlayers: number;
  equipment: Equipment[];
  duration: number;
}

export interface SessionDrill {
  drillId: string | Drill;
  duration: number;
  order: number;
}
