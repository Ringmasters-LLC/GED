import measurementData from '../../../data/canonical/measurement-systems.json';
import { MeasurementSystem, PreferredUnits } from './types';

export const measurementSystems: MeasurementSystem[] =
  measurementData as any as MeasurementSystem[];

export const getMeasurementSystem = (iso2: string): MeasurementSystem | null => {
  return measurementSystems.find((m) => m.iso2.toUpperCase() === iso2.toUpperCase()) || null;
};

export const getPreferredUnits = (iso2: string): PreferredUnits | null => {
  const system = getMeasurementSystem(iso2);
  if (!system) return null;

  // Default metric preferences
  const defaults: PreferredUnits = {
    temperature: 'celsius',
    distance: 'kilometer',
    weight: 'kilogram',
    height: 'centimeter',
    paperSize: 'A-series',
  };

  // Override with country-specific data
  return {
    temperature: system.temperature || defaults.temperature,
    distance: system.distance || defaults.distance,
    weight: system.weight || defaults.weight,
    height: system.height || defaults.height,
    paperSize: system.paperSize || defaults.paperSize,
  };
};
