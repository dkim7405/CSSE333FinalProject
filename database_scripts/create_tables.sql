USE FinalProject_S1G6
GO

CREATE TABLE [User] (
    id int PRIMARY KEY IDENTITY(1,1),
    username nvarchar(50) NOT NULL UNIQUE,
    first_name nvarchar(50),
    middle_name nvarchar(50),
    last_name nvarchar(50),
    gender nvarchar(10),
    body_weight float,
    caffeine_limit int,
    date_of_birth datetime,
    age as (DATEDIFF(YEAR, date_of_birth, GETDATE()))
);

