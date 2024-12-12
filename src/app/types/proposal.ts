export interface Proposal {
  id: number;
  typeId: number;
  kategoriId: number;
  statusId: number;
  title: string;
  shortTitle: string;
  publicCode?: string; // Optional field
  number: string;
  resume: string | null; // Optional field
  periodId: number;
  updatedAt: Date;
}
