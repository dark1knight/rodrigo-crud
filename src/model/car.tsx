export interface Car {
    id: number;
    name: string;
    status: string;
    photoID: number | null;
    photo?: {
      id: number;
      base64: string;
    };
  }