
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'decisions';

IMPORTANT: use vercel dev, and not npm run dev, otherwise the db wueries might not work


-- First, create the ENUM type for the status column
CREATE TYPE decision_status AS ENUM ('pending', 'in process', 'completed');

-- Then, create the decisions table
CREATE TABLE decisions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  golden_ticket BOOLEAN NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  measurable_goal VARCHAR(255) NOT NULL,
  status decision_status NOT NULL,
  goal_met BOOLEAN,
  comments TEXT,
  goal_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




### **Table Name: `decisions`**

| Column Name       | Data Type      | Constraints                                              |
| ----------------- | -------------- | -------------------------------------------------------- |
| `id`              | `INT`          | `PRIMARY KEY`, `GENERATED ALWAYS AS IDENTITY`            |
| `golden_ticket`   | `BOOLEAN`      |                                                          |
| `title`           | `VARCHAR(255)` | `NOT NULL`                                               |
| `description`     | `TEXT`         | `NOT NULL`                                               |
| `measurable_goal` | `VARCHAR(255)` | `NOT NULL`                                               |
| `status`          | `ENUM`         | `NOT NULL`, pending, in process, completed
| `goal_met`        | `BOOLEAN`      |                                                          |
| `comments`        | `TEXT`         |                                                          |
| `goal_date`       | `TIMESTAMP`    |                                                          |
| `created_at`      | `TIMESTAMP`    |                                                          |
| `updated_at`      | `TIMESTAMP`    |                                                          |
