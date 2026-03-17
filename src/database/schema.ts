export const SQLITE_SCHEMA_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS workout_plans (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    calories_estimate INTEGER DEFAULT 0,
    completion_rate INTEGER DEFAULT 0,
    is_favorite INTEGER DEFAULT 0,
    updated_at TEXT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS exercises (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    equipment TEXT,
    muscle_groups TEXT NOT NULL,
    instructions TEXT,
    updated_at TEXT NOT NULL
  );`,
  `CREATE TABLE IF NOT EXISTS workout_plan_exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_plan_id TEXT NOT NULL,
    exercise_id TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    sets INTEGER,
    reps INTEGER,
    rest_seconds INTEGER,
    FOREIGN KEY(workout_plan_id) REFERENCES workout_plans(id),
    FOREIGN KEY(exercise_id) REFERENCES exercises(id)
  );`,
  `CREATE TABLE IF NOT EXISTS workout_sessions (
    id TEXT PRIMARY KEY NOT NULL,
    workout_plan_id TEXT NOT NULL,
    performed_at TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    calories_burned INTEGER DEFAULT 0,
    notes TEXT,
    synced INTEGER DEFAULT 0,
    FOREIGN KEY(workout_plan_id) REFERENCES workout_plans(id)
  );`,
  `CREATE TABLE IF NOT EXISTS measurements (
    id TEXT PRIMARY KEY NOT NULL,
    recorded_at TEXT NOT NULL,
    weight_kg REAL,
    body_fat_percent REAL,
    chest_cm REAL,
    waist_cm REAL,
    arm_cm REAL,
    thigh_cm REAL,
    synced INTEGER DEFAULT 0
  );`,
  `CREATE TABLE IF NOT EXISTS personal_records (
    id TEXT PRIMARY KEY NOT NULL,
    exercise_id TEXT NOT NULL,
    value REAL NOT NULL,
    unit TEXT NOT NULL,
    achieved_at TEXT NOT NULL,
    notes TEXT,
    synced INTEGER DEFAULT 0,
    FOREIGN KEY(exercise_id) REFERENCES exercises(id)
  );`,
  `CREATE TABLE IF NOT EXISTS workout_reminders (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    time TEXT NOT NULL,
    days TEXT NOT NULL,
    enabled INTEGER DEFAULT 1
  );`,
  `CREATE TABLE IF NOT EXISTS sync_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    operation TEXT NOT NULL,
    payload TEXT NOT NULL,
    created_at TEXT NOT NULL
  );`,
];

export const SQLITE_TABLES = [
  'workout_plans',
  'exercises',
  'workout_plan_exercises',
  'workout_sessions',
  'measurements',
  'personal_records',
  'workout_reminders',
  'sync_queue',
];