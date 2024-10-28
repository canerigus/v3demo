import { describe, it, expect } from 'vitest';
import { sanitizeCurrentUnit } from './sanitizeUnit';

describe('sanitizeCurrentUnit', () => {
  it('should sanitize a unit with all properties', async () => {
    const unit = {
      id: 1,
      name: 'Archer',
      description: 'A ranged unit',
      age: 'Feudal Age',
      cost: {
        Wood: 50,
        Food: 0,
        Gold: 20,
      },
      build_time: 35,
      reload_time: 2,
      hit_points: 30,
      attack: 4,
      accuracy: '80%',
    };

    const sanitizedUnit = await sanitizeCurrentUnit(unit);

    expect(sanitizedUnit).toEqual({
      ID: 1,
      Name: 'Archer',
      Description: 'A ranged unit',
      "Min. Required Age": 'Feudal Age',
      "Wood Cost": 50,
      "Food Cost": 0,
      "Gold Cost": 20,
      "Build Time": 35,
      "Reload Time": 2,
      "Hit Points": 30,
      Attack: 4,
      Accuracy: '80%',
    });
  });

  it('should sanitize a unit with missing cost properties', async () => {
    const unit = {
      id: 2,
      name: 'Spearman',
      description: 'A melee unit',
      age: 'Dark Age',
      cost: {
        Wood: 35,
      },
      build_time: 22,
      reload_time: 3,
      hit_points: 45,
      attack: 3,
      accuracy: '90%',
    };

    const sanitizedUnit = await sanitizeCurrentUnit(unit);

    expect(sanitizedUnit).toEqual({
      ID: 2,
      Name: 'Spearman',
      Description: 'A melee unit',
      "Min. Required Age": 'Dark Age',
      "Wood Cost": 35,
      "Food Cost": 0,
      "Gold Cost": 0,
      "Build Time": 22,
      "Reload Time": 3,
      "Hit Points": 45,
      Attack: 3,
      Accuracy: '90%',
    });
  });

  it('should sanitize a unit with no cost properties', async () => {
    const unit = {
      id: 3,
      name: 'Militia',
      description: 'A basic infantry unit',
      age: 'Dark Age',
      build_time: 21,
      reload_time: 2,
      hit_points: 40,
      attack: 4,
      accuracy: '70%',
    };

    const sanitizedUnit = await sanitizeCurrentUnit(unit);

    expect(sanitizedUnit).toEqual({
      ID: 3,
      Name: 'Militia',
      Description: 'A basic infantry unit',
      "Min. Required Age": 'Dark Age',
      "Wood Cost": 0,
      "Food Cost": 0,
      "Gold Cost": 0,
      "Build Time": 21,
      "Reload Time": 2,
      "Hit Points": 40,
      Attack: 4,
      Accuracy: '70%',
    });
  });
});