drop schema if exists mooc;
create schema mooc;
use mooc;

/* ENTITIES */
Create TABLE subject (
	SubjectID INT AUTO_INCREMENT PRIMARY KEY,
	Name VARCHAR(100) NOT NULL UNIQUE
)engine=innodb;

Create TABLE focus (
	FocusID INT AUTO_INCREMENT PRIMARY KEY,
	Name VARCHAR(100) NOT NULL UNIQUE,
	SubjectID INT NOT NULL, 
	CONSTRAINT Subject_Focus_FK FOREIGN KEY (SubjectID) references subject(SubjectID)
)engine=innodb; -- innodb for FK support

Create TABLE course (
	CourseID INT AUTO_INCREMENT PRIMARY KEY,
	Name VARCHAR(100) NOT NULL UNIQUE,
	Description VARCHAR(500) NOT NULL,
	IsEnrolled bool default false,
	FocusID INT NOT NULL,
	CONSTRAINT Focus_Course_FK FOREIGN KEY (FocusID) references focus(FocusID)
)engine=innodb;

/* RELATIONSHIPS */
Create TABLE pre_requisite (
	CourseID INT NOT NULL,
	PreReqCourseID INT NOT NULL,
	UNIQUE KEY Course_PreReq_UK (CourseID, PreReqCourseID),
	CONSTRAINT Course_FK FOREIGN KEY (CourseID) references course(CourseID),
	CONSTRAINT Pre_Req_Course_FK FOREIGN KEY (PreReqCourseID) references course(CourseID)
)engine=innodb;

INSERT INTO subject (SubjectID, Name) VALUES(1, "Math");
INSERT INTO subject (SubjectID, Name) VALUES(2, "Computer Science");
INSERT INTO subject (SubjectID, Name) VALUES(3, "Science");
INSERT INTO subject (SubjectID, Name) VALUES(4, "Information Technology");
INSERT INTO subject (SubjectID, Name) VALUES(5, "History");
INSERT INTO subject (SubjectID, Name) VALUES(6, "English");
INSERT INTO subject (SubjectID, Name) VALUES(7, "French");
INSERT INTO subject (SubjectID, Name) VALUES(8, "Spanish");
INSERT INTO subject (SubjectID, Name) VALUES(9, "Portugese");
INSERT INTO subject (SubjectID, Name) VALUES(10, "Russian");

INSERT INTO focus (FocusID, SubjectID, Name) VALUES(1, 1, "Algebra");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(2, 1, "Calculus");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(3, 1, "Trigonometry");

INSERT INTO focus (FocusID, SubjectID, Name) VALUES(4, 2, "Design");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(5, 2, "Programming Languages");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(6, 2, "Database Management Systems");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(7, 2, "Machine Learning");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(8, 2, "Neural Networks");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(9, 2, "Mobile Programming");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(10, 2, "Software Engineering");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(11, 2, "Artifical Intellegence");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(12, 2, "Networks");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(13, 2, "Human-Computer Interaction");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(14, 2, "Graphics");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(15, 2, "Biosystems & Computational Biology");

INSERT INTO focus (FocusID, SubjectID, Name) VALUES(16, 3, "Biology");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(17, 3, "Chemistry");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(18, 3, "Astronomy");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(19, 3, "Astrology");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(20, 3, "Enviornmental Studies");
INSERT INTO focus (FocusID, SubjectID, Name) VALUES(21, 3, "Physics");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(1, 5, "Java", "This course covers the features of 
	and princliples needs to program in Java. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(2, 5, "Javascript", "This course covers the features of 
	and princliples needs to program in Javascript. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(3, 5, "C++", "This course covers the features of 
	and princliples needs to program in C++. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(4, 5, "Python", "This course covers the features of 
	and princliples needs to program in Python. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(5, 5, "ML", "This course covers the features of 
	and princliples needs to program in ML. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(6, 5, "C#", "This course covers the features of 
	and princliples needs to program in C#. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(7, 5, "PHP", "This course covers the features of 
	and princliples needs to program in PHP. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(8, 5, "Ruby", "This course covers the features of 
	and princliples needs to program in Ruby. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(9, 5, "SQL", "This course covers the features of 
	and princliples needs to program with SQL. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");

INSERT INTO course (CourseID, FocusID, Name, Description) VALUES(10, 5, "Go", "This course covers the features of 
	and princliples needs to program in GO. Sections include: formal aspects of syntax and semantics, naming, 
	scoping, and binding, scanning, parsing, semantic analysis, and code generationcontrol flow, subroutines, 
	exception handling, and concurrency, type systems, data structures, data abstraction, and storage management, 
	environments and tools");






