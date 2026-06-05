export type TerritoryType = 'sovereign' | 'dependent' | 'disputed' | 'administrative';

export interface SourceMetadata {
  name: string;
  url?: string;
  version?: string;
}

export interface Country {
  iso2: string;
  iso3: string;
  numeric: string;
  name: string;
  territoryType: TerritoryType;
  parentTerritory?: string;
  commerceSelectable: boolean;
  confidence: number;
  sources: string[];
  updatedAt: string;
}
