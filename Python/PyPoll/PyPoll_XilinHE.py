import os
import csv

file_location = os.path.join('Resources','election_data.csv')

with open(file_location, 'r', newline = '') as csv_file:
	csvreader = csv.reader(csv_file, delimiter = ',')
	csv_header = next(csvreader)

	total_counter = 0
	counter1 = 0
	candi_votes = {}
	ini_votes = 0
	

	for row in csvreader:
		total_counter += 1
		if row[2] not in candi_votes:
			candi_votes.setdefault(row[2])	
			candi_votes[row[2]] = [ini_votes,0]
		if row[2] in candi_votes:	
			candi_votes[row[2]][0] += 1 
			candi_votes[row[2]][1] = '{:.2%}'.format(candi_votes[row[2]][0] / total_counter)

max_vote = max(candi_votes.values())
winner = [key for key, value in candi_votes.items() if value == max_vote]

print("Election Results")
print("-------------------------")
print(f"Total Votes: {total_counter}")
print("-------------------------")
for key, value in candi_votes.items():
 	print(key, value)
print("-------------------------")
print(f"Winner: {winner}")

results = {'Total Votes: ':total_counter, 'Voting Results: ':candi_votes, 'Winner: ':winner}

output_path = os.path.join('Output', 'Output_XH.csv')
with open(output_path, 'w', newline='') as output_file:
	csvwriter = csv.writer(output_file, delimiter=',')
	csvwriter.writerow(['Total Votes:', total_counter])
	for key, value in candi_votes.items(): 
		csvwriter.writerow([key,value])
	csvwriter.writerow(['Winner: ', winner])