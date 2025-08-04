CREATE TABLE hackathon_applications (
    id BIGSERIAL PRIMARY KEY,
    team_id BIGINT NOT NULL,
    idea_title VARCHAR(500),
    idea_description TEXT,
    problem_statement TEXT,
    solution_approach TEXT,
    tech_stack TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    first_create_datetime VARCHAR(50),
    first_create_uid VARCHAR(100),
    first_create_uid_ip VARCHAR(50),
    last_update_datetime VARCHAR(50),
    last_update_uid VARCHAR(100),
    last_update_uid_ip VARCHAR(50),
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX ix_hackathon_applications_team_id ON hackathon_applications(team_id);
CREATE INDEX ix_hackathon_applications_status ON hackathon_applications(status); 