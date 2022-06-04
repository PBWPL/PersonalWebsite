export interface Feeling<TimeType = Date> {
  full_date: TimeType;
  mood: keyof typeof MoodMap;
  activities: (keyof typeof ActivityMap)[];
  note_title: string | null;
  note: string | null;
}

export enum MoodMap {
  '😒' = 'awful',
  '🤨' = 'bad',
  '😐' = 'meh',
  '😄' = 'good',
  '😆' = 'rad'
}

export enum ActivityMap {
  '👨‍👩‍👧‍👦' = 'family',
  '💬' = 'friends',
  '❤️' = 'date',
  '🥳' = 'party',
  '🛩️' = 'travel',
  '🍿' = 'cinema',

  '📺' = 'movies & tv',
  '📖' = 'reading',
  '🕹' = 'gaming',
  '🏋️‍♂️' = 'sport',
  '💆‍♂️' = 'relax',
  '👨‍💻' = 'coding',
  '🎧' = 'music',
  '🎸' = 'guitar',

  '🛌' = 'good sleep',
  '⏰' = 'sleep early',
  '😴' = 'bad sleep',

  '🥕' = 'eat healthy',
  '🍟' = 'fast food',
  '🥘' = 'homemade',
  '🍽️' = 'restaurant',
  '🥡' = 'delivery',
  '🥗' = 'no meat',
  '☕' = 'coffee',
  '🍵' = 'tea',

  '🚰' = 'drink water',
  '🚶‍♂️' = 'walk',
  '🏃‍♂️' = 'run',

  '🧘‍♂️' = 'meditation',
  '🤗' = 'kindness',
  '👂' = 'listen',
  '💸' = 'donate',
  '🎁' = 'give gift',

  '🛒' = 'shopping',
  '🧹' = 'cleaning',
  '👨‍🍳' = 'cooking',
  '💪' = 'physical work',
  '💼' = 'work'
}
