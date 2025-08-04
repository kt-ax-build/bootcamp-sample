CREATE TABLE team_members (
    id BIGSERIAL PRIMARY KEY,
    team_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(100),
    department VARCHAR(255),
    position VARCHAR(100),
    is_leader BOOLEAN DEFAULT FALSE,
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX ix_team_members_team_id ON team_members(team_id);
CREATE INDEX ix_team_members_email ON team_members(email);
CREATE INDEX ix_team_members_name ON team_members(name); 