-- 1. List the following details of each employee: 
-- employee number, last name, first name, gender, and salary
select emp.emp_no, emp.last_name, emp.first_name, emp.gender, sal.salary from employees as emp
join salaries as sal
using (emp_no);


-- 2. List employees who were hired in 1986.
select * from employees
where extract(year from hire_date) = 1986;


-- 3. List the manager of each department with the following information: 
-- department number, department name, the manager's employee number, last name, first name, and start and end employment dates.
select dp.dept_no, dp.dept_name, dm.emp_no, emp.last_name, emp.first_name, dm.from_date, dm.to_date from departments as dp
join dept_manager as dm
using (dept_no)
join employees as emp
using (emp_no);


-- 4. List the department of each employee with the following information: 
-- employee number, last name, first name, and department name.
select emp.emp_no, emp.last_name, emp.first_name, dp.dept_name from employees as emp
join dept_emp
using (emp_no)
join departments as dp
using (dept_no);


-- 5. List all employees whose first name is "Hercules" and last names begin with "B."
select * from employees
where first_name = 'Hercules'
and last_name like 'B%';


-- 6. List all employees in the Sales department, 
-- including their employee number, last name, first name, and department name.
select emp.emp_no, emp.last_name, emp.first_name, dp.dept_name from employees as emp
join dept_emp
using (emp_no)
join departments as dp
using (dept_no)
where dept_name = 'Sales';


-- 7. List all employees in the Sales and Development departments, 
-- including their employee number, last name, first name, and department name
select emp.emp_no, emp.last_name, emp.first_name, dp.dept_name from employees as emp
join dept_emp
using (emp_no)
join departments as dp
using (dept_no)
where dept_name = 'Sales' 
or dept_name = 'Development';

-- 8. In descending order, list the frequency count of employee last names, 
-- i.e., how many employees share each last name.
select last_name, count(last_name) from employees
group by last_name;

