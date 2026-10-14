export interface Transformation {
  id: string;
  before: string;
  after: string;
  treatment: string;
  stylist?: string;
  published: boolean;
}
// Publish only authentic, consented client photography.
export const transformations: Transformation[] = [];
