USE FinalProject_S1G6
GO

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

CREATE TABLE [Message] (
    [id] int PRIMARY KEY IDENTITY(1,1),
    [limit_progress] float NOT NULL,
    [message_text] nvarchar(500) NULL
);

CREATE TABLE [ServingSize] (
    [id] int PRIMARY KEY IDENTITY(1,1),
    [name] nvarchar(50) NOT NULL UNIQUE
);

CREATE TABLE [DrinksType] (
    [id] int PRIMARY KEY IDENTITY(1,1),
    [name] nvarchar(50) NOT NULL UNIQUE
);

CREATE TABLE [AlertedWith] (
    [user_id] int NOT NULL REFERENCES [User](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    [message_id] int NULL REFERENCES [Message](id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    PRIMARY KEY (user_id)
);

CREATE TABLE [HasServingSize] (
    [drink_id] int NOT NULL REFERENCES [Drink](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    [serving_size_id] int NOT NULL REFERENCES [ServingSize](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    PRIMARY KEY (drink_id, serving_size_id)
);

CREATE TABLE [HasDrinksType] (
    [drink_id] int NOT NULL REFERENCES [Drink](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    [drinks_type_id] int NOT NULL REFERENCES [DrinksType](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    PRIMARY KEY (drink_id, drinks_type_id)
);

CREATE TABLE [Adds] (
    [time_added] datetime NOT NULL DEFAULT GETDATE(),
    [user_id] int NOT NULL REFERENCES [User](id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    [drink_id] int NULL REFERENCES [Drink](id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,
    [total_amount] float NOT NULL,

    PRIMARY KEY (time_added, user_id)
);
