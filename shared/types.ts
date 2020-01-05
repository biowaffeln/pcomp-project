export interface State {
  name: string;
  hunger: number;
  happiness: number;
  health: number;
  connected: boolean;
  personality: Personality;
}

export type Personality = "happy" | "depressed";
