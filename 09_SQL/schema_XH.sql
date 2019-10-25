drop table employees;
drop table dept_emp;
drop table salaries;
drop table titles;
drop table dept_manager;
drop table departments;

create table employees (
	emp_no INT Primary Key,
	birth_date DATE,
	first_name VARCHAR(30) not null,
	last_name VARCHAR(30) not null,
	gender VARCHAR(10),
	hire_date DATE
);

create table departments (
	dept_no VARCHAR(15) Primary Key,
	dept_name VARCHAR(30)
);

create table dept_emp (
	emp_no INT,
	foreign key (emp_no) references employees(emp_no),
	dept_no VARCHAR(15),
	foreign key (dept_no) references departments(dept_no),
	from_date DATE,
	to_date DATE,
	Primary Key (emp_no,dept_no)
);

create table salaries (
	emp_no INT primary key,
	foreign key (emp_no) references employees(emp_no),
	salary INT,
	from_date DATE,
	to_date DATE
);

create table dept_manager (
	dept_no	VARCHAR(15),
	foreign key (dept_no) references departments(dept_no),
	emp_no INT,
	foreign key (emp_no) references employees(emp_no),
	from_date DATE,
	to_date DATE,
	Primary Key (dept_no,emp_no,from_date)
);

create table titles (
	emp_no INT,
	foreign key (emp_no) references employees(emp_no),
	title VARCHAR(30),
	from_date DATE,
	to_date DATE,
	primary key (emp_no, title,from_date)
);

select * from employees;
select * from departments;
select * from dept_emp;
select * from salaries;
select * from dept_manager;
select * from titles;

