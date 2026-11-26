// Static require map — React Native's bundler needs static require() paths,
// so imports can't be built dynamically from a loop. As you generate more
// items with the content skill, drop the JSON file in ./items/ and add one
// line here.

import { Lesson } from '../types/lesson';

import item001 from './items/item-001.json';
import item002 from './items/item-002.json';
import item003 from './items/item-003.json';

// import item010 from './items/item-010.json';
// import item011 from './items/item-011.json';
// ...continue for all 90 as they're generated

export const ALL_ITEMS: Lesson[] = [
  item001 as Lesson,
  item002 as Lesson,
  item003 as Lesson,
];

export const TOTAL_ITEMS = 90; // fixed — the book has 90 items, even before
                                // all lesson JSON files exist

export function getLessonByItemNumber(itemNumber: number): Lesson | undefined {
  return ALL_ITEMS.find((item) => item.item_number === itemNumber);
}
