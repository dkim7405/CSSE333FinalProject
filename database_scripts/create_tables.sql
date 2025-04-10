USE FinalProject_S1G6
GO

-- Tables should be created first if they are referenced by other tables

IF OBJECT_ID('dbo.User') IS NOT NULL
    DROP TABLE [User];
IF OBJECT_ID('dbo.Drink') IS NOT NULL
    DROP TABLE [Drink];
IF OBJECT_ID('dbo.Manufacturer') IS NOT NULL
    DROP TABLE [Manufacturer];

-- Age is computed attribute based on date_of_birth
CREATE TABLE [User] (
    [id] int PRIMARY KEY IDENTITY(1,1),
    [username] nvarchar(50) NOT NULL UNIQUE,
    [first_name] nvarchar(50),
    [middle_name] nvarchar(50),
    [last_name] nvarchar(50),
    [gender] nvarchar(10),
    [body_weight] float,
    [caffeine_limit] int,
    [date_of_birth] datetime,
    [age] as (DATEDIFF(YEAR, date_of_birth, GETDATE()))
);

CREATE TABLE [Manufacturer] (
    [id] int PRIMARY KEY IDENTITY(1,1),
    [name] nvarchar(50) NOT NULL UNIQUE,
    [address] nvarchar(250) NOT NULL,
    [website] nvarchar(300) NOT NULL
);

CREATE TABLE [Drink] (
    [id] int PRIMARY KEY IDENTITY(1,1),
    [name] nvarchar(50) NOT NULL UNIQUE,
    [mg/oz] float NOT NULL,
    [image_url] nvarchar(300) NOT NULL,
    [manufacturer_id] int REFERENCES [Manufacturer](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

