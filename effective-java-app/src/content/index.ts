// Static require map — React Native's bundler needs static require() paths,
// so imports can't be built dynamically from a loop. As you generate more
// items with the content skill, drop the JSON file in ./items/ and add one
// line here.

import { Lesson } from '../types/lesson';

import item001 from './items/item-001.json';
import item002 from './items/item-002.json';
import item003 from './items/item-003.json';
import item004 from './items/item-004.json';
import item005 from './items/item-005.json';
import item006 from './items/item-006.json';
import item007 from './items/item-007.json';
import item008 from './items/item-008.json';
import item009 from './items/item-009.json';
import item010 from './items/item-010.json';
import item011 from './items/item-011.json';
import item017 from './items/item-017.json';
import item080 from './items/item-080.json';

// ...continue for all 90 as they're generated

export const ALL_ITEMS: Lesson[] = [
  item001 as Lesson,
  item002 as Lesson,
  item003 as Lesson,
  item004 as Lesson,
  item005 as Lesson,
  item006 as Lesson,
  item007 as Lesson,
  item008 as Lesson,
  item009 as Lesson,
  item010 as Lesson,
  item011 as Lesson,
  item017 as Lesson,
  item080 as Lesson,
];

export const TOTAL_ITEMS = 90; // fixed — the book has 90 items, even before
                                // all lesson JSON files exist

export function getLessonByItemNumber(itemNumber: number): Lesson | undefined {
  return ALL_ITEMS.find((item) => item.item_number === itemNumber);
}
