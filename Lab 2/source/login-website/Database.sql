drop schema if exists auth;
create schema auth;
use auth;

/* ENTITIES */
Create TABLE account ( -- user is a keyword
	AccountID INT AUTO_INCREMENT PRIMARY KEY,
	Email VARCHAR(128) NOT NULL UNIQUE,
	LastName VARCHAR(128) NOT NULL,
	FirstName VARCHAR(128) NOT NULL,
	Password VARCHAR(128) NOT NULL
)engine=innodb; -- innodb for FK support

Create TABLE course (
	CourseID INT AUTO_INCREMENT PRIMARY KEY,
	Name VARCHAR(100) NOT NULL UNIQUE,
	Description VARCHAR(500) NOT NULL
)engine=innodb;

/* RELATIONSHIPS */
Create TABLE course_history (
	CourseID INT NOT NULL,
	AccountID INT NOT NULL,
	CourseStatus ENUM('enrolled', 'passed') NOT NULL DEFAULT 'enrolled',
	UNIQUE KEY Course_Account_UK (CourseID, AccountID),
	CONSTRAINT Course_FK FOREIGN KEY (CourseID) references course(CourseID),
	CONSTRAINT Account_FK FOREIGN KEY (AccountID) references account(AccountID)
)engine=innodb;

/*STORED PROCEDURES*/
delimiter // 

create procedure getCourses()
begin
	select * from course;
end //

create procedure getCourseHistory(IN account_id int)
begin
	select * from course as C 
		left join course_history as H on C.CourseID=H.CourseID
		where H.AccountID = account_id;
end //

create procedure getAccount(IN email_ VARCHAR(128), IN password_ VARCHAR(128))
begin
	select * from account where Email = email_ AND Password = password_;
end //

create procedure checkEmail(IN email_ VARCHAR(128))
begin
	select AccountID from account where Email = email_;
end //

create procedure createAccount(IN email_ VARCHAR(128), IN first_ VARCHAR(128), IN last_ VARCHAR(128), IN password_ VARCHAR(128))
begin
	INSERT INTO account (Email, FirstName, LastName, Password) VALUES(email_, first_, last_, password_);
	select last_insert_id() as AccountID;
end //

delimiter ;

INSERT INTO account (AccountID, Email, FirstName, LastName, Password) VALUES(1, "anisimova.tanya07@gmail.com", "Tanya", "Anisimova", "pass");
INSERT INTO account (AccountID, Email, FirstName, LastName, Password) VALUES(2, "anisimova.tanya2@gmail.com", "Tanya2", "Anisimova2", "pass");
INSERT INTO account (AccountID, Email, FirstName, LastName, Password) VALUES(3, "other.user@gmail.com", "Other", "User", "pass");
INSERT INTO account (AccountID, Email, FirstName, LastName, Password) VALUES(4, "some.user@eyeverify.com", "Some", "User", "password1");

INSERT INTO course (CourseID, Name, Description) VALUES(1, "Java", "This course covers the features of and princliples needs to program in Java. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(2, "Javascript", "This course covers the features of and princliples needs to program in Javascript. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(3, "C++", "This course covers the features of and princliples needs to program in C++. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(4, "Python", "This course covers the features of and princliples needs to program in Python. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(5, "ML", "This course covers the features of and princliples needs to program in ML. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(6, "C#", "This course covers the features of and princliples needs to program in C#. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(7, "PHP", "This course covers the features of and princliples needs to program in PHP. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(8, "Ruby", "This course covers the features of and princliples needs to program in Ruby. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(9, "SQL", "This course covers the features of and princliples needs to program with SQL. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(10, "Go", "This course covers the features of and princliples needs to program in GO. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(11, "Kotlin", "This course covers the features of and princliples needs to program in Kotlin. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(12, "Swift", "This course covers the features of and princliples needs to program in Swift. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(13, "Objective-C", "This course covers the features of and princliples needs to program in Objective-C. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course (CourseID, Name, Description) VALUES(14, "Android", "This course will teach you the basics of the Android Platform and the application lifecycle. You will write single GUI applications, use built-in widgets and comonents, work with the internal database to store data locally and an external database using SQLlite, store preferences, use API within your applcation and learn how to desgin UI.");

INSERT INTO course (CourseID, Name, Description) VALUES(15, "iOS", "This course will teach you the basics of the iOS Platform and the application lifecycle. You will write single GUI applications, use built-in widgets and comonents, work with the internal database to store data locally and an external database using SQLlite, store preferences, use API within your applcation and learn how to desgin UI.");

INSERT INTO course (CourseID, Name, Description) VALUES(16, "Intro To Programming", "This course covers the features of and princliples needs to program. Sections include: formal aspects of syntax and semantics, naming, scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, environments and tools");

INSERT INTO course_history (AccountID, CourseID) VALUES(1, 12);
INSERT INTO course_history (AccountID, CourseID) VALUES(1, 1);
INSERT INTO course_history (AccountID, CourseID) VALUES(1, 5);
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(1, 2, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(1, 4, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(1, 6, "passed");

INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(4, 4, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(4, 6, "passed");

INSERT INTO course_history (AccountID, CourseID) VALUES(2, 12);
INSERT INTO course_history (AccountID, CourseID) VALUES(2, 1);
INSERT INTO course_history (AccountID, CourseID) VALUES(2, 5);
INSERT INTO course_history (AccountID, CourseID) VALUES(2, 16);
INSERT INTO course_history (AccountID, CourseID) VALUES(2, 11);
INSERT INTO course_history (AccountID, CourseID) VALUES(2, 3);
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(2, 2, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(2, 4, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(2, 6, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(2, 7, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(2, 8, "passed");
INSERT INTO course_history (AccountID, CourseID, CourseStatus) VALUES(2, 9, "passed");