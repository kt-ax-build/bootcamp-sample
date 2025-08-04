CREATE TABLE teams (
    id BIGSERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE,
    team_size VARCHAR(50),
    team_description TEXT,
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50)
);

-- 인덱스 생성
CREATE INDEX ix_teams_team_name ON teams(team_name); 