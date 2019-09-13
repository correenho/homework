import os
import csv

file_location = os.path.join('Resources','budget_data.csv')

with open(file_location, newline='') as csv_file:
	csvreader = csv.reader(csv_file, delimiter = ',')
	csv_header = next(csvreader)

	ttl_mths = 0
	net_ttl = 0
	counter= -1
	prev_PL = 0
	new_chg = 0
	change = []
	max_profit = 0
	max_loss = 0


	for row in csvreader:
		ttl_mths += 1
		net_ttl += int(row[1])
		counter += 1
		
		if prev_PL != 0:
			new_chg = int(row[1]) - prev_PL
			change.append(new_chg)

		if new_chg > 0 and new_chg > max_profit:
			max_profit = new_chg
			date_max_profit = row[0]
		elif new_chg < 0 and new_chg < max_loss:
			max_loss = new_chg
			date_max_loss = row[0]

		prev_PL = int(row[1])

	avg_chg = sum(change) / counter

results = {'Total Months:' : ttl_mths, 'Net Total of Profits/Losses: $':net_ttl,\
'Average Change: $':avg_chg, 'Greatest Increase in Profits:':[date_max_profit, max_profit], \
'Greatest Decrease in Losses:': [date_max_loss,max_loss]}

print("Financial Analysis Summary")
print("--------------------------")
for key, value in results.items():
	print(key, value)

output_path = os.path.join('Output', 'Output_XH.csv')
with open(output_path, 'w', newline='') as output_file:
	csvwriter = csv.writer(output_file,delimiter=',')
	for key, value in results.items(): 
		csvwriter.writerow([key,value])