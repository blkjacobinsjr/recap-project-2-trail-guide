DROP TABLE IF EXISTS trails;
DROP TABLE IF EXISTS regions;

CREATE TABLE regions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE trails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    difficulty TEXT NOT NULL,
    region_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(region_id) REFERENCES regions(id) ON DELETE CASCADE
);

INSERT INTO regions (name, country, slug) VALUES 
('Bavarian Alps', 'Germany', 'bavarian-alps'),
('Scottish Highlands', 'UK', 'scottish-highlands');

INSERT INTO trails (title, slug, difficulty, region_id) VALUES 
('Zugspitze Summit', 'zugspitze-summit', 'hard', 1),
('Ben Nevis Path', 'ben-nevis-path', 'moderate', 2);
